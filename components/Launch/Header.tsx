import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Text from '../Text/Text'
import { LaunchBadge } from './LaunchBadge'
import { useMediaQuery } from 'react-responsive'

interface Props {
  landingImageUrl: string
  name: string
  launchOutcome: string
  formattedDate: string
  isCrew: boolean
  upcoming: boolean
  success: boolean
}

export const LaunchHeaderSection = ({
  landingImageUrl,
  name,
  formattedDate,
  launchOutcome,
  isCrew,
  upcoming,
  success,
}: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' })

  let titleTextSize = 'text-4xl'

  const [imageLoaded, setimageLoaded] = useState(false)

  if (name.length > 25) titleTextSize = 'text-3xl'

  if (name.length > 35) titleTextSize = 'text-2xl'

  if (name.length > 50) titleTextSize = 'text-2xl'

  return (
    <section
      className={`w-full h-launchHeaderXs sm:h-launchHeaderSm md:h-launchHeaderMd lg:h-launchHeader relative flex justify-center`}
    >
      {!imageLoaded && (
        <div className="bg-darkSecondary/50 dark:bg-lightSecondary/50 animate-pulse w-full h-full absolute " />
      )}
      {landingImageUrl ? (
        <Image
          priority
          quality={50}
          src={landingImageUrl}
          onLoad={() => setimageLoaded(true)}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      ) : null}

      <div className="bg-launch-image-gradient z-20 absolute w-full h-full" />
      <div className="w-full relative z-30 h-full flex flex-col justify-end items-center">
        <Text
          classes={`xl:text-6xl lg:text-5xl ${titleTextSize} mb-4 md:mb-0`}
          fixedSize={titleTextSize as any}
          color="main"
          weight="font-bold"
          textAlign="text-center"
        >
          {name}
        </Text>
        {!isSmallScreen && mounted ? (
          <div className="flex flex-row justify-center py-3 mt-4 items-center jusitfy-center space-x-4 w-full border-light/20 border-t">
            <LaunchBadge
              icon={ClockIcon}
              type="success"
              color="info"
              value={formattedDate}
            />
            {isCrew ? (
              <LaunchBadge
                icon={UserGroupIcon}
                type="success"
                value="Crew"
                color="main"
              />
            ) : null}
            <LaunchBadge
              icon={
                upcoming ? QuestionMarkCircleIcon : success ? CheckIcon : XIcon
              }
              type={success ? 'success' : 'failure'}
              value={upcoming ? 'N/A (Upcoming)' : launchOutcome}
              color="success"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
