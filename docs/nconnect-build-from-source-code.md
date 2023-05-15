---
id: nconnect-build-from-source
title: Build nConnect from Source
---

## Preparation

*If you already have git and golang compiler on your computer, skip to the next section.*

To build nConnect from source, we need **git** tool and **go** compiler.
If your computer doesn't have git and go installed, please use the following link to install them:

### Install **git**
- For Windows:
Download and install git for Windows:
```
https://git-scm.com/download/win
```

- Debian/Ubuntu
For the latest stable release for your version of Debian/Ubuntu
```
$ sudo apt update
$ sudo apt install git
```

### Install **Go**.
You can download the **Go** release from this URL:
```
https://go.dev/dl/
```

After downloading, please follow this URL to install **Go**.
```
https://go.dev/doc/install
```

## Build nConnect on Linux 

- Download nConnect source code

```
$ git clone https://github.com/nknorg/nconnect
```

- Build nConnect

```
$ cd nConnect
$ make
```
After **make** it should create **nConnect** executable in the current folder.

- Get nConnect server address:
nConnect Client connects to nConnect Server using the server's address. So first we get the server address as follows:
```
$ ./nConnect -s --address
nConnect.l608io.dfc5a05ae4c5f05e4db0f2a4d0d5337a1e623671d0b6522cc90d523a0754fa97
```
It shows the address of the nConnect server

## Build nConnect on MacOS 

- Download nConnect source code

```
$ git clone https://github.com/nknorg/nconnect
```

- Build nConnect

```
$ cd nConnect
$ make
```
After **make** it should create **nConnect** executable in the current folder.

- Get nConnect server address:
nConnect Client connects to nConnect Server using the server's address. So first we get the server address as follows:
```
$ ./nConnect -c --address
nConnect.l608io.dfc5a05ae4c5f05e4db0f2a4d0d5337a1e623671d0b6522cc90d523a0754fa97
```
It displays the address of the nConnect client.

## Build nConnect on Windows 

Download the nConnect source code from Github:

- Download nConnect source code

```
> git clone https://github.com/nknorg/nconnect
```

- Build nConnect
We recommend use **make** to build nConnect. After you set up **make** development environment, you use make to build nConnect:
```
> cd nconnect
nconnect > make
```

After **go build** it should create **nConnect.exe** executable in the current folder.
Now you can run this command to make sure that nConnect works:

```
nConnect> .\nConnect.exe -c --address
dvbb5p.281ffe4fec4801fc71f188d234c41c23fad0e89cb3cdd927c88b0763ef9e45a9
```

It displays the nConnect client address
