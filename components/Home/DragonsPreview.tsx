import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import { Transition } from '@headlessui/react'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { TextSize } from '../Text/ETextSize'
import { Dragon } from '../../lib/types/api'
import Link from 'next/link'
import { formatDate } from '../../lib/utils/date-functions'

interface Props {
  dragonsPreview: Dragon[]
}

export default function DragonsPreview({ dragonsPreview }: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [showDragonInfo, setShowDragonInfo] = useState('')

  const capsulesPreview = {
    name: 'Capsules',
    description:
      'Check out data and statistics about each Dragon ever made, their flights, current status, crew, etc...',
    flickr_images: [
      'https://farm9.staticflickr.com/8588/16661791299_a236e2f5dc_b.jpg',
    ],
  }

  return (
    <div
      className={`w-full min-h-landingTile ${theme.surfaceBackground} flex flex-col  items-center`}
    >
      <PreviewHeader
        title="Dragons"
        subtitle="Revolution in human space transportation"
      ></PreviewHeader>
      <div className="flex flex-row justify-center items-center flex-wrap">
        {dragonsPreview.map((dragon) => {
          const truncatedDescription =
            dragon.description.length > 125
              ? dragon.description.substr(0, 125) + '...'
              : dragon.description

          return (
            <Link key={dragon.id} href={`/dragons/${dragon.id}`}>
              <a className={`m-16 transition relative w-96 h-96`}>
                <img
                  src={dragon.flickr_images[0]}
                  alt={dragon.name}
                  className="object-cover w-full relative h-full rounded-xl"
                />
                <div
                  onMouseOver={() => setShowDragonInfo(dragon.name)}
                  onMouseLeave={() => setShowDragonInfo('')}
                  className={`flex justify-center items-center absolute top-0 left-0 w-full h-full ${
                    showDragonInfo === dragon.name ? 'bg-black' : ''
                  } rounded-xl bg-opacity-60 transition hover:shadow-lg`}
                >
                  <Transition
                    show={showDragonInfo === dragon.name}
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
                      {dragon.name}
                    </Text>
                    <Text
                      align="text-center"
                      size={TextSize.Lg}
                      color={theme.textAccent}
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
                        {`First flight: ${formatDate(
                          new Date(dragon.first_flight),
                          'MMMM D. YYYY.'
                        )}`}
                      </Text>
                      <Text
                        align="text-center"
                        color={dragon.active ? theme.mainText : theme.text}
                        size={TextSize.Base}
                      >
                        {dragon.active ? 'Active' : 'Not active'}
                      </Text>
                    </div>
                  </Transition>
                </div>
              </a>
            </Link>
          )
        })}
        <Link key={1} href="/capsules">
          <a className={`m-16 transition relative w-96 h-96`}>
            <img
              src={capsulesPreview.flickr_images[0]}
              alt={capsulesPreview.name}
              className="object-cover w-full relative h-full rounded-xl"
            />
            <div
              onMouseOver={() => setShowDragonInfo(capsulesPreview.name)}
              onMouseLeave={() => setShowDragonInfo('')}
              className={`flex justify-center items-center absolute top-0 left-0 w-full h-full ${
                showDragonInfo === capsulesPreview.name ? 'bg-black' : ''
              } rounded-xl bg-opacity-60 transition hover:shadow-lg`}
            >
              <Transition
                show={showDragonInfo === capsulesPreview.name}
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
                  {capsulesPreview.name}
                </Text>
                <Text
                  align="text-center"
                  size={TextSize.Lg}
                  color={theme.textAccent}
                  classes="overflow-clip"
                >
                  {capsulesPreview.description}
                </Text>
              </Transition>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
