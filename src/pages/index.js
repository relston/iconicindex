import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { actionButton } from '../styles/button.module.css'
import crustyImg from './tokens/0/crusty-screenshot.png'
import { useEffect, useState } from "react";
import { ConnectButton, useConnectedWallet } from '../utils/connectWallet'

export default function Home() {  
  const connectedWallet = useConnectedWallet();
  
  const {
    container,
    splash,
    headerBar,
    row,
    title,
    angryIcon,
    contentContainer,
    about,
    displayHeader,
    orange,
    platinum,
    faq,
    oxfordBlue,
    card,
    footer,
    spreads,
    spreadImage
  } = styles;

  return (
    <div className={container}>
      <Head>
        <title>Iconic Index</title>
        <meta name="description" content="Itterating iconigraphic static assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={splash}>
        <div className={headerBar}>
          <div className={`${row} ${title}`}>Iconic Index</div>
          <div className={row}>
            {
              !connectedWallet.active && <ConnectButton className={actionButton} />
            }
          </div>
        </div>
        <div className={angryIcon}></div>
        {/* todo make this guy parallax, maybe fade */}
      </div>

      <div className={about}>
        <div className={contentContainer}>
          <h1 className={displayHeader}>
            <span className={platinum}>If a jpeg is an asset,</span> 
            <span className={orange}>why not a web page?</span>
          </h1>
          <p>
            Html layouts are mixed media canvases. This is a collection of fun, interesting, interactive, and <em>ownable</em> pages that stand in the crossroads of art and tech.
          </p>
        </div>
      </div>

      <div className={spreads}>
        <div className={contentContainer}>
          <h1 className={`${displayHeader} ${orange}`}>Latest Spreads</h1>
          <ul>
            <li className={spreadImage}>
              <Link href='/tokens/0' >
                <a><Image src={crustyImg.src} alt='Crusty' layout='fill' objectFit='cover'/></a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={faq}>
        <div className={contentContainer}>
          <h1 className={displayHeader}>
            <span className={oxfordBlue}>Frequently Asked</span> 
            <span className={orange}>Questions</span>
          </h1>
          <div className={card}>
            <h2>What are these?</h2>
            <p>They are html page layouts, but NFT. I like to call them <em>spreads</em>.</p>
            <p>
              Each <em>spread</em> in this collection is a one-of-one, mobile responsive webpage compositions that can be minted, owned and traded like any other ERC721 NFT.
            </p>
          </div>
          <div className={card}>
            <h2>Why would I want a <em>spread</em>?</h2>
            <p>Because you found one that speaks to you <i>just as it did for me.</i></p>
            <p>Plus 100% of the initial purchase price goes to <a href='https://www.coincenter.org/' target='_blank' rel='noreferrer'>Coin Center</a> to help shape sensible government policy for cryptocurrencies</p>
          </div>

          <div className={card}>
            <h2>How do I buy a <em>spread</em>?</h2>
            <p>If a layout is available you can purchase it directly by connecting your wallet. Otherwise you can find links to the layout on OpenSea and make an offer to the current owner.</p>
          </div>

          <div className={card}>
            <h2>Who made this?</h2>
            <p>Hi! My name is Ryan Elston. </p>
            <p>I&apos;m a software engineer out in the bay area. I sometimes like to tinker with things. Whenever I come up with something cool I want to put it here for y&apos;all.</p>
          </div>
        </div>
      </div>

      <div className={footer}>
        <div className={contentContainer}>
          <div>
            <p className={title}>Iconic Index</p>
            <p>©2021 Ryan Elston. All rights reserved.</p>
          </div>
          <div>
            <p><a href='https://relston.github.io/'>Github</a></p>
            <p><a href='https://twitter.com/RyanElston'>Twitter</a></p>
            <p><a href='https://www.linkedin.com/in/elstonryan/'>LinkedIn</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
