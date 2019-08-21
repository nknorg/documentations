---
id: command-line-wallet-cn
title: 命令行钱包nknc使用指南
---


nknc 是nknd的一个命令行钱包。

## Contents
- [帮助](#帮助)
- [版本](#版本)
- [区块链信息](#区块链信息)
  * [查询区块](#查询区块)
  * [查询交易](#查询交易)
  * [查询当前区块哈希](#查询当前区块哈希)
  * [查询当前总区块数](#查询当前总区块数)
  * [查询节点连接信息](#查询节点连接信息)
  * [查询节点状态](#查询节点状态)
  * [查询节点邻居](#查询节点邻居)
  * [查询chord邻居信息](#查询chord邻居信息)
  * [查询节点版本](#查询节点版本)
  * [查询余额](#查询余额)
  * [查询当前nonce](#查询当前nonce)
- [资产管理](#资产管理)
  * [转账](#转账)
- [钱包](#钱包)
  * [创建钱包](#创建钱包)
  * [查询钱包](#查询钱包)
  * [更改密码](#更改密码)

## 帮助

获取nknc的帮助。

命令:
```
./nknc --help
```

执行结果:
```
NAME:
   nknc - command line tool for blockchain

USAGE:
   nknc [global options] command [command options] [args]

VERSION:
   v1.0.0-alpha-80-g93ba

COMMANDS:
     asset      asset registration, issuance and transfer
     debug      blockchain node debugging
     info       show blockchain information
     name       name registration
     sigchain   signature chain operation
     subscribe  subscribe topic
     wallet     user wallet operation
     help, h    Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --ip value     node's ip address (default: "localhost")
   --port value   node's RPC port (default: "30003")
   --help, -h     show help
   --version, -v  print the version
```

## 版本

获取nknc的版本信息。

命令:
```
./nknc --version
```

执行结果:
```
nknc version v1.0.0-alpha-80-g93ba
```

## 区块链信息

查询区块链的信息。

```
NAME:
   nknc info - show blockchain information

USAGE:
   nknc info [command options] [args]

DESCRIPTION:
   With nknc info, you could look up blocks, transactions, etc.

OPTIONS:
   --blockhash value, -b value  hash for querying a block
   --txhash value, -t value     hash for querying a transaction
   --latestblockhash            latest block hash
   --height value               block height for querying a block (default: -1)
   --blockcount, -c             block number in blockchain
   --connections                connection count
   --neighbor                   neighbor information of current node
   --ring                       chord ring information of current node
   --state, -s                  current node state
   --nodeversion, -v            version of connected remote node
   --balance value              balance of a address
   --nonce value                nonce of a address
```

### 查询区块

使用区块哈希或者区块高度获得区块。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --blockhash 3320281d4030543abadda4584471ed5174eee3fa7d9152921cbc8917a60a2de6
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
        "hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6",
        "header":...
        "transactions":...
    },
    "id": 1
}
```

命令:
```
./nknc info --height 19125
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
        "hash":"5f85d1286801c2f1129a02b0b19a3312f8113aaa073b5987346c59e27a12bdc6",
        "header":...
        "transactions":...
    },
    "id": 1
}
```

### 查询交易

使用交易哈希查询交易。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --txhash dd54451ab43ac24b009a84af4005c0e5758bd8a5696e2da33d823695e20ec4e1
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
        "hash":"dd54451ab43ac24b009a84af4005c0e5758bd8a5696e2da33d823695e20ec4e1",
        "txType":...
        "payloadData":...
        "attributes":...
        ...
    },
    "id": 1
}
```

### 查询当前区块哈希

获取当前的区块哈希。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --latestblockhash
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
        "hash": "3149000d7a0573915fea8f48773b19d12e812b059221cba746117befad26c09c",
		"height": 19168
    },
    "id": 1
}
```

### 查询当前总区块数

查询当前的区块总数。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --latestblockhash
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": 19173,
    "id": 1
}
```

### 查询节点连接信息

查询当前节点的连接信息。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --connections
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": 53,
    "id": 1
}
```

### 查询节点状态

查询当前节点的状态。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --state
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
		"id": "d7604de9aa22e2626a690fb0b3ec2c4ef4c790d73679e56ce0d5fa2f77befba0",
		"height": 19186,
		"currTimeStamp": 1555561990,
		"addr": ...
		"relayMessageCount": ...
		"syncState": ...
        ...
	}
    "id": 1
}
```

### 查询节点邻居

查询当前节点的邻居信息。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --neighbor
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": [{
        "id": "d25a3ce5376bbc8bd1b3fbb103cef4a4621ce99ade71093d3664494b49437116",
        "height": 19198,
        "addr": ...
        "syncState": ...
        "isOutbound": ...
        ...
	},
    ...]
    "id": 1
}
```

### 查询chord邻居信息 

查询当前节点的chord环信息。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --ring
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
        "localNode": {...}
        "successors": [...]
        "predecessors": [...]
        "fingerTable": {...}
	},
    "id": 1
}
```

### 查询节点版本 

查询当前节点的版本。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --nodeversion
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": "v1.0.0-alpha-82-g5774",
    "id": 1
}
```

### 查询余额

查询一个地址的余额。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --balance NKNQ83xc8zQNEE6WBDKm7tZrLwoMwAq4c4jo
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": {
        "amount": "0"
    },
    "id": 1
}
```

### 查询当前nonce 

查询一个地址的转账nonce。请使用"nonceInTxPool"项的值作为nonce进行转账。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc info --nonce NKNQ83xc8zQNEE6WBDKm7tZrLwoMwAq4c4jo
```

result:
```
{
    "jsonrpc": "2.0",
    "result": {
        "currentHeight": 5850,
		"nonce": 0,
		"nonceInTxPool": 0
    },
    "id": 1
}
```

## 资产管理

用于操作资产。

```
NAME:
   nknc asset - asset registration, issuance and transfer

USAGE:
   nknc asset [command options] [args]

DESCRIPTION:
   With nknc asset, you could control assert through transaction.

OPTIONS:
   --transfer, -t              transfer asset
   --wallet value, -w value    wallet name (default: "wallet.dat")
   --password value, -p value  wallet password
   --to value                  asset to whom
   --value value, -v value     asset amount
   --fee value, -f value       transaction fee
   --nonce value               nonce (default: 0)
```

### 转账

给其他地址转账。返回结果是交易哈希。转账的nonce。每次转前需要调用*```./nknc wallet --list nonce```*命令来获取自己的nonce。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。


命令:
```
./nknc asset --transfer -value 1  -to NKNBV71h5oUBjknMHPikPU7nraw9KtksWjtB --wallet wallet.dat --fee 0 --nonce 0
```

执行结果:
```
{
    "jsonrpc": "2.0",
    "result": "451a79a7e2e3aa0db0a856323575b7b371b098e6a3e6385b87dec5531314b3c3",
    "id": 1
}
```

## 钱包

 用于操作钱包的命令。

```
NAME:
   nknc wallet - user wallet operation

USAGE:
   nknc wallet [command options] [args]

DESCRIPTION:
   With nknc wallet, you could control your asset.

OPTIONS:
   --create, -c                create wallet
   --list value, -l value      list wallet information [account, balance, verbose, nonce]
   --changepassword            change wallet password
   --reset                     reset wallet
   --name value, -n value      wallet name (default: "wallet.dat")
   --password value, -p value  wallet password
```

### 创建钱包

创建钱包。可以指定钱包名称。

命令:
```
./nknc wallet --name myWallet.json --create
```

执行结果:
```
Address                             Public Key
-------                             ----------
NKNBsm5t2eRj4ijSwM1Sw9jGtArTqCDun77Z  04c0dc08aa609929d4440b8690052f85b09ab24cba82a507e14ae3c5503694759e
```

### 查询钱包

查询钱包相关的信息。如果使用远程节点，需要在nknc后面使用*```--ip and --port```*参数。

命令:
```
./nknc wallet --list account
```

执行结果:
```
Address                             Public Key
-------                             ----------
NKNBsm5t2eRj4ijSwM1Sw9jGtArTqCDun77Z  04c0dc08aa609929d4440b8690052f85b09ab24cba82a507e14ae3c5503694759e
```

命令:
```
./nknc wallet --list balance
```

执行结果:
```
{
	"id": "1",
	"jsonrpc": "2.0",
	"result": {
		"amount": "0"
	}
}
```

命令:
```
./nknc wallet --list verbose 
```

执行结果:
```
Password:
Address                             Public Key
-------                             ----------
NKNZmZfWwYDhNGjFLZwJPQPKNf6o6kS45isW  044473fb05fc7a3c4c882150a02a505626a7531b1aeac15c5993835636cb452051

Private Key
-----------
...
```

命令:
```
./nknc wallet --list nonce
```

执行结果:
```
{
	"id": "1",
	"jsonrpc": "2.0",
	"result": {
        "currentHeight": 5850,
		"nonce": 0,
		"nonceInTxPool": 0

	}
}
```

### 更改密码

修改钱包密码。

命令:
```
./nknc wallet --name myWallet.dat --changepassword
```

执行结果:
```
passwrod changed
```



