import React, { ReactElement, useEffect, useState } from 'react'
import { CrewMember } from '../../lib/types/api'
import { Transition } from '@headlessui/react'
import Text from '../Text/Text'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import { usePalette } from '../../lib/palette/store'

interface Props extends CrewMember {
  key: React.Key
}

export default function CrewMemberCard({
  name,
  wikipedia,
  launches,
  agency,
  image,
}: Props): ReactElement {
  const [showMemberInfo, setShowMemberInfo] = useState(false)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = usePalette()

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' })

  return (
    <div
      tabIndex={0}
      className="w-64 h-64 my-8 md:mx-8 mb-0 flex relative shadow-md rounded-xl"
    >
      <Image
        layout="fill"
        objectFit="cover"
        src={image}
        alt={`${name}, ${agency}`}
        className="w-full relative h-full rounded-xl"
      />
      <div
        onMouseOver={() => setShowMemberInfo(true)}
        onMouseLeave={() => setShowMemberInfo(false)}
        className={`absolute flex flex-col w-full h-full
        `}
      >
        <Transition
          show={showMemberInfo || (isSmallScreen && mounted)}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="flex w-full h-full flex-col justify-center items-center spacing-y-5 rounded-xl
          bg-black bg-opacity-60 transition"
        >
          <Text
            classes={`cursor-default text-xl md:text-2xl ${theme.base.textPrimary}`}
            weight="font-semibold"
            align="text-center"
          >
            {name}
          </Text>
          <Text
            classes={`cursor-default sm:text-base md:text-lg ${theme.base['dark:textAccent']}`}
          >
            {`Agency: ${agency}`}
          </Text>
          <Text
            classes={`sm:text-base md:text-lg cursor-default ${theme.base['dark:textAccent']}`}
          >
            {`No. of missions: ${launches.length}`}
          </Text>
          {wikipedia ? (
            <Text
              target="_blank"
              classes={`sm:text-base md:text-lg ${theme.base['dark:textAccent']}`}
              decoration="underline"
              weight="font-semibold"
              link
              href={wikipedia}
            >
              Wikipedia page
            </Text>
          ) : null}
        </Transition>
      </div>
    </div>
  )
}
