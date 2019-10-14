---
id: serialization-scheme
title: Serialization Scheme
---

## Serialization Scheme

There are 2 serialization protocols used in NKN:

* protobuf: used to serialize/deserialize data that do not require bit-wise
  identical serialized result, e.g. p2p messages.

* our own serialization scheme: used to serialize/deserialize data that need to
  be identical on different versions and platforms, e.g. data that needs to be
  signed or stored in global state.

This document will only cover the second one.

The serialization scheme defines the serialization protocol for basic types.
Serialization of a custom type is done by linearly serialize its fields, in the
order defined in that type.

## Serialization of Basic Type

### Fixed Length Encoding

We define the following fixed length encoding functions:

* `uint8`: `WriteUint8`
* `uint16`: `WriteUint16`
* `uint32`: `WriteUint32`
* `uint64`: `WriteUint64`
* `bool`: `WriteBool`
* `byte`: `WriteByte`

The above functions are simply the LittleEndian encoding of the variable.

### Variable Length Encoding

* Unsigned Integer: `WriteVarUint`
```
if value < 0xfd             =>  WriteUint8(value)
else if value < 0xffff      =>  0xfd + WriteUint16(value)
else if value < 0xffffffff  =>  0xfe + WriteUint32(value)
else                        =>  0xff + WriteUint64(value)
```

* Bytes: `WriteVarBytes`
```
WriteVarBytes(value) = WriteVarUint(len(value)) + value
```

* String: `WriteVarString`
```
WriteVarString(value) = WriteVarBytes([]byte(value))
```
