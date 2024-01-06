# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
```

```shell
npx hardhat node
(on the other console:)
npx hardhat run scripts/deploy.ts --network localhost
```

Could be also checked on Ganache

## compile contracts

`yarn hardhat compile`

## deploy NFT

`yarn hardhat deploy --network sepolia`
mint:
`yarn hardhat deploy --tags mintBasic --network sepolia`

you can see transactions here:
`https://sepolia.etherscan.io/`
on your wallet hash

## update frontend ABI contracts

these are used on frontend
(TODO: network required?)
`yarn hardhat deploy --tags frontend --network sepolia`

# TODO

https://hardhat.org/hardhat-runner/docs/guides/migrating-from-hardhat-waffle

# Helpful

Etherscan for sepolia:
https://sepolia.etherscan.io/

Error codes returned by Moralis SDK:
https://docs.moralis.io/web3-data-api/sdk-error-handling
