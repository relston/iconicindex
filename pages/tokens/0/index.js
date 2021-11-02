import AngryClip from './angryClip';
import crackedMud from './cracked-mud.jpg';
import styles from './styles.module.css';
import { useEffect, useState } from "react";
import { title, contentContainer } from '../../../styles/Home.module.css'
import { ConnectButton, useIconicIndexContract, useConnectedWallet } from '../../../utils/connectWallet'

const layoutBackground = {
  backgroundImage: `url('${crackedMud.src}')`
}

function MintToken () {
  const contract = useIconicIndexContract();
  const [floorPrice, setFloorPrice] = useState();
  
  useEffect(()=>{
    if (!floorPrice) {
      contract.getPriceFor(0, setFloorPrice);
    }
    
  }, [contract, floorPrice, setFloorPrice]);

  return <>Mint Token for {floorPrice} eth</>;
}

export default function FirstAsset () {
  const connectedWallet = useConnectedWallet();

  return (
    <>
      <main className={styles.layout}>
        <div className={styles.hidden}>
          <AngryClip /> 
        </div>
        <div className={styles.videoContainer}>
          <video autoPlay muted loop className={styles.videoBackground}>
            <source src="/000/20210620-ocean-drone-loop-sm.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.heroContainer}>
          <div className={styles.hero} style={layoutBackground}></div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={contentContainer}>
          <div>
            <p className={title}>Iconic Index</p>
            <p>©2021 Ryan Elston. All rights reserved.</p>
          </div>
          <div>
            {
              connectedWallet.isConnected ? <MintToken /> : <ConnectButton />
            }
          </div>
        </div>
      </footer>
    </>
  )  
}