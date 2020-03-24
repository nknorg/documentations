---
id: nkn-session-protocol
title: NKN Session Protocol
---

This document describes the session protocol used in NKN SDK. Most of the
protocol described are abstracted into a reusable package ncp, which has
official implementations in [Go](https://github.com/nknorg/ncp-go) and
[JavaScript](https://github.com/nknorg/ncp-js).

### Design Principle

The session mode is designed to natively work with multiple concurrent path to
greatly enhance reliability and performance. The number of concurrent path
should be configurable. Arbitrary failure of any but not all path should not
affect the correctness and completeness of data transmitted (but may affect the
performance).

The two participates of a session should negotiate the window size and the
concurrent path to use with each other to make sure as few packets are wasted as
possible.

The two participates of a session should be able to know whether each other is
online or not when session is established. (The next one is to be decided and
might be related to NKP-0019) After session is established, they should be able
to know if each other is still online and session is still active using optional
keepalive message.

### Protobuf Change

A new payload type `SESSION` is added:

```
enum PayloadType {
  BINARY = 0;
  TEXT = 1;
  ACK = 2;
  SESSION = 3;
}
```

When payload type is session, field `pid` will be treated as session id and
should be unique per address pair, and field `reply_to_pid` should always be set
to zero value (i.e. not set).

A new pb message `SessionData` is added:

```
message Packet {
  uint32 sequence_id = 1;
  bytes data = 2;
  repeated uint32 ack_start_seq = 3;
  repeated uint32 ack_seq_count = 4;
  uint64 bytes_read = 5;
  repeated string client_ids = 6;
  uint32 window_size = 7;
  uint32 mtu = 8;
  bool close = 9;
  bool handshake = 10;
}
```

A few notes:

- `sequence_id` of data packet starts with 1 to avoid using the zero value of
  protobuf. `sequence_id` is circular, so the next value after max_uint_32 is 1.

- For ack packet, either `ack_start_seq` or `ack_seq_count` could be pb zero
  value, but not both. If both of them have non zero value (length > 0), then
  their length must be identical. If `ack_start_seq` has zero value but
  `ack_seq_count` has non zero value, then `ack_start_seq` will be filled with
  an array with the same length as `ack_seq_count`, but value all equals 1. If
  `ack_seq_count` has zero value but `ack_start_seq` has non zero value, then
  `ack_seq_count` will be filled with an array with the same length as
  `ack_start_seq`, but value all equals 1. The length of `ack_start_seq` and
  `ack_seq_count` should not be greater than 32. After `ack_start_seq` and
  `ack_seq_count` are filled, they represent a few ranges of sequence id to be
  acknowledged, where `ack_start_seq` represents the start sequence id of each
  range, and `ack_seq_count` represents the number of consecutive sequence id to
  be acknowledged.

There will be multiple types of `SessionData` depending on session state and
which fields are (not) protobuf zero value:

1. handshake packet: `handshake` is not zero value.

2. data packet: when session is in established state and `sequence_id` is not
zero value.

3. ack packet: when session is in established state and `ack_start_seq`,
`ack_seq_count` are not zero value. Typically ack packet will also have
`bytes_read` set to non zero value.

4. bytes read update packet: only `bytes_read` is not zero value. Note that
other types of packet may also have `bytes_read` set to non zero value.

5. close packet: `close` is not zero value.

### Create Clients

We use the multiclient protocol to create a series of nkn clients with different
identifier prefix `__i__` where `i` is integer starts with 0. For example, a nkn
address `id.pk` will be converted to `__0__.id.pk`, `__1__.id.pk`,
`__2__.id.pk`, etc. User may optionally choose to keep the original identifier
(identifier prefix "") and include client with original address `id.pk` into the
clients to use.

### Establish a Session

When Alice wants to initialize (dial) a session with Bob, she creates a session
using default or user configured value and puts the session in session map. Then
she creates a handshake packet, which is a SessionData packet with the following
fields:

- `handshake`: set to true.

- `client_ids`: a list of identifier prefix Alice will use, e.g. `["", "__0__", "__1__", "__2__", …]`

- `window_size`: Alice's session receive window size in bytes (last unread
  received - first unread received)

- `mtu`: Alice's session receive mtu

The `Payload` containing the handshake packet will have payload type set to
session, and `pid` set to 8 random bytes. The `pid` should be unique for a given
remote address, otherwise packets will be treated as the same session.

At this time Alice does not know which identifier prefix Bob will use yet, so
Alice will send the packet to Bob's based NKN address + an identifier prefix
list. The list might be configured when user calls dialing method, while by
default all identifier prefix Alice is using will be used.

When Bob receives the handshake packet, he first checks if the session id (`pid`
of `Payload` message) of the remote (Alice's) address exists. If session does
not exist, a new session will be created, and the following fields will be
adjusted based on Alice's handshake packet:

- a list of virtual connections where `len(connections) = min(len(local
  identifier prefix list), len(remote identifier prefix list))`, and i-th
  connection will use i-th local identifier prefix and i-th remote identifier
  prefix.

- send window size will be `min(local send window size, remote receive window size)`

- send mtu will be `min(local send mtu, remote receive mtu)`

After session is created, it will be hold in a queue until user called accept
method to indicate that user wants to accept a session. Then the first session
in queue will be taken out, send back to Alice a handshake packet with the same
fields and Bob's value using ALL connections of the session (to enhance
reliability). The session will be marked as `established` on Bob's side,
returned to user and become ready to use.

When Alice receives back the handshake packet from Bob, she will find the
session from session map and handle the handshake packet in the same way as Bob.
Then the session is marked as `established` on Alice's side, returned to user
and become ready to use.

### Send Data

When a session is established, it's fully duplex and both side handle send and
receive concurrently. For simplicity, we will assume Alice sends data while Bob
receives. The other direction works the same way.

Each session maintains a sliding window as send window, which keeps track of the
ack status of a consecutive sequence id list and the packet data if the packet
has not been acknowledged. The size of the window is defined by the total size
of data sent + size of data in send buffer - total size of data read by
receiver. In other words, it's the max size of receiver's receive buffer usage
if receiver does not read any data from the session since now.

Each session has two modes: stream mode or non stream mode. This should be
predefined on both side (NOT negotiated during session handshake) because it
affects how session read and write works. In stream mode, data passed in by
session write method might be split into multiple packets or merged into one
packets, so there is no max length requirement on write data length or read
buffer size. In non-stream mode, data passed through session write method will
be send by a single packet and will not be split or merged. So the data length
cannot be greater than negotiated mtu, and read buffer size should be greater
than negotiated mtu.

When Alice calls session write method, it waits for available send window space.
In stream mode, it waits for any send window, and if the available size is not
enough for whole data, it append partial data first, and wait for the rest until
all data are put into send buffer. In non-stream mode, it waits until the whole
data fits into available send window.

When send window is available, data are first appended into send buffer (a byte
array whose size equals session mtu). In stream mode, buffer will be flushed
(send by NKN client) when it's full, and also at a fixed time interval. In
non-stream mode, send buffer will be flushed whenever data is put into buffer.

When data is put into send buffer, it uses len(data) space of the send window.
The send window will slide forward only when receiving acknowledgement that more
bytes are read by receiver. When window slide forward, it will slide until the
first sequence id in window is unacknowledged.

When send buffer is flushed, one (and only one) random available connection
(connection availability defined later) will fetch the job and send data to the
connection remote address. If no connection is availability, flush will wait
until one become availability.

Connections serve as the workers that send the packets. As mentioned earlier,
each connection has a fixed local client and remote client address. In addition,
each connection independently maintains and updates a conn send window (but the
unit is packets, NOT bytes) and retransmission timeout (rto) because different
connections might have very different stats. Conn send window is defined by
number of packets sent by this conn, but has not been acknowledged yet. Packets
in a conn send window does NOT need to be consecutive.

A conn has the following send loop: when conn has available send window space,
it first try to get a packet from session resend queue, which is shared by all
connections of the session. If no packet needs to be resent, it become available
for sending new packet and will try to send data from session send buffer. If
either of these two data are available, it sends the data, increment conn send
window used, and record the sent time.

A conn has the following check timeout loop: when a packet is sent for more than
rto time but has not received ack, it will be considered timeout, and the packet
will be put into the session resend queue. Also, conn send window will be
halved, but cannot be smaller than min conn send window size.

When a session receives an ack, it will pass it to all connections. Each conn
will check if he has sent the packet. If conn has sent the packet and it has not
been timeout, conn send window size will be increment by 1, but cannot be
greater than max conn send window size. Also, regardless of whether the packet
is timeout or not, conn send window will recover by 1; conn will compute the
round trip time (rtt) since sent the packet, and update conn rto using:

```
rto = rto + tanh((3 * rtt - rto) / 1000ms) * 100ms
```

but rto cannot be greater than max conn rto. This formula tries to fix rto at 3
* rtt, exponentially approaching 3 * rtt when diff(rto, 3 * rtt) is small for
fast correction, and linearly approach when diff(rto, 3 * rtt) is large to avoid
too much change caused by outlier.

The rational behind this formula is that, because NKN client to client
connection is an overlay connection, and each hop is already transmitting data
using TCP, thus having flow control, congestion control, etc. The only thing we
need to do is using a proper conn send window, and estimate timeout using
measured rtt. I also tried Jacobson/Karels algorithm but it leads to quite a lot
"timeout", (I think) because that latency is already affected by TCP connections
along the way, so the assumption of of the algorithm no longer holds. Similarly,
for the conn send window, we choose exponentially increase and decrease because
instead of using it for congestion control, we use it to avoid dispatching too
much workload to congested connections and thus affect session throughput. I
also tried TCP-like linear increase and exponentially decrease but it works not
so well either.

### Receive Data

When any of Bob's clients receives a NKN packet, he first checks if payload type
is session. If so it will be handled as session packet, otherwise non-session
packet. For the session packet, if it's an unknown (remote addr, session id)
combo (not found in session map), then it will be treated as a new session: a
session will be created and stored in session map. When session is created or
get from session map, the received packet will be passed to session for
handling, with the following order:

- If session is already closed, return error.

- If `SessionData.close` is true, handle it as close packet (will be described
  later).

- If session has not been established, and the `sequence_id`, `ack_start_seq`,
  `ack_seq_count` field are all pb zero value, then handle it as handshake
  packet (as described before).

- If session is already established, and either `ack_start_seq` or
  `ack_seq_count` have non zero value, then handle it as ack packet (as
  described before). After handling ack packet, the packet might still be
  handled as data packet if the next condition is met.

- If session is already established, and `sequence_id` is not zero value, then
  handle it as data packet (will be described later)

When Bob handles a data packet, he checks if data size is less than mtu, and
puts the data in receive window if sequence id is not earlier than window start
seq, data not received yet, and receive window is not full. If the data sequence
id equals the first receive window start sequence id, data become available for
user to read. Regardless of whether sequence id is earlier than window start
seq, Bob should send back ack packet to Alice for the sequence id. Ack should be
sent back using the same connection that receives data. To reduce ack packet
count, connection should not send ack immediately. Instead, each conn should
buffer ack that needs to be sent, aggregate ack greedily into as few packets as
possible (as long as the requirements in protobuf section is satisfied), and
send ack on a regularly basis (less frequent than data flush interval).

Each ack packet should also include `bytes_read` field which is set to the
current session bytes read, which increases when user call session `read` and
data is removed from receive buffer. In addition, if some bytes are read but no
`bytes_read` is sent to sender for a while (e.g. receiver calls `read` after
receive window if full), then receiver should send a packet containing only
`bytes_read` field to inform sender about bytes read update. Such a packet
should be sent by all available connection to ensure delivery.

### Close Session

Either party of a session can close a session by sending a close message using
all connections available to increase reliability. Before sending close message
and closing the session, packets in send buffer should be sent at best effort.
The other party who received close packet should also flush send buffer at best
effort.
