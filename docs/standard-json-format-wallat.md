---
id: standard-json-format-wallat
title: NKN Wallet JSON Format
---

Wallet is encrypted by user specified password and stored in JSON format:

```
{
	"PasswordHash":<string>,
	"IV":<string>,
	"MasterKey":<string>,
	"Version":<integer>,
	"Address":<string>,
	"ProgramHash":<string>,
	"SeedEncrypted":<string>,
	"ContractData":<string>
}
```

* `PasswordHash` the hash of passwordkey. It's used to check whether the passwordkey is correct or not.
* `IV` Initialization Vector of AES-CBC encryption algorithm.
* `MasterKey` a key encrypted by passwordkey. It's used to encrypt Ed25519 secret seed.
* `Version` the verison of this wallet.
* `Address` the base58 encoded address of this wallet. It's generated from ProgramHash.
* `ProgramHash` the hash of signature script contract. It's generated from signature script.
* `SeedEncrypted` the Ed25519 secret seed encrypted by unencrypted MasterKey. It's used to sign the transactions.
* `ContractData` contain 4 components{signature scrypt contract, contract type, ProgramHash, hash of ownedpublickey}.

Wallet address always starts with letter "NKN".

## Wallet creating algorithm

```
Input: password, seed
Output: wallet.json
1. PasswordKey <- sha256(sha256(password))
2. PasswordHash <- sha256(PasswordKey)
3. MasterKeyUnencrypted <- random_number(32)
4. IV <- random_number(16)
5. MasterKey <- aes_cbc_enc256(MasterKeyUnencrypted, PasswordKey, IV)
6. SeedEncrypted <- aes_cbc_enc256(seed, MasterKeyUnencrypted, IV)
7. PublicKey <- ed25519_pubkey_from_seed(seed)
8. SignatureScript <- {0x20||publickey||0xAC}
9. ProgramHash <- ripemd160(sha256(SignatureScript))
10. Address <-base58check_encode(0x02b825||ProgramHash||sha256(sha256(0x02b825||ProgramHash))[0:4])
11. ContractData <- {SignatureScript||00||ProgramHash||ripemd160(sha256(publickey))
12. Version <- 1
13. Save {PasswordHash, IV, MasterKey, Version, Address, ProgramHash, SeedEncrypted, ContractData} to wallet.json
```

## Terms and definitions

* `sha256(msg)` SHA-256 cryptographic hash algorithm.
* `random_number(len)` random number generator of len bytes.
* `aes_cbc_enc256(data, key, iv)` AES-256-CBC encryption algorithm.
* `ed25519_pubkey_from_seed(seed)` Derive Ed25519 public key from seed.
* `ripemd160(msg)` RIPEMD-160 cryptographic hash algorithm.
* `base58check_encode(msg)` Base58Check encoding algorithm.

## Reference Implementation

[https://github.com/nknorg/nkn/tree/master/vault](https://github.com/nknorg/nkn/tree/master/vault)
