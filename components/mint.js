import { useEffect, useState } from "react";
import { actionButton } from '../styles/button.module.css'
import { mintContainer } from '../styles/mint.module.css'
import { useIconicIndexContract } from '../utils/connectWallet'

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

export default function MintController ({ token }) {
  const contract = useIconicIndexContract();
  const [tokenState, setTokenState] = useState();

  const mintToken = async (value) => {
    const response = await contract.mintToken(token, value);
    debugger
  }
  
  useEffect(()=>{
    if (!tokenState) {
      contract.getTokenState(token, setTokenState);
    }
  }, [contract, tokenState, setTokenState]);

  if (tokenState) {
    const { floorPrice, owner } = tokenState;
    
    if (owner) {
      return <>Token owned by {owner}</>;
    }
    
    return <MintUI floorPrice={floorPrice} mintClick={mintToken} />
  }
  return <>Loading...</>;
}