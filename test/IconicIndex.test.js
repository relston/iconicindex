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
    const [contractOwner, beneficiaryAddress, addr1] = await ethers.getSigners();
    this.contractOwner = contractOwner;
    this.beneficiaryAddress = beneficiaryAddress;
    this.addr1 = addr1;

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
    describe('#postItem', async () => {

    })

    describe('postItem', async () => {
      const newFloorPrice = ethers.utils.parseUnits('0.2','ether')

      it('creates a new token id and price', async () => {
        const { iconicIndex, contractOwner } = this;
        
        await iconicIndex.connect(contractOwner).postItem(newFloorPrice);
        const price = await iconicIndex.floorPriceFor(1);
        expect(price.toString()).to.equal(newFloorPrice.toString()); 
      });
  
      it('only allows the owner', async () => {
        const { iconicIndex, addr1 } = this;
        let error;
        
        try { await iconicIndex.connect(addr1).postItem(1); } 
        catch(e) { error = e; }
  
        expect(error.message).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
        );
      });
    });

    /**
     * @description user minting
     */
    describe('#mint', async () => {
      const doMint = async () => {
        const { iconicIndex, addr1 } = this;
        await iconicIndex.connect(addr1).mint(0, { value: initialFloorPrice });
      }

      it('assigns the NFT to the purchaser', async () => {
        const { iconicIndex, addr1, contractOwner } = this;
        const currentNFTOwner = await iconicIndex.ownerOf(0);
        expect(currentNFTOwner).to.equal(contractOwner.address);
        await doMint();
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
        await doMint()
        const ownerWalletAfterPurchase = await contractOwner.getBalance();
        const difference = ownerWalletAfterPurchase.sub(ownerWalletBeforePurchase);
        expect(difference.toString()).to.equal(initialFloorPrice.toString());
      });

      describe('after a nft has already been bought', async () => {
        beforeEach(async () => {
          await doMint();
        });

        it('will not let anyone else purchase it', async () => {
          const { iconicIndex, addr1 } = this;
          let error;
          try { await iconicIndex.connect(addr1).purchase(0, { value: initialFloorPrice }); } 
          catch(e) { error = e; }
  
          expect(error.message).to.equal("VM Exception while processing transaction: revert Item not available for purchase");
        });
      });
    });
  });
});
