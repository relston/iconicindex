# Iconic Index
https://iconicindex.vercel.app/

## Getting Started
- Setup your environment: `cp .env .env.local`
- Add set a secret key for `DEV_WALLET_PRIVATE_KEY` which will be contract owner
  - `npx hardhat wallet` to generate a new one
- `npx hardhat faucet` to get eth to your dev user

```bash
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
## or testnet via infura
npx hardhat run --network ropsten scripts/deploy.js
```

Local UI:
```bash
npm run dev
```

#### References
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [the Next.js GitHub repository](https://github.com/vercel/next.js/) 