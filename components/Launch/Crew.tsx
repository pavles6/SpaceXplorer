import React from 'react'
import { useSelector } from 'react-redux'
import { CrewMember } from '../../lib/types/api'
import { State } from '../../lib/types/redux'
import { TextSize } from '../Text/ETextSize'
import Text from '../Text/Text'
import CrewMemberCard from './CrewMemberCard'

interface Props {
  crew: CrewMember[]
}

export const CrewSection = ({ crew }: Props) => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className="flex w-full h-full mt-12 transition flex-col">
      <Text heading size={TextSize.h2} color={theme.textAccent}>
        Crew
      </Text>
      <div className={`mt-4 flex justify-center w-full`}>
        {crew.length > 0 ? (
          <div className="grid max-w-full gap-4 sm:gap-0 justify-items-center justify-center grid-flow-col grid-rows-2 xl:grid-rows-1">
            {crew.map((crewMember) => (
              <CrewMemberCard key={crewMember.id} {...crewMember} />
            ))}
          </div>
        ) : (
          <Text variant="title1" color={theme.text}>
            There's no available crew data for this launch.
          </Text>
        )}
      </div>
    </div>
  )
}
