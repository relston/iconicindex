# Iconic Index
https://iconicindex.vercel.app/

## Getting Started
- Setup your environment: `cp .env .env.local`
- Add set a secret key for `DEV_WALLET_PRIVATE_KEY` which will be contract owner
  - `npx hardhat wallet` to generate a new one
- `npx hardhat faucet` to get eth to your dev user

```bash
npx hardhat node 
npx hardhat run scripts/deploy.js
```

## Deploy Contract to Testnet
```bash
npx hardhat accounts --network rinkeby # check account value
npx hardhat run scripts/deploy.js --network rinkeby
```

Local UI:
```bash
npm run dev
```

Open up the base NFT contract
```bash
code node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol
```

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [the Next.js GitHub repository](https://github.com/vercel/next.js/) 