---
id: standard-json-format-wallat
title: Standard JSON-format Wallat
---

## Standard JSON-format wallat

```
{
	"PasswordHash":"",
	"IV":"",
	"MasterKey":"",
	"Version":"",
	"Address":"",
	"ProgramHash":"",
	"PrivateKeyEncrypted":"",
	"ContractData":""
}
```

`PasswordHash`  the hash of passwordkey. It's used to check whether the passwordkey is correct or not.
`IV` Initialization Vector of AES-CBC encryption algorithm.
`MasterKey` a key encrypted by passwordkey. It's used to encrypt privatekey of ecdsa.
`Version` the verison of this wallet.
`Address` the base58 encoded address of this wallet. It's generated from ProgramHash.
`ProgramHash` the hash of signature script contract. It's generated from signature script.
`PrivateKeyEncrypted` a privatekey encrypted by unencrypted MasterKey. It's used to sign the transactions.
`ContractData` contain 4 components{signature scrypt contract, contract type, ProgramHash, hash of ownedpublickey}.

## Wallet creating algorithm

```
Input: password, publickey, privatekey
Output: wallet.dat
1. PasswordKey <- sha256(sha256(password))
2. PasswordHash <- sha256(PasswordKey)
3. MasterKeyUnencrypted <- random_number(32)
4. IV <- random_number(16)
5. MasterKey <- aes_cbc_enc256(MasterKeyUnencrypted, PasswordKey, IV)
6. PrivateKeyEncrypted <- aes_cbc_enc256(privatekey, MasterKeyUnencrypted, IV)
7. SignatureScript <- {0x21||encoding_point(publickey)||0xAC}
8. ProgramHash <- ripemd160(sha256(SignatureScript))
9. Address <-base58check_encode(53||ProgramHash||sha256(sha256(53||ProgramHash))[0:4])
10. ContractData <- {SignatureScript||00||ProgramHash||ripemd160(sha256(encoding_point(publickey)))
11. Version <- "0.0.1"
12. Save {PasswordHash, IV, MasterKey, Version, Address, ProgramHash, PrivateKeyEncrypted, ContractData}
   to wallet.dat
```

## Terms and definitions

`sha256(msg)` SHA-256 cryptographic hash algorithm.
`random_number(len)` random number generator of len bytes.
`aes_cbc_enc256(data, key, iv)` AES-256-CBC encrAption algorithm.
`ripemd160(msg)` RIPEMD-160 cryptographic hash algorithm.
`encoding_point(ec_publickey)` elliptic curve point compression algorithm.
`base58check_encode(msg)` Base58Check encoding algorithm.


## Implementation

[https://github.com/nknorg/nkn/tree/master/vault](https://github.com/nknorg/nkn/tree/master/vault)

