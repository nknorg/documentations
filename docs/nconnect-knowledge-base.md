---
id: nconnect-knowledge-base
title: nConnect Knowledge Base
---

nConnect works as a decentralized secure remote access solution. Here we introduce the nConnect knowledge base.

## nConnect Client and Server
nConnect works in server or client mode. As you can see in the nConnect deskcop version:

![Client and Server](/img/nconnect/nconnect-client-server.png)

When working in command mode, you can use arguments *-c* or *-s* to set nConnect to work as client or server:
```
work as client:
$ nConnect -c

work as server:
$ nConnect -s
```

If a computer is to be accessed remotely, it should work as an nConnect server.  It listens to a server address and waits for clients to connect. For security reasons, it only accepts authorized clients to connect. The authorized client addresses are stored in the *config.json* file. You can add or remove them.

When a computer wants to access a remote server, it works as an nConnect client. The client connects to the server by dialing the server's listen address. After dialing, the data tunnel between client and server is established. And then client can access server remotely, securely and just like locally.

So what is an nConnect address?

## nConnect Address
In the NKN decentralized network, all nodes are identified by NKN address, not by IP or traditional naming system.
We can get the nConnect address by using the *--address* argument
```
Get server address
$ ./nConnect -s --address

Get client's address
$ ./nConnect -c --address

```

For nConnect mobile APP and nConnect desktop, they can work together to connect to nConnect server by scanning server's web page QR code and get synchronized easily. So nConnect mobile APP and nConnect desktop don't show the client's address. For detailed steps, you can refer to **Getting Started** section.

## nConnect Remote Connection
We can find many tools to implement remote access. But most of them depend on central servers. These central servers act as network controllers or data relay servers. Whenever something goes wrong with these central servers, remote access becomes unavailable.

nConnect works on NKN network. NKN network is a decentralized blockchain network. It has online nodes, usually more than 80,000 nodes, distributed all over the world. So NKN network is always available and nConnect is always available.

## End-to-end encryption
NKN (New Kind of Network) uses the libsodium for encryption. It Provides strong encryption and is considered secure for protecting sensitive data.

Based on NKN data encryption, nConnect provides an additional level of encryption. The default encryption algorithm is *chacha20-ietf-poly1305*. And when using command mode, you can use the *--cipher* argument to specify other encryption options, such as *aes-128-gcm* or *dummy*. When using *dummy*, it means no encryption at nConnect level, but NKN level still have its data encryption. So it still provides end-to-end data encryption.

## Socks Proxy and Virtual Network Adapter

For advanced users, you can use nConnect as a socks proxy or configure it as a virtual network adapter. 
- Socks Proxy Mode
If you want to run nConnect in socks proxy mode, you need to configure your computer's socks proxy to the nConnect listening port. the default socks proxy address is *127.0.0.1:1080*.
If you want to set a specific socks proxy address, you can start the nConnect client with argument *-l*

```
$ nConnect -c -l 127.0.0.1:8080 -a ...

```

- Virtual Network Adapter
If you run nConnect in virtual network adapter mode, you need to start nConnect as *sudo* or *Administrator*. nConnect desktop version will automatically set up the tun device. If you are running nConnect in CLI mode, please use the --tun argument to start it.

```
$ nConnect -c --tun
```

In Windows environment, we recommend to use nConnect GUI to start tun mode.


