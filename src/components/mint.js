import { useEffect, useState } from "react";
import { actionButton } from '../styles/button.module.css'
import { mintContainer } from '../styles/mint.module.css'
import { useIconicIndexContract, useConnectedWallet, ConnectButton } from '../utils/connectWallet'

function MintUI ({ floorPrice, mintClick }) {
  const [price, setPrice] = useState(floorPrice);
  const invalid = price < floorPrice;
  return (
    <div className={mintContainer}>
      <div>
        <input 
          type='number' 
          value={price} 
          min={floorPrice}
          step={0.0001}
          onChange={e => setPrice(e.target.value)}
        ></input>
        <button 
          className={actionButton} 
          disabled={invalid} 
          onClick={ () => mintClick(price) }  
        >Mint</button>
      </div>
      <div>
        Minimum {floorPrice} eth to mint
      </div>
    </div>
  )
}

export default function MintController ({ tokenId, tokenState }) {
  const { floorPrice, owner } = tokenState;
  const connectedWallet = useConnectedWallet();
  const contract = useIconicIndexContract();
  const [minted, setMinted] = useState(false);
  const mintToken = async (value) => {
    const response = await contract.mintToken(token, value);
    setMinted(true);
  }
  
  if (owner) {
    return <>Token is owned by {owner}</>;
  }

  if (!floorPrice) {
    return <>Token info not available</>
  }
  
  if (!connectedWallet.active) {
    return <ConnectButton />
  }

  if (minted) {
    return <>Congrats! You have minted token {tokenId}</>
  }
    
  return <MintUI floorPrice={floorPrice} mintClick={mintToken} /> 
}