import type { AppProps } from 'next/app'

import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Nav from '../components/nav'
import UploadRecord from "../components/uploadRecord";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav/>
      <Component {...pageProps} />
      <UploadRecord/>
    </div>
  )
}

export default MyApp
