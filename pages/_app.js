import '../styles/globals.scss'
import style from '../styles/Home.module.scss';
import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }) {
  return <div className={style.outerContainer}>
    <Head>
      <title>Kinkmatch</title>
      <meta name='viewport' content='initial-scale=1, viewport-fit=cover' />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#e63946" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='manifest' href='/manifest.json' />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </div>
}

export default MyApp
