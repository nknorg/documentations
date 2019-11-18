---
id: code-analysis-wallet
title: wallet
---


## vault.Wallet

* interface

   + GetAccount(pubKey *crypto.PubKey) : *Account, error   // get account by public key
   + GetDefaultAccount() : *Account, error                 // get default account
   + Sign(txn *transaction.Transaction) : error            // sign transaction

## vault.WalletImpl

* Variables

|Variable            |Description|
|:----               |:----|
|account             |account of this wallet|
|contract            |code info of wallet|
|iv                  |IV used to encrypt wallet by AES|
|masterKey           |Key used to encrypt wallet by AES|
|path                |path to save wallet|
|WalletStore         |storage information of wallet|

* Methods

   + ChangePassword(oldPassword []byte, newPassword []byte) : bool  // change the password of wallet
   + CreateAccount(seed []byte) : error                             // create account
   + GetAccount(pubKey *crypto.PubKey) : *Account, error            // see interface Wallet
   + GetContract() : *program.ProgramContext, error                 // get code information of wallet
   + GetDefaultAccount() : *Account, error                          // see interface Wallet
   + Sign(txn *transaction.Transaction) : error                     // see interface Wallet

## vault.WalletStore

* WalletStore

|Variable            |Description|
|:----               |:----|
|Data                |storage information|
|Path                |path to save wallet|

* Methods

   + SaveAccountData(programHash []byte, encryptedSeed []byte, contract []byte) : error   // save account data
   + SaveBasicData(version int, iv, masterKey, passwordHash []byte) : error               // save header data
   - read() : []byte, error
   - write(data []byte) : error

## vault.WalletData

* Variables

|Variable            |Description|
|:----               |:----|
|AccountData         |account data|
|HeaderData          |basic data|

## vault.AccountData

* Variables

|Variable            |Description|
|:----               |:----|
|Address             |address of wallet|
|ContractData        |code information |
|ProgramHash         |code hash        |
|SeedEncrypted       |the encryped seed of privatekey|

## vault.HeaderData

* Variables

|Variable            |Description|
|:----               |:----|
|IV                  |IV used to encrypt wallet by AES|
|MasterKey           |Key used to encrypt wallet by AES|
|PasswordHash        |hash of password|
|Version             |the version of wallet|

## vault.Account

* Variables

|Variable            |Description|
|:----               |:----|
|PrivateKey          |private key|
|ProgramHash         |code hash|
|PublicKey           |public key|

* Methods

   + PrivKey() : []byte            // get private key from account
   + PubKey() : *crypto.PubKey     // get public key from account

