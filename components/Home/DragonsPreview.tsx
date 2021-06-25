import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import { Transition } from '@headlessui/react'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { Dragon } from '../../lib/types/api'
import Link from 'next/link'
import { formatDate } from '../../lib/utils/date-functions'
import { useMediaQuery } from 'react-responsive'

interface Props {
  dragonsPreview: Dragon[]
}

export default function DragonsPreview({ dragonsPreview }: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const dataToMap = []

  dragonsPreview.map((dragon) =>
    dataToMap.push({
      href: `/dragons/${dragon.id}`,
      id: dragon.id,
      flickr_images: dragon.flickr_images,
      name: dragon.name,
      description: dragon.description,
      first_flight: dragon.first_flight,
      active: dragon.active,
    })
  )

  dataToMap.push({
    name: 'Capsules',
    id: 'Capsules',
    href: '/capsules',
    description:
      'Check out data and statistics about each Dragon ever made, their flights, current status, crew, etc...',
    flickr_images: [
      'https://farm9.staticflickr.com/8588/16661791299_a236e2f5dc_b.jpg',
    ],
  })

  const [showDragonInfo, setShowDragonInfo] = useState('(max-width: 767px)')

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' })

  return (
    <div
      className={`w-full min-h-landingTile ${theme.surfaceBackground} flex flex-col  items-center`}
    >
      <PreviewHeader
        title="Dragons"
        subtitle="Revolution in human space transportation"
      ></PreviewHeader>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:flex-wrap">
        {dataToMap.map((dragon) => {
          const truncatedDescription =
            dragon.description.length > 125
              ? dragon.description.substr(0, 125) + '...'
              : dragon.description

          return (
            <Link key={dragon.id} href={dragon.href}>
              <a className={`my-16 lg:mx-8 transition relative w-80 h-80`}>
                <img
                  src={dragon.flickr_images[0]}
                  alt={dragon.name}
                  className="object-cover w-full relative h-full rounded-xl"
                />
                <div
                  onMouseOver={() => setShowDragonInfo(dragon.name)}
                  onMouseLeave={() => setShowDragonInfo('')}
                  className={`absolute top-0 left-0 w-full h-full shadow-lg`}
                >
                  <Transition
                    show={
                      showDragonInfo === dragon.name ||
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
                          {dragon.name}
                        </Text>
                        <Text
                          align="text-center"
                          variant="subtitle2"
                          color="textAccent"
                          classes="overflow-clip"
                        >
                          {truncatedDescription}
                        </Text>
                        {dragon!.active ? (
                          <div className="flex flex-col justify-center items-center mt-10">
                            <Text
                              align="text-center"
                              color="text"
                              variant="subtitle2"
                            >
                              {`First flight: ${formatDate(
                                new Date(dragon.first_flight),
                                'MMMM D. YYYY.'
                              )}`}
                            </Text>
                            <Text
                              align="text-center"
                              color={dragon.active ? 'mainText' : 'text'}
                              variant="subtitle2"
                            >
                              {dragon.active ? 'Active' : 'Not active'}
                            </Text>
                          </div>
                        ) : null}
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
