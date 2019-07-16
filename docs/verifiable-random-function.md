---
id: verifiable-random-function
title: Verifiable Random Function
---

The signature in signature chain needs to satisfy the following conditions:

1. Only the secret key holder can produce valid signature, no one else can compute valid signature of a message without knowing the secret key, even if knowing the valid signatures of other messages
2. The signature of any message should be unique, i.e. only one signature is valid for any message and key pair

The first property (verifiability) guarantees the signature is indeed signed by the secret key holder, while the second property (uniqueness) prevents relayers from computing multiple signatures for the same message and choose the one that has largest advantage (e.g. smallest signature).

Although elliptic curved based digital signature algorithms (e.g. ECDSA) provide verifiability, they do not produce unique valid output for the same input message. A random nonce can be chosen freely to produce multiple valid signatures, and validator does not know or verify what nonce is chosen. Even in some deterministic versions of ECDSA where the random nonce is chosen deterministically (e.g. hash of the message), malicious node can still choose different nonce and produces multiple valid signatures for the same message, while the validator cannot know if the nonce is chosen in the specified way. In contrast, hash function provides uniqueness but not verifiability as anyone can compute the output.

We use verifiable random function (VRF) to compute the "signature" in signature chain as it provides both verifiability and uniqueness. In addition to the output (signature) of the message, it also produces a proof which is needed to verify the signature. Similar to signature algorithms, valid signature can only be computed if the secret key is known. Unlike ECDSA, only one signature is valid for any message in verifiable random function, although the proof may not be unique.

