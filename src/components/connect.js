import { useConnectedWallet, injected } from "../utils/connectWallet";
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
  const { active, errMsg } = useConnectedWallet();
  
  if (active) {
    return <span style={textStyle}>Connected</span>
  }

  if (errMsg) {
    return <span style={textStyle}>{errMsg}</span>
  }
  return <ConnectButton />
}