---
id: nconnect-tuna
title: nConnect over Tuna, Getting Faster
---

## What is Tuna?

TUNA software is a decentralized, peer-to-peer networking software that allows users to share their unused network bandwidth with others. It is designed to create a more efficient and decentralized Internet by allowing users to earn rewards for sharing their resources. The TUNA software is integrated with NKN's blockchain technology, which enables secure and transparent transactions between users. 

The NKN Tuna session is an overlay peer-to-peer connection based on multiple, simultaneous TUNA connections and the NCP protocol.

nConnect over Tuna has several advantages:

- Network agnostic
Neither the sender nor the receiver needs a public IP address or port forwarding. NKN tunnels only establish outbound (websocket) connections, so Internet access is all that is required on both sides.
- Top-level security
All data is end-to-end authenticated and encrypted. No one in the world except the sender and receiver can see or change the content of the data. The same public key is used for both routing and encryption, eliminating the possibility of man-in-the-middle attacks.
- Decent performance
By aggregating multiple overlay paths simultaneously, you can get ~100ms end-to-end latency and 10+mbps end-to-end throughput between international devices using the standard NKN client mode, or much lower latency and higher throughput using Tuna mode.

It is all open source and decentralized. The default NKN client mode is free (if you're curious, nodes relay traffic for clients for free to earn mining rewards in the NKN blockchain), while Tuna mode requires listeners to pay NKN tokens directly to Tuna service providers.
A diagram of the standard NKN client mode:

```

                                      A - ... - X
                                   /              \
Alice <--> nConnect <--> NKN client - B - ... - Y - NKN client <--> nConnect <--> Bob
                                   \              /
                                      C - ... - Z
```

A diagram of the Tuna mode:

```
                                           A
                                        /     \
Alice <--> nConnect <--> NKN Tuna client - B - NKN Tuna client <--> nConnect <--> Bob
                                        \     /
                                           C
```

### nConnect Start Tuna Mode
NKN Tuna provides higher performance between nConnect client and server.
To start nConnect Tuna mode, you can add the *--tuna* command argument to start the server and client:

```
for server:
$ nConnect -s --tuna ...

for client:
$ nConnect -c --tuna ...
```

Because Tuna service is provided by many NKN fans' nodes, they share their Internet bandwidth and computing resources, so users need to pay a little fee for Tuna service.

Tuna service fee is charged on server side. You can open nConnect server admin web page to login first.

### nConnect supports UDP 
When nConnect uses Tuna mode, it supports UDP communication. It is useful in some circumstances.
To support UDP, you can add command argument *--udp** to start server and client:

```
for the server:
$ nConnect -s --tuna --udp ...

for the client:
$ nConnect -c --tuna --udp ...
```
