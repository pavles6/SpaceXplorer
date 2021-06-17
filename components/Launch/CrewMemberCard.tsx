import React, { ReactElement, useState } from 'react'
import { CrewMember } from '../../lib/types/api'
import { Transition } from '@headlessui/react'
import Text from '../Text/Text'
import { TextSize } from '../Text/ETextSize'
import { useSelector } from 'react-redux'
import { State } from '../../lib/types/redux'

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
  const theme = useSelector((state: State) => state.theme)
  const [showMemberInfo, setShowMemberInfo] = useState(false)

  return (
    <div
      tabIndex={0}
      className="w-44 h-44 sm:w-64 sm:h-64 m-2 sm:m-8 mb-0 flex relative shadow-md rounded-xl"
    >
      <img
        src={image}
        alt={`${name}, ${agency}`}
        className="object-cover w-full relative h-full rounded-xl"
      />
      <div
        onMouseOver={() => setShowMemberInfo(true)}
        onMouseLeave={() => setShowMemberInfo(false)}
        className={`absolute flex flex-col w-full h-full rounded-xl
            ${showMemberInfo ? 'bg-black' : ''} bg-opacity-60 transition
        `}
      >
        <Transition
          show={showMemberInfo}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="flex w-full h-full flex-col px-2 py-4 justify-center items-center spacing-y-5"
        >
          <Text
            classes="sm:text-xl md:text-2xl"
            weight="font-semibold"
            color={theme.mainText}
            align="text-center"
          >
            {name}
          </Text>
          <Text classes="sm:text-base md:text-lg" color={theme.textAccent}>
            {`Agency: ${agency}`}
          </Text>
          <Text classes="sm:text-base md:text-lg" color={theme.textAccent}>
            {`No. of missions: ${launches.length}`}
          </Text>
          <Text
            target="__blank"
            classes="sm:text-base md:text-lg"
            color={theme.mainText}
            weight="font-semibold"
            link
            href={wikipedia}
          >
            Wikipedia page
          </Text>
        </Transition>
      </div>
    </div>
  )
}
