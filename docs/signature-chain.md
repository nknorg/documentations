---
id: signature-chain
title: Signature Chain
---

## Data structure

Signature chain (sigchain) is the core data structure in proof of relay. It's
encoded in protobuf defined at
[https://github.com/nknorg/nkn/blob/master/pb/sigchain.proto](https://github.com/nknorg/nkn/blob/master/pb/sigchain.proto)

```
enum SigAlgo {
  SIGNATURE = 0;
  VRF       = 1;
}

message SigChainElem {
  bytes id                  = 1;
  bytes next_pubkey         = 2;
  bool mining               = 3;
  bytes signature           = 4;
  SigAlgo sig_algo          = 5;
  bytes vrf                 = 6;
  bytes proof               = 7;
}

message SigChain {
  uint32 nonce                = 1;
  uint32 data_size            = 2;
  bytes block_hash            = 3;
  bytes src_id                = 4;
  bytes src_pubkey            = 5;
  bytes dest_id               = 6;
  bytes dest_pubkey           = 7;
  repeated SigChainElem elems = 8;
}
```

As shown above, a sigchain contains several metadata fields and a list of
sigchain elements. Below are information on each field of sigchain.

- `nonce`: A random number that should make sigchain metadata jointly unique.

- `data_size`: Size of data (in bytes) sent with sigchain.

- `block_hash`: Second latest (latest height - `SigChainBlockDelay`) block hash
  when creating sigchain.

- `src_id`: Sender Chord DHT address.

- `src_pubkey`: Sender public key.

- `dest_id`: Destination Chord DHT address.

- `dest_pubkey`: Destination public key.

- `elems`: A list of sigchain elements signed by all clients/nodes where the
  packet passed through. The first sigchain element should be signed by sender
  client, the last element should be signed by receiver client, and the rest
  should be signed by (at least one) relay nodes.

Below are information on each field of sigchain element.

- `id`: Chord DHT address of client/node. Should be empty or equal to sigchain
  `src_id` in the first sigchain element; and should be empty or equal to
  sigchain `dest_id` in the last sigchain element.

- `next_pubkey`: Public key of next sigchain element. Should be empty or equal
  to sigchain `dest_pubkey` in the second last sigchain element; and should be
  empty in the last sigchain element.

- `mining`: Indicating whether node wants to be selected as block proposer.
  Should be `false` in the first and last sigchain element.

- `signature`: Should be the Ed25519 signature of
  `prev_signature||serialized_sigchain_elem` using sigchain element key pair if
  `sig_algo == SIGNATURE` where serialized_sigchain_elem is the serialized
  sigchain element (see [serialization](#serialization)); and should be
  `sha256(prev_signature||serialized_sigchain_elem||sigchain_elem_vrf)` if
  `sig_algo == VRF`, where `||` stands for byte array concatenation. Previous
  signature in the first sigchain element should be serialized sigchain metadata
  (see [serialization](#serialization)).

- `sig_algo`: Should be `SIGNATURE` in the first and last sigchain element, and
  should be `VRF` in the other sigchain elements.

- `vrf`: VRF output of sigchain `block_hash` using sigchain element key pair if
  `sig_algo == VRF`, otherwise should be empty.

- `proof`: VRF proof of sigchain `block_hash` using sigchain element key pair if
  `sig_algo == VRF`, otherwise should be empty.

### Serialization

Serialization of sigchain element (unsigned):

```
WriteVarBytes(id) + WriteVarBytes(next_pubkey) + WriteBool(mining)
```

Serialization of sigchain metadata (unsigned):

```
WriteUint32(nonce) + WriteUint32(data_size) + WriteVarBytes(block_hash)
+ WriteVarBytes(src_id) + WriteVarBytes(src_pubkey) + WriteVarBytes(dest_id)
+ WriteVarBytes(dest_pubkey)
```

See [Serialization Scheme](/docs/serialization-scheme) for serialization of
basic types.
