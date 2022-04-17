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
      <Text border variant="articleHeading2" color="theme">
        Crew
      </Text>
      <div
        className={`mt-4 flex ${
          crew.length > 0 ? 'justify-center' : 'justify-start'
        } w-full`}
      >
        <div className="flex flex-wrap justify-center xl:justify-between w-full">
          {crew.map((crewMember) => (
            <CrewMemberCard key={crewMember.id} {...crewMember} />
          ))}
        </div>
      </div>
    </div>
  )
}
