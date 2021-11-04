import { useConnectedWallet, injected, PRIMARY_CHAIN } from "../utils/connectWallet";
import { actionButton } from '../styles/button.module.css'

const textStyle = {
  color: '#e5e5e5ff',
  fontFamily: 'Gemunu Libre'
}

export function ConnectButton() {
  const { activate } = useConnectedWallet();
  const onConnectClick = async () => {
    await activate(injected, null, null);
  }
  return <button className={actionButton} onClick={onConnectClick}>Connect Wallet</button>
}

export default function ConnectComponent () {
  const connectedWallet = useConnectedWallet();
  console.log('connectedWallet', connectedWallet);
  const { active, wrongChain, userRejected } = connectedWallet;
  
  if (active) {
    return <span style={textStyle}>Connected</span>
  }

  if (wrongChain) {
    return <span style={textStyle}>Please switch to {PRIMARY_CHAIN} network</span>
  }

  return (
    <>
      { userRejected && <p>Please accept connection request</p> }
      <ConnectButton />
    </>
  )
}