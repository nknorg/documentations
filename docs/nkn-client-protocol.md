---
id: nkn-client-protocol
title: NKN Client Protocol
---

NKN client can be written in any language as long as the following protocol is implemented.

# Client NKN address

Each client has a unique and permanent NKN address, consists of an arbitrary string and a public key, see more at https://github.com/nknorg/nkn/wiki/Tech-Design-Doc%3A-NKN-Address-Scheme#clients

Note that all communications with nodes use the pre-hash raw string "anything.public" for client NKN address.

Currently the key pair is generated with p256r1 curve, but we plan to move to ed25519 soon.

# Connect to node

Each NKN client has a designated NKN node it should establish websocket connection depending on the client NKN address. Trying to connect to other nodes will get an error. During initialization, client should make a JSON-RPC call [getwsaddr](https://github.com/nknorg/nkn/wiki/JSON-RPC-API-Reference#getwsaddr) to get the node it should establish websocket connection with.

After getting the node websocket address, it should establish a websocket connection and send [setClient](https://github.com/nknorg/nkn/wiki/Websocket-API-Reference#setclient) message to register with the node before sending anything.

# Send packet

Send [sendPacket](https://github.com/nknorg/nkn/wiki/Websocket-API-Reference#sendpacket) message to node through websocket.

# Receive packet

A [receivePacket](https://github.com/nknorg/nkn/wiki/Websocket-API-Reference#sendpacket) message will be pushed from node through websocket.

