const nftPrice = ethers.utils.parseUnits('0.1','ether');
const devAddress = '0xd756cB92BcD8400CA1B12a237b7C57FdF3Bc26f7';

async function deployContract () {
  const IconicIndexFactory = await ethers.getContractFactory('IconicIndex');
  console.log('deploying nft contract');
  const iconicIndex = await IconicIndexFactory.deploy(nftPrice);
  await iconicIndex.deployed();
  console.log('IconicIndex deployed to ', iconicIndex.address)
};

async function main() {
  await deployContract ();

  const [contractOwner, addr1, addr2] = await ethers.getSigners();
  console.log('contractOwner ', contractOwner.address);

  const tx = await addr2.sendTransaction({
    to: devAddress,
    value: ethers.utils.parseEther("1.0")
  });
  console.log('transaction complete', tx);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
