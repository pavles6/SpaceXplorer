import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { TextSize } from '../Text/ETextSize'
import { Theme } from '../../lib/types/theme'
import { Rocket } from '../../lib/types/api'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import { formatDate } from '../../lib/utils/format-date'

interface Props {
  rocketsPreview: Rocket[]
}

export default function RocketsPreview({ rocketsPreview }: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [showRocketInfo, setShowRocketInfo] = useState('')

  return (
    <div
      className={`w-full min-h-landingTile  ${theme.surfaceBackground} flex flex-col justify-center`}
    >
      <PreviewHeader
        title="Rockets"
        subtitle="Every SpaceX rocket and it's achievements"
      ></PreviewHeader>{' '}
      <div className={`flex flex-row justify-center items-center flex-wrap`}>
        {rocketsPreview.map((rocket, i) => {
          const truncatedDescription =
            rocket.description.length > 75
              ? rocket.description.substr(0, 75) + '...'
              : rocket.description
          return (
            <Link key={rocket.id} href={`/rockets/${rocket.id}`}>
              <a className={`m-16 transition relative w-80 h-80`}>
                <img
                  src={rocket.flickr_images[0]}
                  alt={rocket.name}
                  className="object-cover w-full relative h-full rounded-xl"
                />
                <div
                  onMouseOver={() => setShowRocketInfo(rocket.name)}
                  onMouseLeave={() => setShowRocketInfo('')}
                  className={`flex justify-center items-center absolute top-0 left-0 w-full h-full ${
                    showRocketInfo === rocket.name ? 'bg-black' : ''
                  } rounded-xl bg-opacity-60 transition hover:shadow-lg`}
                >
                  <Transition
                    show={showRocketInfo === rocket.name}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="flex w-2/3 flex-col justify-center items-center spacing-y-5"
                  >
                    <Text
                      size={TextSize.Xl4}
                      weight="font-semibold"
                      color={theme.mainText}
                    >
                      {rocket.name}
                    </Text>
                    <Text
                      align="text-center"
                      size={TextSize.Lg}
                      color={theme.text}
                      classes="overflow-clip"
                    >
                      {truncatedDescription}
                    </Text>
                    <div className="flex flex-col justify-center items-center mt-10">
                      <Text
                        align="text-center"
                        color={theme.text}
                        size={TextSize.Base}
                      >
                        {`No. of engines: ${rocket.engines.number}`}
                      </Text>
                      <Text
                        align="text-center"
                        color={theme.text}
                        size={TextSize.Base}
                      >
                        {`First flight: ${formatDate(
                          new Date(rocket.first_flight),
                          'MMMM D. YYYY.'
                        )}`}
                      </Text>
                      <Text
                        align="text-center"
                        color={
                          rocket.active ? theme.mainText : theme.textSecondary
                        }
                        size={TextSize.Base}
                      >
                        {rocket.active ? 'Active' : 'Not active'}
                      </Text>
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
