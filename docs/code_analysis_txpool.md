---
id: code-analysis-txpool
title: transaction pool
---

## struct pool.TxnPool

* Fields

|Variable             |Description|
|:----                |:----|
|NanoPayTxs           |list of Nanopay transactions|
|TxLists              |list of other transactions|
|TxMap                |map for all transactions|
|TxShortHashMap       |short hash map for all transactions|
|blockValidationState |record the validation state of transactions|
|lastDroppedTxn       |last dropped transaction|
|txnCount             |the count of transactions in txpool|
|txnSize              |the size of transactions in txpool|

* Methods
   + AppendTxnPool(txn *transaction.Transaction) : error
   + CleanBlockValidationState(txns []*transaction.Transaction) : error
   + CleanSubmittedTransactions(txns []*transaction.Transaction) : error
   + DropTxns()
   + GetAddressList() : map[common.Uint160]int
   + GetAllTransactionLists() : map[common.Uint160][]*transaction.Transaction
   + GetAllTransactions() : []*transaction.Transaction
   + GetAllTransactionsBySender(programHash common.Uint160) : []*transaction.Transaction
   + GetNonceByTxnPool(addr common.Uint160) : uint64, error
   + GetSubscribers(topic string) : []string
   + GetSubscribersWithMeta(topic string) : map[string]string
   + GetTransaction(hash common.Uint256) : *transaction.Transaction
   + GetTxnByCount(num int) : map[common.Uint256]*transaction.Transaction, error
   + GetTxnByHash(hash common.Uint256) : *transaction.Transaction
   + GetTxnByShortHash(shortHash []byte) : *transaction.Transaction
   - addTransactionToMap(txn *transaction.Transaction)
   - deleteTransactionFromMap(txn *transaction.Transaction)
   - getLastDroppedTxn() : *transaction.Transaction
   - getOrNewList(owner common.Uint160) : *NonceSortedTxs, error
   - getTxsFromPool() : []*transaction.Transaction
   - processTx(txn *transaction.Transaction) : error
   - setLastDroppedTxn(txn *transaction.Transaction)

## struct NonceSortedTxs

* Fields

|Variable             |Description|
|:----                |:----|
|account              |address of transaction sender|
|cap                  |the capacity of this list|
|idx                  |sorted transactions by nonce|
|txs                  |all transactions of this address|

* Methods

   + CleanIfEmpty() : bool
   + Drop(hashToDrop common.Uint256) : *transaction.Transaction, bool, error
   + Dump()
   + Empty() : bool
   + ExistTx(hash common.Uint256) : bool
   + Full() : bool
   + GetAllTransactions() : []*transaction.Transaction
   + GetByNonce(nonce uint64) : *transaction.Transaction, error
   + GetLatestNonce() : uint64, error
   + GetLatestTxn() : *transaction.Transaction, error
   + Len() : int
   + PopN(n uint16) : []*transaction.Transaction, error
   + Push(tx *transaction.Transaction) : error
   + Replace(tx *transaction.Transaction) : error
   + Seek() : *transaction.Transaction, error
   - empty() : bool
   - full() : bool
   - getNonce(hash common.Uint256) : uint64
   - len() : int

