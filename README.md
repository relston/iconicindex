# Iconic Index
https://iconicindex.vercel.app/

## Getting Started
- Setup your environment: `cp .env .env.local`
- Add set a secret key for `DEV_WALLET_PRIVATE_KEY` which will be contract owner
  - `npx hardhat wallet` to generate a new one
- `npx hardhat faucet` to get eth to your dev user

```bash
npx hardhat node 
npx hardhat run scripts/deploy.js --network localhost
npm run dev
```

## Deploy Contract to Testnet
```bash
# check account value
npx hardhat accounts --network rinkeby 
npx hardhat run scripts/deploy.js --network rinkeby
```

Rinkeby: 0x21D4afEd3b302a6fCC6b9Bf96AFB73A502b9306b

# References
## Open up the base NFT contract
```bash
code node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol
```
## Links
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [the Next.js GitHub repository](https://github.com/vercel/next.js/) 