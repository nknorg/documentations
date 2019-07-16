---
id: nkn-address-scheme
title: NKN Address Scheme
---

Nodes and clients have different scheme when choosing NKN address.

## Nodes

It is important that NKN address of a node is random (or at least uniformly distributed and uncontrollable) for two reasons. First, it is hard for malicious nodes to choose specific NKN addresses. Being able to choose NKN address makes it easier for malicious nodes to attack the system as neighbors and routing are based on NKN addresses. Second, load is more balanced among nodes given random NKN addresses, effectively making the network more decentralized.

To guarantee the randomness of NKN address and prevent malicious nodes from choosing specific NKN address, a unique, unpredictable, uncontrollable yet still verifiable function is used to generate NKN address when a node joins NKN network. We choose the hash of public IP address and latest block hash at the time of node joining

Node NKN address = hash(Node public IP address, latest block hash)

such that it's verifiable by other nodes but unpredictable in advance.

## Clients

Clients have different NKN address scheme from nodes. The scheme should satisfy the following properties:

1. Client NKN address is permanent such that a client can be reached from the same NKN address when in different physical network
2. Client NKN address is associated with its public key to avoid NKN address collision so that other clients cannot receive packets sending to it

We choose the scheme such that client NKN address is computed from a url-like NKN address string consisting of an arbitrary string chosen by the client and its public key

Client NKN address = hash("arbitrary-string.client-public-key")

In the NKN address string, the last substring separated by a dot (client public key) represents the unique identity of the client, similar to root domain in a url; the rest is chosen by the client, similar to subdomain in a url. Such a scheme satisfies the above two properties. In addition, a user (key pair holder) can generate as many NKN addresses as he wants sharing the same account (key pair).

Clients do not distribute their NKN addresses directly. Instead, a client distributes its NKN address string to nodes or other clients and they compute the client's NKN address locally such that they know both the client's NKN address and public key at the same time. Using such a scheme, end-to-end encryption between any clients is easy to implement.

