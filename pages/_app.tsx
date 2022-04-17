import React from 'react'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

const NextApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <Head>
          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link
            rel="icon"
            sizes="192x192"
            type="image/png"
            href="/icons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="icons/android-chrome-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="32x32"
            href="/icons/apple-touch-icon.png"
          />
        </Head>
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default NextApp
