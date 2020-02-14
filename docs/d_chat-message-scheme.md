---
id: d_chat-message-scheme
title: NKN D-Chat Message Scheme
---

## struct Message

* Fields

|Variable             |Type             |Description|
|:----                |:----            |:----|
|id                   |String           |random uuid|
|contentType*         |enum             |the type of content. values are: `text`/`image`/`audio`/`video`/`event[:custom_action]`/`customize`, you can replace `customize` with any custom type. `[:custom_action]` is an option, you can change it as needed.|
|content              |String(JSON)     |message content in json format|
|topic                |String           |`null/''/undefined` for PRIVATE chat, `${arbitrary identifier}.${64 length hex, usually pubkey}` for PRIVATE GROUP chat, else PUBLIC GROUP chat.|
|timestamp            |long             |digital representation of time in milliseconds. for conversion to specific time in time zones around the world.|

+ (`*`)Indicates that the definition has been modified.
+ (`+`)Indicates that the fields is newly added.
+ (`-`)Indicates that the fields has been removed.

## Related

PRIVATE GROUP chat has a permission control, see [NKP-0016](https://forum.nkn.org/t/nkp-0016-client-side-pub-sub-permission-control/1920).
