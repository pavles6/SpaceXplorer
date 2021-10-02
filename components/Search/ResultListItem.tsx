import React from 'react'
import { LaunchQueryResultItem } from '../../lib/types/query'
import Text from '../Text/Text'
import Link from 'next/link'
import { formatDate, getDateFormat } from '../../lib/utils/date-functions'
import { usePalette } from '../../lib/palette/store'

interface Props {
  launch: LaunchQueryResultItem
}

export const ResultListItem = ({ launch }: Props) => {
  const theme = usePalette()

  return (
    <Link href={`launch/${launch.id}`} key={launch.id}>
      <li
        className={`transition transform hover:-translate-y-1 shadow-md hover:shadow-lg flex w-full cursor-pointer justify-between items-center py-6 my-6 rounded-lg ${theme.base.surface}`}
      >
        <Text
          align="text-center"
          color="textPrimary"
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
            getDateFormat(launch.date_precision)
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
      </li>
    </Link>
  )
}
