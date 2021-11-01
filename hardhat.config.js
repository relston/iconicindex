const { loadEnvConfig } = require('@next/env')
const { INFURA_API_KEY, DEV_WALLET_PRIVATE_KEY, DEV_USER_ADDRESS, BENEFICIARY_PK, USER_PK } = loadEnvConfig('./').combinedEnv

require('@nomiclabs/hardhat-ethers');

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("wallet", "Generates a new wallet", async () => {
  const wallet = ethers.Wallet.createRandom();
  console.log('address', wallet.address)
  console.log('privateKey', wallet.privateKey)
});

task("faucet", "Give eth to dev user address", async () => {
  const [deployerWallet] = await ethers.getSigners();
  const tx = await deployerWallet.sendTransaction({
    to: DEV_USER_ADDRESS,
    value: ethers.utils.parseEther("1.0")
  });
  console.log('1 Eth sent to ', DEV_USER_ADDRESS, ' TX: ', tx);
});

task('balance', 'Get the balance of an address', async () => {
  const provider = ethers.getDefaultProvider();
  const balance = await provider.getBalance(DEV_USER_ADDRESS);
  console.log(DEV_USER_ADDRESS, ethers.utils.formatEther(balance));
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  networks: {
    hardhat: {
      accounts: [{
        privateKey: DEV_WALLET_PRIVATE_KEY, 
        balance: "10000000000000000000000"
      }, {
        privateKey: BENEFICIARY_PK,
        balance: "0"
      }, 
      {
        privateKey: USER_PK,
        balance: "10000000000000000000000"
      }]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [DEV_WALLET_PRIVATE_KEY]
    }
  }
};
