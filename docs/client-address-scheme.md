---
id: client-address-scheme
title: NKN Client Address Scheme
---

Clients have different NKN address scheme from nodes. The scheme should satisfy the following properties:

1. Client NKN address is permanent such that a client can be reached from the same NKN address when in different physical network
2. Client NKN address is associated with its public key to avoid NKN address collision so that other clients cannot receive packets sending to it

We choose the scheme such that client NKN address is computed from a url-like NKN address string consisting of an arbitrary string chosen by the client and its public key

Client NKN address = hash("arbitrary-string.client-public-key")

In the NKN address string, the last substring separated by a dot (client public key) represents the unique identity of the client, similar to root domain in a url; the rest is chosen by the client, similar to subdomain in a url. Such a scheme satisfies the above two properties. In addition, a user (key pair holder) can generate as many NKN addresses as he wants sharing the same account (key pair).

Clients do not distribute their NKN addresses directly. Instead, a client distributes its NKN address string to nodes or other clients and they compute the client's NKN address locally such that they know both the client's NKN address and public key at the same time. Using such a scheme, end-to-end encryption between any clients is easy to implement.
