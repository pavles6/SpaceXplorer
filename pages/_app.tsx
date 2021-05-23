import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import 'tailwindcss/tailwind.css'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
