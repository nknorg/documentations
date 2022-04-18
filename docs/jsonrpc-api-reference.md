---
id: jsonrpc-api-reference
title: JsonRPC API Reference
---

Here are some APIs to communicate with blockchain. These APIs are Compatible with [JSON-RPC 2.0](https://www.jsonrpc.org/specification).

## Table of Contents
- [usage](#usage)
- [error codes](#error-codes)
- [APIs](#apis)
	* [getlatestblockheight](#getlatestblockheight)
	* [getlatestblockhash](#getlatestblockhash)
	* [getblockcount](#getblockcount)
	* [getblock](#getblock)
	* [getblocktxsbyheight](#getblocktxsbyheight)
	* [getconnectioncount](#getconnectioncount)
	* [getrawmempool](#getrawmempool)
	* [gettransaction](#gettransaction)
	* [getwsaddr](#getwsaddr)
	* [getversion](#getversion)
	* [getneighbor](#getneighbor)
	* [getnodestate](#getnodestate)
	* [getchordringinfo](#getchordringinfo)


## usage

A typical RPC request format and a typical response format could be as following:

```
--> {
		"jsonrpc": "2.0",
		"method": "getblock",
		"params": {"height": 1},
		"id": 1
	}
<-- {
		"jsonrpc": "2.0",
		"result": {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6","header":...},
		"id": 1
	}
```

The syntax '-->' indicates data sent to Server, and '<--' indicates data sent to Client. If there was an error invoking the method, the following response will be sent:

```
--> {
		"jsonrpc": "2.0",
		"method": "getblocks",
		"params": {"height": 1},
		"id": 1
	}
<-- {
		"jsonrpc": "2.0",
		"error":{
			"code":-32601,
			"data":"The called method was not found on the server",
			"message":"Method not found"
		},
		"id": 1
	}
```

## error codes

| code  | message              | description |
|-------|----------------------|-------------|
|0      |"SUCCESS"             | -           |
|-32601 |"Method not found"    |"The called method was not found on the server."|
|-41001 |"SESSION EXPIRED"     | -           |
|-41002 |"SERVICE CEILING"     | -           |
|-41003 |"ILLEGAL DATAFORMAT"  | -           |
|-42001 |"INVALID METHOD"      | -           |
|-42002 |"INVALID PARAMS"      | -           |
|-42003 |"VERIFY TOKEN ERROR"  | -           |
|-43001 |"INVALID TRANSACTION" | -           |
|-43002 |"INVALID ASSET"       | -           |
|-43003 |"INVALID BLOCK"       | -           |
|-43004 |"INVALID HASH"        | -           |
|-43005 |"INVALID VERSION"     | -           |
|-44001 |"UNKNOWN TRANSACTION" | -           |
|-44002 |"UNKNOWN ASSET"       | -           |
|-44003 |"UNKNOWN BLOCK"       | -           |
|-44004 |"UNKNOWN HASH"        | -           |
|-45001 |"INTERNAL ERROR"      | -           |
|-47001 |"SMARTCODE EXEC ERROR"| -           |

## APIs

### getlatestblockheight

Get the height of current block.

```
--> {
     	"jsonrpc": "2.0",
     	"method":  "getlatestblockheight",
     	"params":  {},
     	"id": 1
    }
<-- {
     	"jsonpc": "2.0",
     	"result": 5,
     	"id": 1
    }
```

### getlatestblockhash

Get the hash of current block.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getlatestblockhash",
		"params":  {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": "6cf00422b02f3d99f5c006fcdb36bfb7cc8b2c345b2f34274e50a3d8f3bb8193",
		"id": 1
	}
```

### getblockcount

Get the block amount of blockchain.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getblockcount",
		"params":  {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": 270,
		"id": 1
	}
```

### getblock

Get the block information by height or hash.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getblock",
		"params":  {"height":1},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6","header":...},
		"id": 1
	}
```
or

```
--> {
		"jsonrpc": "2.0",
		"method":  "getblock",
		"params":  {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6"},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {"hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6","header":...},
		"id": 1
	}
```

### getblocktxsbyheight

Get the transactions hashes in a block by block height.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getblocktxsbyheight",
		"params":  {"height":1},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {
			"Hash": "5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6",
			"Height": 1,
			"Transactions": [
				"327bb43c2e40ccb2f83011d35602829872ab190171b79047397d000eddda18a9"
			]
		},
		"id": 1
	}
```

### getconnectioncount

Get the connection amount to this node.
```
--> {
		"jsonrpc": "2.0",
		"method":  "getconnectioncount",
		"params":  {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": 8,
		"id": 1
	}
```

### getrawmempool

Get all the transactions from transaction pool.
```
--> {
		"jsonrpc": "2.0",
		"method":  "getrawmempool",
		"params":  {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": [],
		"id": 1
	}
```

### gettransaction

Get a transaction by hash.
```
--> {
		"jsonrpc": "2.0",
		"method":  "gettransaction",
		"params": {"hash":"327bb43c2e40ccb2f83011d35602829872ab190171b79047397d000eddda18a9"},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {"hash": "327bb43c2e40ccb2f83011d35602829872ab190171b79047397d000eddda18a9", "inputs":...},
		"id": 1
	}
```

### getwsaddr

Get a websocket address from client's public key.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getwsaddr",
		"params": {"address":"a6c50a62142e107b3fbbe6f163522ce30e52bf45bd8a47762660265f141b6510"},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {
			"addr": "1.2.3.4:30002",
			"id": "4ca5a34892f5dfd67377f0d6820dc6d52a6f65fec8b507c3adcda1bafccbd18d",
			"pubkey": "5de259e761036319700c3d9557be5b0a86858e3eac5b81ebab9d1810d2721db2",
			"rpcAddr": "1.2.3.4:30003"
	  },
		"id": 1
	}
```

### getversion

Get version of this server.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getversion",
		"params": {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": "v0.1-alpha-26-gf7b7",
		"id": 1
	}
```

### getneighbor

Get neighbor nodes of this server.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getneighbor",
		"params": {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": [
			{"IpAddr":[0,0,0,0,0,0,0,0,0,0,255,255,127,0,0,1],"Port":30013,"ID":8408941800585506307...},
			{"IpAddr":[0,0,0,0,0,0,0,0,0,0,255,255,127,0,0,1],"Port":30005,"ID":2956232338651871234...},
			{"IpAddr":[0,0,0,0,0,0,0,0,0,0,255,255,127,0,0,1],"Port":30009,"ID":9027538565785539587...}
		],
		"id": 1
	}
```

### getnodestate

Get net status of this server.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getnodestate",
		"params": {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {
			"State": 0,
			"Port": 30001,
			"ID": 4697163132361310211,
			"Time": 1530087472382892000,
			"Version": 0,
			"Services": 0,
			"Relay": true,
			"Height": 0,
			"TxnCnt": 0,
			"RxTxnCnt": 0,
			"ChordID": "04629f17a6a0ec9a573ecfccb60fa42b104212dd1ec9cdb131993cbb4e15fe5e"
		},
		"id": 1
	}
```

### getchordringinfo

Get chord information of this server.

```
--> {
		"jsonrpc": "2.0",
		"method":  "getchordringinfo",
		"params": {},
		"id": 1
	}
<-- {
		"jsonpc": "2.0",
		"result": {
			"Vnodes": [
				{
					"Id": "BGKfF6ag7JpXPs/Mtg+kKxBCEt0eyc2xMZk8u04V/l4=",
					"Host": "127.0.0.1:30000",
					"NodePort": 30001,
					"HttpWsPort": 30002
				},
				...
			]
    	},
		"id": 1
	}
```
