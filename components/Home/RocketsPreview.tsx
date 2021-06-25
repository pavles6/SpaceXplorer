import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { Theme } from '../../lib/types/theme'
import { Rocket } from '../../lib/types/api'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import { formatDate } from '../../lib/utils/date-functions'
import { useMediaQuery } from 'react-responsive'

interface Props {
  rocketsPreview: Rocket[]
}

export default function RocketsPreview({ rocketsPreview }: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' })

  const [showRocketInfo, setShowRocketInfo] = useState('')

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div
      className={`w-full min-h-landingTile  ${theme.surfaceBackground} flex flex-col justify-center`}
    >
      <PreviewHeader
        title="Rockets"
        subtitle="Every SpaceX rocket and it's achievements"
      />
      <div
        className={`flex flex-col lg:flex-row justify-center items-center lg:flex-wrap`}
      >
        {rocketsPreview.map((rocket, i) => {
          const truncatedDescription =
            rocket.description.length > 75
              ? rocket.description.substr(0, 75) + '...'
              : rocket.description
          return (
            <Link key={rocket.id} href={`/rockets/${rocket.id}`}>
              <a className={`my-16 md:mx-8 transition relative w-80 h-80`}>
                <img
                  src={rocket.flickr_images[0]}
                  alt={rocket.name}
                  className="object-cover w-full relative h-full rounded-xl"
                />
                <div
                  onMouseOver={() => setShowRocketInfo(rocket.name)}
                  onMouseLeave={() => setShowRocketInfo('')}
                  className={`absolute top-0 left-0 w-full h-full shadow-lg`}
                >
                  <Transition
                    show={
                      showRocketInfo === rocket.name ||
                      (isSmallScreen && isClient)
                    }
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute flex justify-center transition rounded-xl top-0 left-0 w-full h-full bg-black bg-opacity-50">
                      <div className="flex h-full w-3/4 flex-col justify-center items-center spacing-y-5">
                        <Text
                          size="text-2xl"
                          weight="font-semibold"
                          color="mainText"
                        >
                          {rocket.name}
                        </Text>
                        <Text
                          align="text-center"
                          variant="title2"
                          color="textAccent"
                          classes="overflow-clip"
                        >
                          {truncatedDescription}
                        </Text>
                        <div className="flex flex-col justify-center items-center mt-10">
                          <Text
                            align="text-center"
                            color="text"
                            variant="subtitle2"
                          >
                            {`No. of engines: ${rocket.engines.number}`}
                          </Text>
                          <Text
                            align="text-center"
                            color="text"
                            variant="subtitle2"
                          >
                            {`First flight: ${formatDate(
                              new Date(rocket.first_flight),
                              'MMMM D. YYYY.'
                            )}`}
                          </Text>
                          <Text
                            align="text-center"
                            color={rocket.active ? 'mainText' : 'textSecondary'}
                            variant="subtitle2"
                          >
                            {rocket.active ? 'Active' : 'Not active'}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
