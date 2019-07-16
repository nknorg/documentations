---
id: address-generation-theory
title: Address Generation Theory
---

| Prefix | Uint160 | Uint32
| ------ | ------ | ------ |
| Fool-proof design | 160 bits Hash of RedeemScript| Checksum |

* **Fool-proof**:
```
Fix 0x35 in v0.8 for base58.encode got string start with "N"
Fix 0x02b825 in v0.9 for base58.encode got string start with "NKN"
```

* **160 bits Hash of RedeemScript**:
```
generate RedeemScript vmCode from publicKey, and hash it with ripemd160
```

* **Checksum**:
```
SHA256 hash twice with (Prefix + Uint160), retain lowest 32bits
```

## Process of convert public Key to wallet address
1. publicKey
2. [commpress publicKey](https://github.com/nknorg/nkn/blob/v0.9/vm/contract/contractBuilder.go#L41)
3. [generated `RedeemScript vmCode`](https://github.com/nknorg/nkn/blob/v0.9/vm/contract/contractBuilder.go#L45)
4. [sha256 & ripemd160 RedeemScript got 160bits Hash](https://github.com/nknorg/nkn/blob/v0.9/vm/contract/contractBuilder.go#L107)
5. [calc `Checksum` of (`Prefix` + `160 bits Hash`)](https://github.com/nknorg/nkn/blob/v0.9/common/uint160.go#L101)
6. [append `Checksum`](https://github.com/nknorg/nkn/blob/v0.9/common/uint160.go#L102)
8. [base58.encode](https://github.com/nknorg/nkn/blob/v0.9/common/uint160.go#L106)

## Convertor Example
https://github.com/nknorg/nkn/blob/v0.9/util/pubkey2addr.go
```
    if k, err = hex.DecodeString(key); err == nil {
	if pk, err = crypto.DecodePoint(k); err == nil {
		if redeemHash, err = contract.CreateRedeemHash(pk); err == nil {
			return redeemHash.ToAddress()
		}
	}
    }
```

