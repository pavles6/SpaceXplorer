import React from 'react'
import { LaunchQueryResultItem } from '../../lib/types/query'
import Text from '../Text/Text'
import Link from 'next/link'
import { formatDate, getDateFormat } from '../../lib/utils/date-functions'

interface Props {
  launch: LaunchQueryResultItem
}

export const ResultListItem = ({ launch }: Props) => {
  return (
    <li>
      <Link href={`/launch/${launch.id}`} key={launch.id}>
        <a className="transition transform shadow-sm flex w-full cursor-pointer justify-between items-center py-6 my-6 rounded-lg bg-surfacePrimary dark:bg-surfacePrimaryDark">
          <Text
            align="text-center"
            color="text-primary"
            classes={`w-1/4`}
            variant="subtitle2"
          >
            {launch.name.length > 15
              ? launch.name.substr(0, 15) + '...'
              : launch.name}
          </Text>
          <Text align="text-center" classes="w-1/4" variant="subtitle2">
            {formatDate(
              new Date(launch.date_unix * 1000),
              getDateFormat(launch.date_precision, {
                month: 'MMM',
              })
            )}
          </Text>
          <Text align="text-center" classes="w-1/4" variant="subtitle2">
            {launch.upcoming
              ? 'N/A (Upcoming)'
              : launch.success
              ? 'Sucessful'
              : 'Failed'}
          </Text>
          <Text align="text-center" classes="w-1/4" variant="subtitle2">
            {launch.rocket.name}
          </Text>
        </a>
      </Link>
    </li>
  )
}
