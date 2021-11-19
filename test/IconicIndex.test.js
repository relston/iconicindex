const { expect } = require("chai");

const expectError = async (callback) => {
  try {
    await callback();
  } catch (e) {
    return e.message;
  }
};

/**
 * @todo change the name of the contract
 */
describe("Nft", function () {
  const baseUri = "https://localhost/api/meta/";
  const initialFloorPrice = ethers.utils.parseUnits("0.1", "ether");

  const doMint = async () => {
    const { iconicIndex, addr1 } = this;
    await iconicIndex.connect(addr1).mint(0, { value: initialFloorPrice });
  };

  beforeEach(async () => {
    const [contractOwner, beneficiaryAddress, addr1] =
      await ethers.getSigners();
    this.contractOwner = contractOwner;
    this.beneficiaryAddress = beneficiaryAddress;
    this.addr1 = addr1;

    this.IconicIndexFactory = await ethers.getContractFactory("IconicIndex");
    this.iconicIndex = await this.IconicIndexFactory.deploy(
      baseUri,
      beneficiaryAddress.address,
      initialFloorPrice
    );

    await this.iconicIndex.deployed();
  });

  describe("deploying the contract", async () => {
    it("sets the floor price for the first token", async () => {
      const { iconicIndex } = this;
      const price = await iconicIndex.floorPriceFor(0);
      expect(price.toString()).to.equal(initialFloorPrice.toString());
    });

    it("sets the beneficiaryAddress", async () => {
      const { iconicIndex, beneficiaryAddress } = this;
      const address = await iconicIndex.beneficiaryAddress();
      expect(address).to.equal(beneficiaryAddress.address);
    });
  });

  describe("a deployed contract", async () => {
    describe(".postItem", async () => {
      const newFloorPrice = ethers.utils.parseUnits("0.2", "ether");

      it("creates a new token id and price", async () => {
        const { iconicIndex, contractOwner } = this;

        await iconicIndex.connect(contractOwner).postItem(newFloorPrice);
        const price = await iconicIndex.floorPriceFor(1);
        expect(price.toString()).to.equal(newFloorPrice.toString());
      });

      it("only allows the owner", async () => {
        const { iconicIndex, addr1 } = this;
        let error;

        try {
          await iconicIndex.connect(addr1).postItem(1);
        } catch (e) {
          error = e;
        }

        expect(error.message).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'"
        );
      });
    });

    /**
     * @description user minting
     */
    describe(".mint", async () => {
      beforeEach(async () => {
        const { iconicIndex, contractOwner } = this;
        await iconicIndex.connect(contractOwner).postItem(initialFloorPrice);
      });

      it("assigns the NFT to the purchaser", async () => {
        const { iconicIndex, addr1 } = this;
        await doMint();
        const newNFTOwner = await iconicIndex.ownerOf(0);
        expect(newNFTOwner).to.equal(addr1.address);
      });

      /**
       * @description The value of the contract increases
       */
      it("pays the contract", async () => {
        const { iconicIndex, addr1 } = this;
        let currentBalance = await iconicIndex.totalBalance();
        expect(currentBalance.toString()).to.equal("0");

        await doMint();

        currentBalance = await iconicIndex.totalBalance();
        expect(currentBalance.toString()).to.equal(
          initialFloorPrice.toString()
        );
      });

      /**
       * @description Signer may pay more than the set floor price for the token
       */
      it("can accept more then floor price", async () => {
        const { iconicIndex, addr1 } = this;
        const additionalEth = ethers.utils.parseUnits("0.1", "ether");
        const totalEth = initialFloorPrice.add(additionalEth);
        await iconicIndex.connect(addr1).mint(0, { value: totalEth });
      });

      it("will not mint non-posted token", async () => {
        const { iconicIndex, addr1 } = this;
        const mintUnknownToken = async () =>
          await iconicIndex
            .connect(addr1)
            .mint(100, { value: initialFloorPrice });
        const errorMessage = await expectError(mintUnknownToken);
        expect(errorMessage).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Unknown token id'"
        );
      });

      describe("after a nft has already been minted", async () => {
        beforeEach(async () => {
          await doMint();
        });

        it("will not let anyone else mint the token", async () => {
          const errorMessage = await expectError(doMint);
          expect(errorMessage).to.equal(
            "VM Exception while processing transaction: reverted with reason string 'ERC721: token already minted'"
          );
        });
      });
    });

    describe("Withdrawal", async () => {
      beforeEach(async () => {
        await doMint();
      });

      it("Transfers eth to beneficiary", async () => {
        const { iconicIndex, beneficiaryAddress } = this;
        const startingBalance = await beneficiaryAddress.getBalance();
        await iconicIndex.connect(beneficiaryAddress).withdrawFunds();
        const endingBalance = await beneficiaryAddress.getBalance();
        expect(endingBalance.gt(startingBalance));
      });

      it("only beneficiary can withdrawal", async () => {
        const { iconicIndex, addr1 } = this;
        const widthdrawal = async () =>
          await iconicIndex.connect(addr1).withdrawFunds();
        const errorMessage = await expectError(widthdrawal);
        expect(errorMessage).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Only beneficiary can withdrawal funds'"
        );
      });
    });

    describe("Token URIs", async () => {
      beforeEach(async () => {
        const { iconicIndex, contractOwner } = this;
        await iconicIndex.connect(contractOwner).postItem(initialFloorPrice);
        await iconicIndex
          .connect(contractOwner)
          .mint(0, { value: initialFloorPrice });
      });

      describe(".tokenURI", async () => {
        it("returns the URI from the deployment param", async () => {
          const { iconicIndex, contractOwner } = this;
          const tokenURI = await iconicIndex.connect(contractOwner).tokenURI(0);
          expect(tokenURI).to.equal("https://localhost/api/meta/0");
        });
      });

      describe(".setBaseUri", async () => {
        it("updates the base token URI", async () => {
          const newBaseURI = "https://example.com/";
          const { iconicIndex, contractOwner } = this;
          await iconicIndex.connect(contractOwner).setBaseUri(newBaseURI);
          const tokenURI = await iconicIndex.connect(contractOwner).tokenURI(0);
          expect(tokenURI).to.equal("https://example.com/0");
        });
      });
    });
  });
});
