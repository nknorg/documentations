---
id: transaction-types
title: Transaction Types
---

## Transaction Architecture

### Core Structure

```go
type Transaction struct {
    UnsignedTx *UnsignedTx  // Transaction data
    Programs   []*Program   // Signature programs
}

type UnsignedTx struct {
    Payload    Payload      // Transaction payload (determines type)
    Nonce      uint64       // Random nonce for uniqueness
    Fee        Fixed64      // Transaction fee
    Attributes []byte       // Additional attributes
}
```

### Payload Types

All transaction types are defined by the `PayloadType` enum in the Protocol Buffer definitions:

## Transaction Types

### 1. COINBASE_TYPE (0)

**Purpose**: Mining rewards and token distribution to miners.

**Structure**:
```protobuf
message Coinbase {
    bytes sender = 1;      // Donation address (must be specific address)
    bytes recipient = 2;   // Miner's address
    int64 amount = 3;      // Reward amount
}
```

**Key Features**:
- No signature verification required
- Automatically generated for each block
- Sender must be the donation address (`NKNaaaaaaaaaaaaaaaaaaaaaaaaaaaeJ6gxa`)
- Amount is calculated based on block height and reward schedule

**Usage**: Created automatically by the mining process.

---

### 2. TRANSFER_ASSET_TYPE (1)

**Purpose**: Standard token transfers between addresses.

**Structure**:
```protobuf
message TransferAsset {
    bytes sender = 1;      // From address (20 bytes)
    bytes recipient = 2;   // To address (20 bytes)
    int64 amount = 3;      // Transfer amount (in base units)
}
```

**Validation Rules**:
- Amount must be positive
- Sender must have sufficient balance
- Addresses must be valid 20-byte script hashes
- Cannot transfer zero amounts (height-dependent rule)

**Builder Function**:
```go
func NewTransferAssetTransaction(sender, recipient common.Uint160, amount common.Fixed64) *Transaction
```

**Fee**: Standard transaction fee applies.

---

### 3. SIG_CHAIN_TXN_TYPE (2)

**Purpose**: Submit signature chains for Proof of Relay consensus mechanism.

**Structure**:
```protobuf
message SigChainTxn {
    bytes sig_chain = 1;   // Serialized signature chain
    bytes submitter = 2;   // Address of submitter
}
```

**Key Features**:
- Critical for NKN's Proof of Relay consensus
- Validates data relay work performed by nodes
- Contains cryptographic proof of message routing
- Enables mining rewards based on relay contributions

**Validation**:
- Signature chain must be valid
- Submitter must be authorized
- Chain must follow proper cryptographic verification

**Builder Function**:
```go
func NewSigChainTransaction(sigChain []byte, submitter common.Uint160) *Transaction
```

---

### 4. REGISTER_NAME_TYPE (3)

**Purpose**: Register human-readable names in the NKN name service.

**Structure**:
```protobuf
message RegisterName {
    bytes registrant = 1;       // Public key of registrant (33 bytes)
    string name = 2;            // Name to register
    int64 registration_fee = 3; // Fee for registration
}
```

**Validation Rules**:
- Name must match regex pattern (height-dependent):
  - Current: `^[A-Za-z0-9][A-Za-z0-9-_.+]{2,254}$`
  - Legacy: `^[A-Za-z][A-Za-z0-9-_.+]{2,254}$`
- Minimum registration fee: 10 NKN
- Name must not already be registered
- Registrant must be valid 33-byte public key

**Name Duration**: Default 1 year (configurable)

**Builder Function**:
```go
func NewRegisterNameTransaction(registrant []byte, name string, registrationFee common.Fixed64) *Transaction
```

---

### 5. TRANSFER_NAME_TYPE (4)

**Purpose**: Transfer ownership of registered names.

**Structure**:
```protobuf
message TransferName {
    bytes registrant = 1;   // Current owner's public key
    bytes recipient = 2;    // New owner's public key
    string name = 3;        // Name being transferred
}
```

**Validation Rules**:
- Name must be currently registered to the registrant
- Both registrant and recipient must be valid public keys
- Name must not be expired
- Only current owner can transfer

**Builder Function**:
```go
func NewTransferNameTransaction(registrant, recipient []byte, name string) *Transaction
```

---

### 6. DELETE_NAME_TYPE (5)

**Purpose**: Delete registered names from the system.

**Structure**:
```protobuf
message DeleteName {
    bytes registrant = 1;   // Owner's public key
    string name = 2;        // Name to delete
}
```

**Validation Rules**:
- Name must be currently registered to the registrant
- Only current owner can delete
- Name becomes available for re-registration after deletion

**Builder Function**:
```go
func NewDeleteNameTransaction(registrant []byte, name string) *Transaction
```

---

### 7. SUBSCRIBE_TYPE (6)

**Purpose**: Subscribe to pub/sub topics for decentralized messaging.

**Structure**:
```protobuf
message Subscribe {
    bytes subscriber = 1;    // Subscriber's public key
    string identifier = 2;   // Unique client identifier
    string topic = 3;        // Topic to subscribe to
    uint32 duration = 4;     // Subscription duration (blocks)
    string meta = 5;         // Additional metadata
    uint32 bucket = 6;       // Subscription bucket
}
```

**Validation Rules**:
- Topic must match regex pattern (height-dependent)
- Duration limits (height-dependent):
  - Current: Max 400,000 blocks
  - Legacy: Max 65,535 blocks
