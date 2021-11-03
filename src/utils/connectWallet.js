import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'
import IconicIndexContract from './iconicIndexContract';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 31337, 1337] })

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
  const isConnected = typeof web3Context.account === "string" && !!web3Context.library;
  
  return {
    isConnected,
    ...web3Context
  }
}

export function ConnectButton() {
  const { activate } = useWeb3React();
  const onConnectClick = async () => {
    await activate(injected, null, null)
  }

  return <button onClick={onConnectClick} >Connect Wallet</button>
}