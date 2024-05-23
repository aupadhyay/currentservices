import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Current Services</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="./apple-touch-icon.png" />
        <link rel="manifest" href="./site.webmanifest" />
        <meta name="theme-color" content="#4a4a4a" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
