import React from 'react'
import { CrewMember } from '../../lib/types/api'
import Text from '../Text/Text'
import CrewMemberCard from './CrewMemberCard'

interface Props {
  crew: CrewMember[]
}

export const LaunchCrewSection = ({ crew }: Props) => {
  return (
    <div className="flex w-full h-full transition flex-col">
      <Text divider variant="articleHeading2" color="textAccent">
        Crew
      </Text>
      <div
        className={`mt-4 flex ${
          crew.length > 0 ? 'justify-center' : 'justify-start'
        } w-full`}
      >
        <div className="md:grid max-w-full md:justify-items-center justify-center md:grid-flow-col md:grid-rows-2 xl:grid-rows-1">
          {crew.map((crewMember) => (
            <CrewMemberCard key={crewMember.id} {...crewMember} />
          ))}
        </div>
      </div>
    </div>
  )
}
