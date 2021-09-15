import { SearchIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
import Text from '../Text/Text'

interface Props {
  query?: string
}

export const SearchHeader = ({ query = '' }: Props) => {
  const theme = usePalette()

  return (
    <div
      className={`w-full lg:h-pageHeader md:h-pageHeaderMd sm:h-pageHeaderSm h-pageHeaderXs relative`}
    >
      <Image
        src="/img/search-header.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
      />
      <div
        className={`w-full h-full absolute z-30 ${theme.base.surfaceBackground} bg-opacity-50`}
      />
      <div className="absolute z-40 w-full h-full flex items-center justify-center flex-col space-y-4">
        <Text variant="h2" align="text-center" color="textAccent">
          Search everything about SpaceX
        </Text>
        <Text variant="title2" classes="xl:text-xl">
          Start by typing something or apply the filters below
        </Text>
        <div className="flex w-3/5 lg:w-2/5 relative">
          <input
            placeholder="dwadadwadadadwa"
            className="focus:outline-none rounded-xl p-1 w-full text-base h-14"
          />
          <SearchIcon
            className={`w-7 h-7 absolute right-3 top-1/4 ${theme.base.iconSecondary}`}
          />
        </div>
      </div>
    </div>
  )
}
