import styles from "./styles.module.css";
import AngryClip from "./angryClip";
import crackedMud from "./cracked-mud.jpg";
import crustyImg from "./crusty-screenshot.png";
import { title } from "../../../styles/Home.module.css";
import ServerProvider from "../../../utils/serverProvider";
import MintController from "../../../components/mint";

const layoutBackground = {
  backgroundImage: `url('${crackedMud.src}')`,
};

export const crustyToken = {
  name: "Crusty",
  description: "Dry in the wettest places",
  imageSrc: crustyImg.src,
  tokenPath: "/tokens/0",
  animationPath: "/tokens/0",
  backgroundColor: "#000000",
};

export default function FirstAsset({ tokenState }) {
  return (
    <>
      <main className={styles.layout}>
        <div className={styles.hidden}>
          <AngryClip />
        </div>
        <div className={styles.videoContainer}>
          <video autoPlay muted loop className={styles.videoBackground}>
            <source
              src="/000/20210620-ocean-drone-loop-sm.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className={styles.heroContainer}>
          <div className={styles.hero} style={layoutBackground}></div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.contentContainer}>
          <div className={styles.footerPanel}>
            <p className={title}>Iconic Index</p>
            <p>©2021 Ryan Elston. All rights reserved.</p>
          </div>
          <div className={styles.footerPanel}>
            <p className={title}>{crustyToken.name}</p>
            <p>{crustyToken.description}</p>

            <MintController tokenId={0} tokenState={tokenState} />
          </div>
        </div>
      </footer>
    </>
  );
}

export const getServerSideProps = async (_context) => {
  const tokenState = await ServerProvider.getTokenState(0);
  return { props: { tokenState } };
};
