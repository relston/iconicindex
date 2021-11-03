import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from '../utils/connectWallet'
import '../styles/globals.css'


function IconicIndex({ Component, pageProps }) {
  return <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
         </Web3ReactProvider>
}
export default IconicIndex;
