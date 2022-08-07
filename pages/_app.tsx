import type { AppProps } from 'next/app'

import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Nav from '../components/nav'
import UploadRecord from "../components/uploadRecord";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <Nav/>
        <Component {...pageProps} />
        <UploadRecord/>
      </SessionProvider>
    </div>
  )
}

export default MyApp
