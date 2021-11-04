import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'
import IconicIndexContract from './iconicIndexContract';

const PRIMARY_CHAIN = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
const CHAINS = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  42: 'Kovan',
  1337: 'Localhost',
  31337: 'Hardhat'
}

export const injected = new InjectedConnector({ supportedChainIds: [PRIMARY_CHAIN] })

export function getLibrary(provider, _connector) { 
  return new Web3Provider(provider);
}

export function useIconicIndexContract() {
  const { library, account } = useWeb3React();
  if (!library || !account) {
    return;
  }
  return new IconicIndexContract(library.getSigner(account));
}

const parseErrMsg = error => {
  if (error && error.name === 'UserRejectedRequestError') {
    return `Please please accept connection request`;
  }
  if (error && error.name === 'UnsupportedChainIdError') {
    return `Please switch to ${CHAINS[PRIMARY_CHAIN]} network`;
  }
}

export function useConnectedWallet() {
  const web3Context = useWeb3React();
  console.log('web3Context', web3Context);
  const errMsg = parseErrMsg(web3Context.error);
  const contract = useIconicIndexContract();
  
  return {
    errMsg,
    contract,
    ...web3Context
  }
}