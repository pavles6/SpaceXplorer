import React from 'react'
import { LaunchQueryResultItem } from '../../lib/types/query'
import Text from '../Text/Text'
import { ResultListItem } from './ResultListItem'

interface Props {
  launches: LaunchQueryResultItem[]
}

export const ResultList = ({ launches }: Props) => {
  return (
    <div className="min-w-full px-2">
      <div className="w-full flex justify-between items-center">
        <Text
          variant="subtitle1"
          align="text-center"
          classes="text-textSecondary dark:text-textSecondaryDark w-1/4"
        >
          Name
        </Text>
        <Text
          variant="subtitle1"
          align="text-center"
          classes="text-textSecondary dark:text-textSecondaryDark w-1/4"
        >
          Date
        </Text>
        <Text
          variant="subtitle1"
          align="text-center"
          classes="text-textSecondary dark:text-textSecondaryDark w-1/4"
        >
          Outcome
        </Text>
        <Text
          variant="subtitle1"
          align="text-center"
          classes="text-textSecondary dark:text-textSecondaryDark w-1/4"
        >
          Rocket
        </Text>
      </div>
      <ul>
        {launches.map((launch) => (
          <ResultListItem key={launch.id} launch={launch} />
        ))}
      </ul>
    </div>
  )
}
