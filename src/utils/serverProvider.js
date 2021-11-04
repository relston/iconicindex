import { ethers } from "ethers";
import IconicIndexContract from "./iconicIndexContract";

const { NEXT_PUBLIC_CHAIN_ID, NETWORK_URL } = process.env;
const network = ethers.providers.getNetwork(NEXT_PUBLIC_CHAIN_ID);
const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL, network);
const limitedContract = new IconicIndexContract(provider);

export default class ServerProvider {
  static async getTokenState(tokenId) {
    const tokenState = await limitedContract.getTokenState(tokenId);
    const ensName =
      tokenState.owner && (await this.ensReverseLookup(tokenState.owner));

    if (ensName) {
      tokenState.owner = ensName;
    }

    return tokenState;
  }

  static async ensReverseLookup(address) {
    const mainnetProvider = ethers.getDefaultProvider();
    return await mainnetProvider.lookupAddress(address);
  }
}
