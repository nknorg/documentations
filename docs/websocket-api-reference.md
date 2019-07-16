---
id: websocket-api-reference
title: Websocket API Reference
---

Here are some APIs to communicate with blockchain.

## Contents
1. [usage](#usage)
2. [error codes](#errcode)
3. [APIs](#apis)
	* [getlatestblockheight](#getlatestblockheight)
	* [getblock](#getblock)
	* [getconnectioncount](#getconnectioncount)
	* [gettransaction](#gettransaction)
	* [heartbeat](#heartbeat)
	* [getsessioncount](#getsessioncount)
4. [notice](#notice)
	* [updateSigChainBlockHash](#updateSigChainBlockHash)

## Details

<h3 id="usage">1. usage</h3>

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


<h3 id="errcode">2. error codes</h3>

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

<h3 id="apis">3. APIs</h3>

* <h4 id="getlatestblockheight">getlatestblockheight</h4>

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

* <h4 id="getblock">getblock</h4>

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

* <h4 id="getconnectioncount">getconnectioncount</h4>

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

* <h4 id="gettransaction">gettransaction</h4>

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

* <h4 id="heartbeat">heartbeat</h4>

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

* <h4 id="getsessioncount">getsessioncount</h4>

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

* <h4 id="updateSigChainBlockHash">updateSigChainBlockHash</h4>

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
