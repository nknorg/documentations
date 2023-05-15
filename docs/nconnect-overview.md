---
id: nconnect-overview
title: Overview
---

*nConnect, A Decentralized Secure Remote Access Solution*

NKN, short for New Kind of Network, is a project that aims to rebuild the Internet to be truly open, decentralized, dynamic, secure, shared and owned by the community.

The core of the NKN network consists of a large number of interconnected nodes distributed around the world. Each node is connected to and aware of several other nodes called neighbors. Packets can be transmitted from any node to any other node via an efficient and verifiable route. Data can be sent to any client without a public or static IP address using their permanent NKN address with end-to-end encryption.

Based on the NKN blockchain, nConnect provides secure access to remote machines without the need for servers, public IP addresses, or publicly exposed ports. It features end-to-end encryption for the highest level of security and multi-path aggregation for maximum throughput.

![alt nConnect over NKN](/img/nconnect/nconnect-over-nkn.png)

As shown in the chart above, the nConnect client connects to the nConnect server through the NKN blockchain network. As NKN is a decentralized, end-to-end encrypted network, it brings highly robust, secure data transmission between nConnect client and server.

After client connects to server, client users can access server's resource just like local machine. It can access server's files, database, web server and other services just like machine is the same local network. It provides much convenience for users.

Does nConnect Server need a public IP address? No. The only requirement for both server and clients is that they can connect to the Internet and the client knows the server's listening address. This address consists of an Id string and a NKN address. The server or client can be at home behind home internet gateway, can be at office behind office gateway, or can be devices as mobile terminals, or devices connecting to internet by free wifi of cafe.

nConnect works in several modes:
- VPN mode, any TCP-based application that works on the same local network will continue to work remotely as if those machines were on the same local network. 
- SOCKS proxy mode, and 
- TUN device mode, which is also available for advanced users. 

nConnect can use nkn-tunnel for end-to-end tunneling, taking advantage of all the benefits of nkn-tunnel:

- Network agnostic
Neither the sender nor the receiver needs a public IP address or port forwarding. NKN tunnels only establish outbound (websocket) connections, so Internet access is all that is required on both sides.

- Top-level security
All data is end-to-end authenticated and encrypted. No one in the world except the sender and receiver can see or change the content of the data. The same public key is used for both routing and encryption, eliminating the possibility of man-in-the-middle attacks.

- Decent performance
By aggregating multiple overlay paths simultaneously, you can typically get much higher throughput than a direct connection. Even in free mode, you can still get <100ms end-to-end latency and 10+mbps end-to-end throughput.

It is all open source and decentralized. The default free mode is, as the name suggests, free (if you're curious, nodes relay traffic for free for clients to earn mining rewards in the NKN blockchain); while in tuna mode, nConnect (server mode) pays NKN tokens directly to relay service providers.
