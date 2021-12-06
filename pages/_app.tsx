import React from 'react'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'

const NextApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default NextApp
