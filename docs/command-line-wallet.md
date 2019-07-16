---
id: command-line-wallet 
title: Command Line Wallet
---

nknc is a command line tool for nknd.

## Contents
1. [help](#help)
2. [version](#version)
3. [info](#info)
3.1  [query_block](#query_block)
3.2  [query_transaction](#query_transaction)
3.3  [get_current_blockhash](#get_current_blockhash)
3.4  [get_block_amount](#get_block_amount)
3.5  [get_connection_infomation](#get_connection_infomation)
3.6  [get_state](#get_state)
3.7  [get_neighbors](#get_neighbors)
3.8  [get_chord_ring_information](#get_chord_ring_information)
3.9  [get_version_of_a_node](#get_version_of_node)
3.10 [get_balance](#get_balance)
3.11 [get_nonce](#get_nonce)
4. [asset](#asset)
4.1 [transfer_asset](#transfer_asset)
5. [wallet](#wallet)
5.1 [create_wallet](#create_wallet)
5.2 [query_wallet](#query_wallet)
5.3 [change_password](#change_password)

## help

Get help for nknc.

command:
```
./nknc --help
```

result:
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

## version

Get version of nknc.

command:
```
./nknc --version
```

result:
```
nknc version v1.0.0-alpha-80-g93ba
```

## info

Get informations of nknd.

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

### query_block

Get a block by block hash or block number. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --blockhash 3320281d4030543abadda4584471ed5174eee3fa7d9152921cbc8917a60a2de6
```

result:
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

command:
```
./nknc info --height 19125
```

result:
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

### query_transaction

Get a transaction by transaction hash. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --txhash dd54451ab43ac24b009a84af4005c0e5758bd8a5696e2da33d823695e20ec4e1
```

result:
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

### get_current_blockhash

Get current block hash. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --latestblockhash
```

result:
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

### get_block_amount

Get block amount in ledger. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --latestblockhash
```

result:
```
{
    "jsonrpc": "2.0",
    "result": 19173,
    "id": 1
}
```

### get_connection_infomation

Get connection infomation of current node. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --connections
```

result:
```
{
    "jsonrpc": "2.0",
    "result": 53,
    "id": 1
}
```

### get_state

Get state of current node. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --state
```

result:
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

### get_neighbors

Get neighbor infomation of current node. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --neighbor
```

result:
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

### get_chord_ring_information

Get chord ring infomation of current node. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --ring
```

result:
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

### get_version_of_node

Get version of current node. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --nodeversion
```

result:
```
{
    "jsonrpc": "2.0",
    "result": "v1.0.0-alpha-82-g5774",
    "id": 1
}
```

### get_balance

Get balance of an address. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc info --balance NKNQ83xc8zQNEE6WBDKm7tZrLwoMwAq4c4jo
```

result:
```
{
    "jsonrpc": "2.0",
    "result": {
        "amount": "0"
    },
    "id": 1
}
```

### get_nonce

Get nonce of an address. Please use "nonceInTxPool" to transfer asset. If using a remote node, place *```--ip and --port```* options behind nknc.

command:
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

## asset 

This command can be use to transfer asset.

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

### transfer_asset

Transfer nkn to any others. The result is transaction hash. Before transfer asset, you can use *```./nknc wallet --list nonce`` to get your nonce. Please increase nonce before next transfer.
If using a remote node, place *```--ip and --port```* options behind nknc.

command:
```
./nknc asset --transfer -value 1  -to NKNBV71h5oUBjknMHPikPU7nraw9KtksWjtB --wallet wallet.dat --fee 0 --nonce 0
```

result:
```
{
    "jsonrpc": "2.0",
    "result": "451a79a7e2e3aa0db0a856323575b7b371b098e6a3e6385b87dec5531314b3c3",
    "id": 1
}
```

## wallet

This command can operate wallet of nknd.

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

### create_wallet

Create a wallet with a specified name.

command:
```
./nknc wallet --name myWallet.dat --create
```

result:
```
Address                             Public Key
-------                             ----------
NKNBsm5t2eRj4ijSwM1Sw9jGtArTqCDun77Z  04c0dc08aa609929d4440b8690052f85b09ab24cba82a507e14ae3c5503694759e
```

### query_wallet

List wallet infomations. If using a remote node to query balance or nonce, place *```--ip and --port```* options behind nknc.


command:
```
./nknc wallet --list account
```

result:
```
Address                             Public Key
-------                             ----------
NKNBsm5t2eRj4ijSwM1Sw9jGtArTqCDun77Z  04c0dc08aa609929d4440b8690052f85b09ab24cba82a507e14ae3c5503694759e
```

command:
```
./nknc wallet --list balance
```

result:
```
{
	"id": "1",
	"jsonrpc": "2.0",
	"result": {
		"amount": "0"
	}
}
```

command:
```
./nknc wallet --list verbose 
```

result:
```
Password:
Address                             Public Key
-------                             ----------
NKNZmZfWwYDhNGjFLZwJPQPKNf6o6kS45isW  044473fb05fc7a3c4c882150a02a505626a7531b1aeac15c5993835636cb452051

Private Key
-----------
...
```

command:
```
./nknc wallet --list nonce
```

result:
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

### change_password

Change password for a wallet.

command:
```
./nknc wallet --name myWallet.dat --changepassword
```

result:
```
passwrod changed
```


