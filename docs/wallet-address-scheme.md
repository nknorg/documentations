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

## Valid address range
As `Address Scheme` definition, the valid address range (without consider `Checksum`) should be:

|  | Minimal | Maximum |
| ------ | ------ | -------- |
| Expr | (0x2b825<<192)｜(0^160)<<32｜0^32 | (0x2b825<<192)｜(1<<160)-1)<<32｜0xffffffff |
| Hex | 0x2b8250000000000...00000000000000L | 0x2b825ffffffffffff...ffffffffffffffffffffL |
| Base58 | NKNBV71h5oUBjknMHPikPU7nraw9KtkegU1m | NKNaphzoP6BNCdbnRUkAinbv8NZeaqTtGJL6 |

## Convert public Key to wallet address

See [NKN Wallet JSON Format](/docs/standard-json-format-wallat) for steps to
convert public key to wallet address.
