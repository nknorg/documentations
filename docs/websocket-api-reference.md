---
id: websocket-api-reference
title: Websocket API Reference
---

Here are some APIs to communicate with blockchain.

## Table of Contents
- [usage](#usage)
- [error codes](#errcode)
- [APIs](#apis)
	* [getlatestblockheight](#getlatestblockheight)
	* [getblock](#getblock)
	* [getconnectioncount](#getconnectioncount)
	* [gettransaction](#gettransaction)
	* [heartbeat](#heartbeat)
	* [getsessioncount](#getsessioncount)
- [notice](#notice)
	* [updateSigChainBlockHash](#updateSigChainBlockHash)


## usage

A typical Web request format and a typical response format could be as following:

```
--> {
		"Action": "getblock",
		"height": 1
	}
<-- {
		"Action":"getblock",
		"Error":0,
		"Desc":"SUCCESS",
		"Result": {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6","header":...},
		"Version":"1.0.0"
	}
```

The syntax '-->' indicates data sent to Server, and '<--' indicates data sent to Client. If there was an error invoking the method, the following response will be sent:

```
--> {
		"Action": "getblock",
		"height": -1,
	}
<-- {
		"Action":"getblock",
		"Error":44004,
		"Desc":"UNKNOWN HASH",
		"Result": null,
		"Version":"1.0.0"
	}
```


## error codes

| code  | message              | description |
|-------|----------------------|-------------|
|0      |"SUCCESS"             | -           |
| 32601 |"Method not found"    |"The called method was not found on the server."|
| 41001 |"SESSION EXPIRED"     | -           |
| 41002 |"SERVICE CEILING"     | -           |
| 41003 |"ILLEGAL DATAFORMAT"  | -           |
| 42001 |"INVALID METHOD"      | -           |
| 42002 |"INVALID PARAMS"      | -           |
| 42003 |"VERIFY TOKEN ERROR"  | -           |
| 43001 |"INVALID TRANSACTION" | -           |
| 43002 |"INVALID ASSET"       | -           |
| 43003 |"INVALID BLOCK"       | -           |
| 43004 |"INVALID HASH"        | -           |
| 43005 |"INVALID VERSION"     | -           |
| 44001 |"UNKNOWN TRANSACTION" | -           |
| 44002 |"UNKNOWN ASSET"       | -           |
| 44003 |"UNKNOWN BLOCK"       | -           |
| 44004 |"UNKNOWN HASH"        | -           |
| 45001 |"INTERNAL ERROR"      | -           |
| 47001 |"SMARTCODE EXEC ERROR"| -           |

## APIs

### getlatestblockheight

Get the height of current block.

```
--> {
		"Action": "getlatestblockheight"
	}
<-- {
		"Action":"getlatestblockheight",
		"Error":0,
		"Desc":"SUCCESS",
		"Result":660,
		"Version":"1.0.0"
	}
```

### getblock

Get the block information by height or hash.

```
--> {
		"Action": "getblock",
		"height": 1
	}
<-- {
		"Action":"getblock",
		"Error":0,
		"Desc":"SUCCESS",
		"Result": {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6","header":...},
		"Version":"1.0.0"
	}
```

or

```

--> {
		"Action": "getblock",
		"hash": "5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6"
	}
<-- {
		"Action":"getblock",
		"Error":0,
		"Desc":"SUCCESS",
		"Result": {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6","header":...},
		"Version":"1.0.0"
	}
```

### getconnectioncount

Get the connection amount to this node. 

```
--> {
		"Action": "getconnectioncount"
	}
<-- {
		"Action":"getconnectioncount",
		"Error":0,
		"Desc":"SUCCESS",
		"Result":3,
		"Version":"1.0.0"
	}
```

### gettransaction

Get a transaction by hash.

```
--> {
		"Action":  "gettransaction",
		"hash":"327bb43c2e40ccb2f83011d35602829872ab190171b79047397d000eddda18a9",
	}
<-- {
		"Action":"gettransaction",
		"Error":0,
		"Desc":"SUCCESS",
		"Result": {"hash": "327bb43c2e40ccb2f83011d35602829872ab190171b79047397d000eddda18a9", "inputs":...},
		"Version":"1.0.0"
	}
```

### heartbeat

heart beat.

```
--> {
		"Action":  "heartbeat"
	}
<-- {
		"Action":"heartbeat",
		"Error":0,
		"Desc":"SUCCESS",
		"Result":"5a232d0c-79ea-11e8-a7f5-6a00030e74b0",
		"Version":"1.0.0"
	}
```

### getsessioncount

Get session amount of websocket.

```
--> {
		"Action":  "getsessioncount",
		"Addr":    "127.0.0.1:30002"
	}
<-- {
		"Action":"heartbeat",
		"Error":0,
		"Desc":"SUCCESS",
		"Result":1,
		"Version":"1.0.0"
	}
```

## notice

### updateSigChainBlockHash

Update sigchain block hash.

```
<-- {
		"Action":"updateSigChainBlockHash",
		"Error":0,
		"Desc":"SUCCESS",
		"Result":"fe5731ccaa605877306f4fde82c8b2d39f78fa22ff33f87bb818ffddbad7dd64",
		"Version":"1.0.0"
	}
```
