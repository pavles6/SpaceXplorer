import React from 'react'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { PaletteProvider } from '../lib/palette/store'

const NextApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <PaletteProvider>
          <Component {...pageProps} />
        </PaletteProvider>
      </ThemeProvider>
    </>
  )
}

export default NextApp
