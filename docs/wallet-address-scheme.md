---
id: wallet-address-scheme
title: NKN Wallet Address Scheme
---

| Prefix | Uint160 | Uint32
| ------ | ------ | ------ |
| Fool-proof design | 160 bits Hash of RedeemScript| Checksum |

* **Prefix**:
```
Prefix is 0x02b825 (such that wallet address always starts with "NKN")
```

* **160 bits Hash of RedeemScript**:
```
generate RedeemScript from publicKey, and hash it with ripemd160
```

* **Checksum**:
```
SHA256 hash twice with (Prefix + Uint160), retain lowest 32bits
```

## Convert public Key to wallet address

See [NKN Wallet JSON Format](/docs/standard-json-format-wallat) for steps to
convert public key to wallet address.
