import { ethers } from 'ethers'
import IconicIndexContract from './iconicIndexContract';

const { CHAIN_ID, NETWORK_URL } = process.env;
const network = ethers.providers.getNetwork(CHAIN_ID);
const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL, network);
const limitedContract = new IconicIndexContract(provider);

export default class ServerProvider {
  static async getTokenState(tokenId) {
    const tokenState = await limitedContract.getTokenState(tokenId);
    if (tokenState.owner) {
      const ensName = await this.ensReverseLookup(tokenState.owner);
      console.log('ensName', ensName);
      tokenState.owner = ensName;
    }
    return tokenState;
  }

  static async ensReverseLookup(address) {
    const mainnetProvider = ethers.getDefaultProvider();
    return await mainnetProvider.lookupAddress(address);
  }
}
 