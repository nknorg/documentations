---
id: nkn-sdk-resolver
title: NKN SDK resolver protocol
---

## Describe

* This is NKN address resolution plugin.
* This protocol supports mapping other blockchain address to NKN address.
* In general, address mapping relies on smart contracts to store.

## Usage

### Go
See [https://github.com/nknorg/eth-resolver-go](https://github.com/nknorg/eth-resolver-go).

* Implement the conversion from other blockchain address to NKN address through the interface

```
type ResolverInterface interface {
    // [address] other blockchain address, eg: "ETH:0x123..."
    // return NKN address
	Resolve(address string) (string, error)
}
```
> Implemented ResolverInterface to complete the conversion from other blockchain address to NKN address.

* Add Resolver, ETH address to NKN address
```
account, err := NewAccount(nil)
ethResolver, err := ethresolver.NewResolver(&ethresolver.Config{
    RpcServer:       "API Server",
    ContractAddress: "Contract Address",
})
if err != nil {
    return err
}

conf := &nkn.ClientConfig{
    Resolvers: nkngomobile.NewResolverArray(ethResolver),
}
client, err := NewMultiClient(account, "identifier", 3, true, conf)
client.Send(nkn.NewStringArray("ETH:0x123..."), "Hello world.", nil)
```

## How to implement

1. Establish mapping from other blockchain to Nkn address. In general, address mapping relies on smart contracts to store.
2. Implement Resolver for other blockchain address to NKN address. The interface like this:
```
type ResolverInterface interface {
    // [address] other blockchain address, eg: "ETH:0x123..."
    // return NKN address
	Resolve(address string) (string, error)
}
```
3. The implementation like this:
```
ResolverConfig {
    Prefix = "ETH:",   // if the send address start with "ETH:" like "ETH:0x123...", use this Resolver 
    RpcServer,        // API server URL
    ContractAddress,  // Smart contract address
}

resolver = NewResolver(ResolverConfig)
nknAddr = resolver.Resolve(ETHAddr)
```
4. Add Resolver in NKN SDK config
```
account, err := NewAccount(nil)
ethResolver, err := ethresolver.NewResolver(&ethresolver.Config{
    RpcServer:       "API Server",
    ContractAddress: "Contract Address",
})
if err != nil {
    return err
}

conf := &nkn.ClientConfig{
    Resolvers: nkngomobile.NewResolverArray(ethResolver),
}
client, err := NewMultiClient(account, "identifier", 3, true, conf)
client.Send(nkn.NewStringArray("ETH:0x123..."), "Hello world.", nil)
```
5. In golang. Unable to parse use `return "", nil`, then will go to the next `Resolver`. Parsing failure `return "", err`, then will interrupt parsing and return an error.