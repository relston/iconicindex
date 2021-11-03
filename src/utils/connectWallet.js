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

export function useConnectedWallet() {
  const web3Context = useWeb3React();
  const { error, active } = web3Context;
  let callToAction = 'Connect Wallet';

  if (error && error.name === 'UserRejectedRequestError') {
    callToAction = `Please please accept connection request`;
  }
  if (error && error.name === 'UnsupportedChainIdError') {
    callToAction = `Please switch to ${CHAINS[PRIMARY_CHAIN]} network`;
  }
  if (active) {
    callToAction = 'Connected';
  }
  
  return {
    callToAction,
    ...web3Context
  }
}

export function ConnectButton() {
  const { activate, callToAction } = useConnectedWallet();
  const onConnectClick = async () => {
    await activate(injected, null, null)
  }
  return <button onClick={onConnectClick} >{ callToAction }</button>
}