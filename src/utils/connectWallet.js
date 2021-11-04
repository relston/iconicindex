import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  InjectedConnector,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import IconicIndexContract from "./iconicIndexContract";

const CHAINS = {
  1: "Ethereum Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
  1337: "Localhost",
  31337: "Hardhat",
};
const PRIMARY_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
export const PRIMARY_CHAIN = CHAINS[PRIMARY_CHAIN_ID];
export const injected = new InjectedConnector({
  supportedChainIds: [PRIMARY_CHAIN_ID],
});

export function getLibrary(provider, _connector) {
  return new Web3Provider(provider);
}

export function useConnectedWallet() {
  const web3Context = useWeb3React();
  const { error, library, account } = web3Context;
  const userRejected = error && error instanceof UserRejectedRequestError;
  const wrongChain = error && error instanceof UnsupportedChainIdError;
  const contract =
    library && account && new IconicIndexContract(library.getSigner(account));

  return {
    userRejected,
    wrongChain,
    contract,
    ...web3Context,
  };
}