- Identifier max length: 64 characters (height-dependent)
- Meta max length: 1,024 characters (height-dependent)
- Bucket max value: 1,000 (height-dependent)

**Builder Function**:
```go
func NewSubscribeTransaction(subscriber []byte, identifier, topic string, duration uint32, meta string, bucket uint32) *Transaction
```

---

### 8. UNSUBSCRIBE_TYPE (7)

**Purpose**: Unsubscribe from pub/sub topics.

**Structure**:
```protobuf
message Unsubscribe {
    bytes subscriber = 1;    // Subscriber's public key
    string identifier = 2;   // Client identifier
    string topic = 3;        // Topic to unsubscribe from
}
```

**Validation Rules**:
- Must have active subscription to unsubscribe
- Subscriber, identifier, and topic must match existing subscription

**Builder Function**:
```go
func NewUnsubscribeTransaction(subscriber []byte, identifier, topic string) *Transaction
```

---

### 9. GENERATE_ID_TYPE (8)

**Purpose**: Generate node IDs for network participation.

**Structure**:
```protobuf
message GenerateID {
    bytes public_key = 1;        // Node's public key (33 bytes)
    bytes sender = 2;            // Optional sender address
    int64 registration_fee = 3;  // Fee for ID generation
    uint32 version = 4;          // ID version
}
```

**Validation Rules**:
- Complex validation with version checks
- Registration fee requirements (height-dependent)
- Public key must be valid 33-byte compressed key
- Version must be within allowed range (height-dependent)
- Rate limiting based on transaction hash

**Height-Dependent Rules**:
- Minimum registration fee: 10 NKN (from block 2,570,000)
- Sender validation (from block 2,570,000)
- Version restrictions vary by block height

**Builder Function**:
```go
func NewGenerateIDTransaction(publicKey []byte, sender common.Uint160, registrationFee common.Fixed64, version uint32) *Transaction
```

---

### 10. NANO_PAY_TYPE (9)

**Purpose**: Fast micropayments with payment channels and expiration.

**Structure**:
```protobuf
message NanoPay {
    bytes sender = 1;                // From address
    bytes recipient = 2;             // To address
    uint64 id = 3;                   // Unique payment ID
    int64 amount = 4;                // Payment amount
    uint32 txn_expiration = 5;       // Transaction expiration height
    uint32 nano_pay_expiration = 6;  // Payment channel expiration
}
```

**Key Features**:
- Designed for high-frequency micropayments
- Payment channel mechanism for efficiency
- Dual expiration system (transaction and channel)
- Fee charging rules (height-dependent)

**Validation Rules**:
- Amount must be positive
- Expiration heights must be valid
- Sender must have sufficient balance
- ID must be unique for the sender-recipient pair

**Builder Function**:
```go
func NewNanoPayTransaction(sender, recipient common.Uint160, id uint64, amount common.Fixed64, txnExpiration, nanoPayExpiration uint32) *Transaction
```

---

## Transaction Fees

### Fee Structure
- **Standard Fee**: Based on transaction size and network conditions
- **Low Fee Transactions**: Special handling for small transactions
- **Fee Calculation**: Measured in NKN base units (10^-8 NKN)

### Fee Rules
- Minimum fee requirements vary by transaction type
- Some transactions (like name registration) have mandatory minimum fees
- Nano pay transactions may be exempt from fees (height-dependent)

## Transaction Validation

### Common Validation Rules
1. **Signature Verification**: All non-coinbase transactions must have valid signatures
2. **Nonce Validation**: Must be unique and properly formatted
3. **Fee Validation**: Must be non-negative and sufficient
4. **Balance Validation**: Sender must have sufficient balance for transfers
5. **Format Validation**: All fields must conform to expected formats

### Height-Dependent Rules
Many validation rules change at specific block heights:
- Name registration patterns
- Subscription limits
- Fee requirements
- Version restrictions

## Usage Examples

### Creating a Transfer Transaction
```go
// Transfer 1 NKN from sender to recipient
sender := common.Uint160{...}      // 20-byte address
recipient := common.Uint160{...}   // 20-byte address
amount := common.Fixed64(100000000) // 1 NKN in base units

txn := NewTransferAssetTransaction(sender, recipient, amount)
```

### Registering a Name
```go
// Register name "alice" with public key
publicKey := []byte{...}           // 33-byte compressed public key
name := "alice"
fee := common.Fixed64(1000000000)  // 10 NKN registration fee

txn := NewRegisterNameTransaction(publicKey, name, fee)
```

### Subscribing to a Topic
```go
// Subscribe to topic "chat.general" for 1000 blocks
publicKey := []byte{...}           // 33-byte compressed public key
identifier := "client-001"
topic := "chat.general"
duration := uint32(1000)
meta := ""
bucket := uint32(0)

txn := NewSubscribeTransaction(publicKey, identifier, topic, duration, meta, bucket)
```

## Protocol Buffer Definitions

All transaction types are defined in `/pb/transaction.proto` and compiled to Go code in `/pb/transaction.pb.go`. The payload system uses Protocol Buffers for:

- Type safety
- Efficient serialization
- Cross-platform compatibility
- Version management

## Related Files

- **Core Transaction Logic**: `/transaction/transaction.go`
- **Transaction Builders**: `/transaction/txBuilder.go`
- **Payload Management**: `/transaction/payload.go`
- **Protocol Definitions**: `/pb/transaction.proto`
- **Validation Rules**: `/chain/txvalidator/txvalidator.go`
- **Configuration**: `/config/config.go`

---
