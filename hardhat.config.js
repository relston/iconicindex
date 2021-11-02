const { loadEnvConfig } = require('@next/env');
const { INFURA_API_KEY, DEV_WALLET_PRIVATE_KEY, DEV_USER_ADDRESS, BENEFICIARY_PK, USER_PK } = loadEnvConfig('./').combinedEnv

require('@nomiclabs/hardhat-ethers');

task("accounts", "Prints the list of accounts and balances", async () => {
  const accounts = await ethers.getSigners();
  const promises = accounts.map(async account => {
    const balance = await ethers.provider.getBalance(account.address);
    return {
      address: account.address,
      balance: ethers.utils.formatEther(balance)
    }
  })
  
  for (const accountBalance of await Promise.all(promises)) {
    console.log(accountBalance.address, accountBalance.balance);
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

task('balance', 'Get the balance of dev user', async () => {
  const balance = await ethers.provider.getBalance(DEV_USER_ADDRESS);
  console.log(DEV_USER_ADDRESS, ethers.utils.formatEther(balance));
});

task('mint', 'mint token to test user', async () => {
  const contractArtifact = require('./artifacts/contracts/IconicIndex.sol/IconicIndex.json');
  const deployArtifact = require('./artifacts/deploy.json');
  const [_a,  _b, userWallet] = await ethers.getSigners();
  const contract = new ethers.Contract(
    deployArtifact.contractAddress, 
    contractArtifact.abi, 
    userWallet
  );
  await contract.mint(0, { value: ethers.utils.parseEther('1').toString() });
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  defaultNetwork: 'localhost',
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
