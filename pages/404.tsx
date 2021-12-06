import { ArrowCircleRightIcon, ExclamationIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'
import { usePalette } from '../lib/palette/store'

export default function Custom404() {
  const theme = usePalette()

  return (
    <div className={`${theme.base.surfaceBackground}`}>
      <Navbar></Navbar>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <ExclamationIcon
            className={`${theme.base.iconPrimary} w-48 h-w-48`}
          />
          <Text variant="title1">404 | Not found</Text>
          <Link href="/">
            <a className="flex items-center justify-center mt-2 group">
              <Text
                variant="title1"
                color="textAccent"
                classes={`group-hover:${theme.base.textPrimary}`}
              >
                Home
              </Text>
              <ArrowCircleRightIcon
                className={`group-hover:${theme.base.textPrimary} w-5 h-5 ml-1.5`}
              />
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
