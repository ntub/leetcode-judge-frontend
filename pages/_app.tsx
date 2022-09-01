import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { SessionProvider } from "next-auth/react"

import Nav from '../components/nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>NTUB LeetCode Judge</title>
        <meta name="google-site-verification" content="BR861Afd-EP9DzWYrzgfbgOdiHVqvXrfVJQ_Pqzqlbo" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Nav/>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default MyApp