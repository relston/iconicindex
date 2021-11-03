import contractArtifact from '../../artifacts/contracts/IconicIndex.sol/IconicIndex.json'
import deployArtifact from '../../artifacts/deploy.json'
import { ethers } from 'ethers';
import { Contract } from "@ethersproject/contracts";

export default class IconicIndexContract {
  constructor(signer) {
    this.contract = new Contract(
      deployArtifact.contractAddress, 
      contractArtifact.abi, 
      signer
    );
  }

  async mintToken(tokenId, value) {
    const parsedValue = ethers.utils.parseUnits(value,'ether');
    const response = await this.contract.mint(tokenId, { value: parsedValue.toString() });
    return response;
  }

  /**
   * @description returns on-chain token props
   * @param {int} tokenId 
   * @param {function} callback 
   * @returns {object} object with floorPrice and owner address
   */
  async getTokenState(tokenId, callback) {
    const floorPrice = await this.getFloorPriceFor(tokenId);
    const owner = await this.getOwnerOf(tokenId);
    const state = {
      floorPrice,
      owner
    };

    if (callback) {
      callback(state);
    } else {
      return state;
    }
  }

  /**
   * @param {int} tokenId 
   * @returns {string} floor price for token in eth
   */
  async getFloorPriceFor(tokenId) {
    let price;
    try {
      price = await this.contract.floorPriceFor(tokenId);
      return ethers.utils.formatUnits(price);
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @description return Address of token owner, null if not minted
   * @param {int} tokenId 
   * @returns {string} Address of owner
   */
  async getOwnerOf(tokenId) {
    try {
      return await this.contract.ownerOf(tokenId);
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}