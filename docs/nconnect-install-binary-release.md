---
id: nconnect-install-binary-release
title: Install nConnect Binary Release
---

## Install nConnect on Windows

Download nConnect from the nkn.org website:
[nConnect Download](https://nkn.org/products/nconnect/)

After downloading, install and run it. After starting it should look like this:

![nConnect windows](/img/nconnect/nconnect-win.png)

Click on **Add Server**, it will show a QR code.
Now you can use the nConnect mobile app to scan the QR code to synchronize server information, or copy and paste the nConnect Server link address.

## Installing nConnect on Linux

- Download the nConnect Linux binary release from the nConnect repository.
  You can always download the latest nConnect from the nConnect github repository:
  [nConnect release](https://github.com/nknorg/nconnect/releases)

  Let's download nConnect for Ubuntu:

  ```
  $ mkdir nconnect
  $ cd nconnect
  $ wget https://github.com/nknorg/nconnect/releases/latest/download/linux-amd64.tar.gz
  $ tar xzvf linux-amd64.tar.gz
  $ cd linux-amd64
  ```

- Get nConnect Server address:
  The nConnect Client connects to the nConnect Server using the server address. So first we get the server address as follows:

  ```
  $ ./nConnect -s --address
  nConnect.gzwiy5.4c01b508fd9e5432633c6b098e6a0f166fdfd6a57a2c2313d08711ef1c4a4725
  ```
  
  Copy the string leady by **nConnect.** on your terminal, this is server's address. We need this address for client to connect server.

- Start nConnect Server:
  First, open port 8001 from the firewall, then start the nConnect Server:
  
  ```
  $ ./nConnect -s --admin-http :8001
  ```
  
  Great, nConnect Server has started. Now you can open the nConnect Server web page:
  
  ```
  http://local-ip:8001
  ```
  
  Please replace *local-ip* with the local IP address of your own computer. You can see the home page like this:
  
  ![nConnect server admin home page](/img/nconnect/nconnect-nkn-server-homepage.png)

  On this web page we can see a QR code.

## Install nConnect on your Mac

Open the Apple Store, search for **nConnect**, you will see the result as

![nConnect for MAC](/img/nconnect/nconnect-macbook-store.jpg)

Install it and open it, it is shown icon in the upper right corner, click it and you could see nConnect window:

![nConnect for Mac](/img/nconnect/nconnect-macbook-installed.jpg)

## Install nConnect on your Android phone

Download the nConnect app from Google Play.

- Install the nConnect app from Google Play
  Make sure you download the right nConnect which is published by NKN Labs, Inc. You can see the NKN logo as shown below:
  
  ![nConnect App](/img/nconnect/nconnect-app.png)

- Install nConnect App from nkn.org
  Download the APK from [nConnect](https://nkn.org/products/nconnect/) and install it.

## Install nConnect on your Apple Phone

Download the nConnect App from the Apple Store.

- Install nConnect App
  Make sure you download the correct nConnect published by NKN Labs, Inc. You can see the NKN logo as shown below:

  ![nConnect App](/img/nconnect/nconnect-app.png)
