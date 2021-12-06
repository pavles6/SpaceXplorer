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

  if (name.length > 25) titleTextSize = 'text-3xl'

  if (name.length > 35) titleTextSize = 'text-2xl'

  if (name.length > 50) titleTextSize = 'text-2xl'

  return (
    <section
      className={`w-full h-launchHeaderXs sm:h-launchHeaderSm md:h-launchHeaderMd lg:h-launchHeader relative flex justify-center`}
    >
      <Image
        priority
        quality={100}
        src={landingImageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="bg-launch-image-gradient z-20 absolute w-full h-full" />
      <div className="w-full relative z-30 h-full flex flex-col justify-end items-center">
        <Text
          classes={`xl:text-6xl lg:text-5xl ${titleTextSize} mb-4 md:mb-0`}
          color="text-primary"
          weight="font-bold"
          align="text-center"
        >
          {name}
        </Text>
        {!isSmallScreen && mounted ? (
          <div className="flex flex-row justify-center py-3 mt-4 items-center jusitfy-center space-x-4 w-full bg-surfaceSecondary dark:bg-surfaceSecondaryDark bg-opacity-70 dark:bg-opacity-70">
            <LaunchBadge
              icon={ClockIcon}
              type="success"
              value={formattedDate}
            />
            {isCrew ? (
              <LaunchBadge icon={UserGroupIcon} type="success" value="Crew" />
            ) : null}
            <LaunchBadge
              icon={
                upcoming ? QuestionMarkCircleIcon : success ? CheckIcon : XIcon
              }
              type={success ? 'success' : 'failure'}
              value={upcoming ? 'N/A (Upcoming)' : launchOutcome}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
