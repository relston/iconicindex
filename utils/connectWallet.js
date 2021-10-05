import { abi } from '../artifacts/contracts/IconicIndex.sol/IconicIndex.json'
import { contractAddress } from '../artifacts/deploy.json'
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export function getLibrary(provider, connector) { 
  console.log('getLibrary', 'provider', provider, 'connector', connector);
  return new Web3Provider(provider);
}

export function useIconicIndexContract() {
  const { library, account } = useWeb3React()
  return new Contract(contractAddress, abi, library.getSigner(account));
}

export function ConnectButton() {
  const { activate } = useWeb3React();

  const onConnectClick = async () => {
    await activate(injected, null, null)
  }

  return <button onClick={onConnectClick}>Connect Wallet</button>
}