import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import deployConfig from '../artifacts/deploy.json'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Iconic Index</title>
        <meta name="description" content="Itterating iconigraphic static assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Iconic Index
        </h1>

        <p className={styles.description}>
          Iterating iconographic token assets
        </p>

        <p>
          Contract Address: { deployConfig.contractAddress }
        </p>

        <div className={styles.grid}>
          <Link href='assets/000'>
            <a className={styles.card}>
              <h2>First Asset &rarr;</h2>
              <p>Happy feet, freshly minted</p>
            </a>
          </Link>
          
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Copyright Ryan Elston 2021
      </footer>
    </div>
  )
}
