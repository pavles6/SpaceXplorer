import React from 'react'
import { useSelector } from 'react-redux'
import { CrewMember } from '../../lib/types/api'
import { State } from '../../lib/types/redux'
import Text from '../Text/Text'
import CrewMemberCard from './CrewMemberCard'

interface Props {
  crew: CrewMember[]
}

export const CrewSection = ({ crew }: Props) => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className="flex w-full h-full mt-12 transition flex-col">
      <Text divider variant="articleHeading2" color="textAccent">
        Crew
      </Text>
      <div
        className={`mt-4 flex ${
          crew.length > 0 ? 'justify-center' : 'justify-start'
        } w-full`}
      >
        {crew.length > 0 ? (
          <div className="md:grid max-w-full md:justify-items-center justify-center md:grid-flow-col md:grid-rows-2 xl:grid-rows-1">
            {crew.map((crewMember) => (
              <CrewMemberCard key={crewMember.id} {...crewMember} />
            ))}
          </div>
        ) : (
          <Text variant="subtitle1" color="text">
            There's no available crew data for this launch.
          </Text>
        )}
      </div>
    </div>
  )
}
