import Image from 'next/image'
import React from 'react'
import Text from '../Text/Text'

interface Props {}

export const SearchHeader = ({}: Props) => {
  return (
    <div className="flex items-center justify-center w-full lg:h-pageHeader md:h-pageHeaderMd sm:h-pageHeaderSm h-pageHeaderXs relative">
      <Image
        priority
        quality={100}
        src="/img/search-header.jpg"
        layout="fill"
        objectFit="cover"
      />
      <div className="w-full h-full bg-landing-image-gradient relative" />
      <div className="absolute z-30 w-full flex flex-col justify-center">
        <Text variant="h1" color="text-white" align="text-center">
          Search for SpaceX launches
        </Text>
        <Text
          classes="text-base text-white sm:text-lg xl:text-xl"
          weight="font-semibold"
          align="text-center"
        >
          Start by typing a launch name or applying the filters
        </Text>
      </div>
    </div>
  )
}
