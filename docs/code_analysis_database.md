---
id: code-analysis-database
title: database
---

## interface db.IStore

* Methods
   + BatchCommit() : error                            // commit item from batch buffer
   + BatchDelete(key []byte) : error                  // delete item from batch buffer
   + BatchPut(key []byte, value []byte) : error       // add item to batch buffer
   + Close() : error                                  // close database
   + Compact() : error                                // compact database
   + Delete(key []byte) : error                       // delete item from database
   + Get(key []byte) : []byte, error                  // get item from database
   + Has(key []byte) : bool, error                    // check whether the item is in database
   + NewBatch() : error                               // create new batch buffer
   + NewIterator(prefix []byte) : IIterator           // new iterator of database
   + Put(key []byte, value []byte) : error            // add item to database

## struct db.LevelDBStore

* Fields

|Variable            |Description|
|:----               |:----|
|batch               | batch buffer|
|db                  |the reference of leveldb object|

* Methods

   + BatchCommit() : error
   + BatchDelete(key []byte) : error
   + BatchPut(key []byte, value []byte) : error
   + Close() : error
   + Compact() : error
   + Delete(key []byte) : error
   + Get(key []byte) : []byte, error
   + Has(key []byte) : bool, error
   + NewBatch() : error
   + NewIterator(prefix []byte) : IIterator
   + Put(key []byte, value []byte) : error

## interace db.IIterator

* Methods

   + First() : bool
   + Key() : []byte
   + Last() : bool
   + Next() : bool
   + Prev() : bool
   + Release()
   + Seek(key []byte) : bool
   + Value() : []byte


## struct Iterator
* Fields

|Variable            |Description|
|:----               |:----|
|iter                | an object that implements IIterator interface|

* Methods
   + First() : bool
   + Key() : []byte
   + Last() : bool
   + Next() : bool
   + Prev() : bool
   + Release()
   + Seek(key []byte) : bool
   + Value() : []byte

