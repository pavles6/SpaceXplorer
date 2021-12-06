import {
  ArrowCircleRightIcon,
  ArrowNarrowRightIcon,
  ArrowRightIcon,
  ExclamationIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'

export default function Custom404() {
  return (
    <div className="bg-surfaceSecondary dark:bg-surfaceSecondaryDark">
      <Navbar></Navbar>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <ExclamationIcon className={`text-primary w-48 h-w-48`} />
          <Text variant="title1" color="text-textMain dark:text-textMainDark">
            404 | Not found
          </Text>
          <Link href="/">
            <a className="flex items-center justify-center mt-2 group">
              <Text
                variant="title1"
                color="textAccent"
                classes={`group-hover:text-primary`}
              >
                Home
              </Text>
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
