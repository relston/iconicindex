import contractArtifact from '../artifacts/contracts/IconicIndex.sol/IconicIndex.json'
import deployArtifact from '../artifacts/deploy.json'
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

  async getPriceFor(tokenId, callback) {
    let price;
    try {
      price = await this.contract.floorPriceFor(tokenId);
    } catch(error) {
      console.log(error);
    }
    const parsedPrice = ethers.utils.formatUnits(price);
    if (callback) {
      callback(parsedPrice);
    } else {
      return parsedPrice;
    }
  }
}