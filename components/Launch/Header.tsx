import Image from 'next/image'
import React from 'react'
import { formatDate } from '../../lib/utils/date-functions'
import Text from '../Text/Text'

interface Props {
  landingImageUrl: string
  name: string
  launchOutcome: string
  date_unix: number
}

export const HeaderSection = ({
  landingImageUrl,
  name,
  date_unix,
  launchOutcome,
}: Props) => {
  let titleTextSize = 'text-4xl'

  if (name.length > 25) titleTextSize = 'text-3xl'

  if (name.length > 35) titleTextSize = 'text-2xl'

  if (name.length > 50) titleTextSize = 'text-2xl'

  return (
    <section
      className={`w-full h-launchHeaderXs sm:h-launchHeaderSm md:h-launchHeaderMd lg:h-launchHeader relative flex justify-center`}
    >
      <Image
        quality={100}
        src={landingImageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="bg-launch-image-gradient z-20 absolute w-full h-full" />
      <div className="w-full relative z-30 h-full flex flex-col justify-end items-center">
        <Text
          classes={`xl:text-6xl lg:text-5xl ${titleTextSize}`}
          color="mainText"
          weight="font-bold"
          align="text-center"
        >
          {name}
        </Text>
        <div className="flex flex-row items-center jusitfy-center space-x-4">
          <Text
            variant="h3"
            color="textAccent"
            weight="font-semibold"
            classes="mt-2 mb-4 sm:mb-6 md:mb-8 lg:mb-12"
          >
            {`${formatDate(
              new Date(date_unix * 1000),
              'MMMM D, YYYY.'
            )} ${`• ${launchOutcome}`}`}
          </Text>
        </div>
      </div>
    </section>
  )
}
