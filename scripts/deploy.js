const { loadEnvConfig } = require('@next/env')
const { BENEFICIARY_ADDRESS, HOSTNAME } = loadEnvConfig('./').combinedEnv
const { ethers } = require("hardhat");
const nftPrice = ethers.utils.parseUnits('0.1','ether');

async function main() {
  const baseUri = HOSTNAME;
  const IconicIndexFactory = await ethers.getContractFactory('IconicIndex');

  console.log('Deploying nft contract');
  const iconicIndex = await IconicIndexFactory.deploy(baseUri, BENEFICIARY_ADDRESS, nftPrice);
  await iconicIndex.deployed();
  console.log('IconicIndex deployed to ', iconicIndex.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
