---
id: code-analysis-blockchain
title: blockchain
---


## chain Blockchain

* Fields

|Variable            |Description|
|:----               |:----|
|AssetID             |asset ID of NKN|
|BlockHeight         |current block height|
|BlockPersistTime    |cache persist time of block|

* Methods

   + AddBlock(block *block.Block, fastAdd bool) : error    // add block to ledger
   + GetHeader(hash Uint256) : *block.Header, error        // get header by hash
   + SaveBlock(block *block.Block, fastAdd bool) : error   // invoked by AddBlock

