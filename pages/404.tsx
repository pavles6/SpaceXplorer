import Image from 'next/image'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'

export default function Custom404() {
  return (
    <div className="bg-light relative dark:bg-dark w-screen h-screen">
      <Navbar />
      <Image src="/img/404.jpg" layout="fill" objectFit="cover" />
      <div className="w-full absolute top-1/2 z-50 flex items-start justify-center">
        <Text variant="title1" color="main">
          404 | Not found
        </Text>
      </div>
    </div>
  )
}
