---
id: wallet-json-format
title: NKN Wallet JSON Format (v2)
---

Wallet is encrypted by user specified password and stored in JSON format:

```
{
	"Version": <integer>,
	"IV": <string>,
	"MasterKey": <string>,
	"SeedEncrypted": <string>,
	"Address": <string>,
	"Scrypt": {
		"Salt": <string>,
		"N": <integer>,
		"R": <integer>,
		"P": <integer>,
	},
}
```

* `Version` the verison of this wallet.
* `IV` Initialization Vector of AES-CBC encryption algorithm, encoded as hex string.
* `MasterKey` a key encrypted by passwordkey. It's used to encrypt Ed25519 secret seed, encoded as hex string.
* `SeedEncrypted` the Ed25519 secret seed encrypted by unencrypted MasterKey. It's used to sign the transactions, encoded as hex string.
* `Address` NKN address of this wallet, encoded in base58. Wallet address always starts with letter "NKN".
* `Scrypt` scrypt parameters used to derive key from password.

## Wallet creating algorithm

```
Input: password, seed
Output: wallet.json
1. PasswordKey <- scrypt(password, salt, N, r, p, keyLen=32)
2. MasterKeyUnencrypted <- random_bytes(32)
3. IV <- random_bytes(16)
4. MasterKey <- aes_cbc_enc256(MasterKeyUnencrypted, PasswordKey, IV)
5. SeedEncrypted <- aes_cbc_enc256(seed, MasterKeyUnencrypted, IV)
6. PublicKey <- ed25519_pubkey_from_seed(seed)
7. SignatureScript <- {0x20||publickey||0xAC}
8. ProgramHash <- ripemd160(sha256(SignatureScript))
9. Address <-base58check_encode(0x02b825||ProgramHash||sha256(sha256(0x02b825||ProgramHash))[0:4])
10. Version <- 2
11. Save {Version, IV, MasterKey, SeedEncrypted, Address, Scrypt} to wallet.json
```

## Terms and definitions

* `sha256(msg)` SHA-256 cryptographic hash algorithm.
* `random_bytes(len)` random bytes with size len.
* `aes_cbc_enc256(data, key, iv)` AES-256-CBC encryption algorithm.
* `ed25519_pubkey_from_seed(seed)` Derive Ed25519 public key from seed.
* `ripemd160(msg)` RIPEMD-160 cryptographic hash algorithm.
* `base58check_encode(msg)` Base58Check encoding algorithm.
* `scrypt(password, salt, N, r, p, keyLen)` Scrypt key derivation function.

## Reference Implementation

[https://github.com/nknorg/nkn/tree/master/vault](https://github.com/nknorg/nkn/tree/master/vault)
