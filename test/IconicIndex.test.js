const { expect } = require("chai");

/**
 * @todo change the name of the contract
 * @todo 
 */
describe("Nft", function() {
  const baseUri = 'https://localhost'
  // const beneficiaryAddress = '123' // this is not working, I need an actuall address
  const initialFloorPrice = ethers.utils.parseUnits('0.1','ether')

  beforeEach(async () => {
    const [contractOwner, beneficiaryAddress, addr2] = await ethers.getSigners();
    this.contractOwner = contractOwner;
    this.beneficiaryAddress = beneficiaryAddress;
    this.addr2 = addr2;

    this.IconicIndexFactory = await ethers.getContractFactory("IconicIndex");
    this.iconicIndex = await this.IconicIndexFactory.deploy(baseUri, beneficiaryAddress.address, initialFloorPrice);

    await this.iconicIndex.deployed();
  });

  describe('deploying the contract', async () => {
    it('sets the floor price for the first token', async () => {
      const { iconicIndex } = this;
      const price = await iconicIndex.floorPriceFor(0);
      expect(price.toString()).to.equal(initialFloorPrice.toString()); 
    });

    it('sets the beneficiaryAddress', async () => {
      const { iconicIndex, beneficiaryAddress } = this;
      const address = await iconicIndex.beneficiaryAddress();
      expect(address).to.equal(beneficiaryAddress.address); 
    });
  });

  describe('a deployed contract', async () => {
    describe('minting', async () => {
      it('lets the owner mint', async () => {
        const { iconicIndex, contractOwner} = this;
        
        await iconicIndex.connect(contractOwner).mint();
        expect(await iconicIndex.ownerOf(1)).to.equal(contractOwner.address);  
      });
  
      it('does not let others mint', async () => {
        const { iconicIndex, addr1 } = this;
        let error;
        
        try { await iconicIndex.connect(addr1).mint() } 
        catch(e) { error = e; }
  
        expect(error.message).to.equal("VM Exception while processing transaction: revert Ownable: caller is not the owner");
      });
    });

    /**
     * @description buying a minted nft directly from the owner
     */
    describe('#purchase', async () => {
      const doPurchase = async () => {
        const { iconicIndex, addr1 } = this;
        await iconicIndex.connect(addr1).purchase(0, { value: initialFloorPrice });
      }

      it('assigns the NFT to the purchaser', async () => {
        const { iconicIndex, addr1, contractOwner } = this;
        const currentNFTOwner = await iconicIndex.ownerOf(0);
        expect(currentNFTOwner).to.equal(contractOwner.address);
        await doPurchase();
        const newNFTOwner = await iconicIndex.ownerOf(0);
        expect(newNFTOwner).to.equal(addr1.address);
      })

      /**
       * @description When a signer purchases the item from contract owner
       *              the owner gets the price set in eth
       */
      it('pays the contract owner', async () => {
        const { contractOwner } = this;
        const ownerWalletBeforePurchase = await contractOwner.getBalance();
        await doPurchase()
        const ownerWalletAfterPurchase = await contractOwner.getBalance();
        const difference = ownerWalletAfterPurchase.sub(ownerWalletBeforePurchase);
        expect(difference.toString()).to.equal(initialFloorPrice.toString());
      });

      describe('after a nft has already been bought', async () => {
        beforeEach(async () => {
          await doPurchase();
        });

        it('will not let anyone else purchase it', async () => {
          const { iconicIndex, addr2 } = this;
          let error;
          try { await iconicIndex.connect(addr2).purchase(0, { value: initialFloorPrice }); } 
          catch(e) { error = e; }
  
          expect(error.message).to.equal("VM Exception while processing transaction: revert Item not available for purchase");
        });
      });
    });
  });
});
