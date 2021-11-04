# Iconic Index
https://iconicindex.vercel.app/

This is my personal NFT project. Each token is an html page layout that I created with a combination of handmade or royalty free assets. 

Contract is not currently on mainnet. When I choose to go live all proceeds for any NFT mints will go to [Coin Center](https://www.coincenter.org/) to help shape sensible government policy for cryptocurrencies.

The novel thing about this NFT contact is that it implements a `floorPrice` for each token. This allows the minter to pay any amount over that set amount for the token.

This essentially makes token minting a proxy donation to Coin Center!

This project was built with:
- Hardhat
- Ethers.js
- Next.js

Any feedback or advice is greatly welcome and appreciated!

## Getting Started
- Setup your environment: `cp .env .env.local`
- Add set a secret key for `DEV_WALLET_PRIVATE_KEY` which will be contract owner
  - `npx hardhat wallet` to generate a new one
- `npx hardhat faucet` to get eth to your dev user

```bash
npx hardhat node 
npx hardhat run scripts/deploy.js --network localhost
```
Copy the contract address and put it into the `NEXT_PUBLIC_CONTRACT_ADDRESS` of your `.env.local` file.
```bash
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