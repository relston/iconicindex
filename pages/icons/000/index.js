import Image from 'next/image'
import AngryClip from './angryClip';
import crackedMud from './cracked-mud.jpg';
import styles from './styles.module.css';

const layoutBackground = {
  backgroundImage: `url('${crackedMud.src}')`
}

export default function FirstAsset () {
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
        Copyrighted Ryan Elston 2021
      </footer>
    </>
  )  
}