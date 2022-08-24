import type { AppProps } from 'next/app'

import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { SessionProvider } from "next-auth/react"

import Nav from '../components/nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <Nav/>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default MyApp