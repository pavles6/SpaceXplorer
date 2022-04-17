import Link from 'next/link'
import React from 'react'
import { Launch } from '../../lib/types/api'
import { formatDate, getDateFormat } from '../../lib/utils/date-functions'
import Text from '../Text/Text'

interface Props extends Launch {}

export const LaunchCard = ({
  id,
  date_unix,
  date_precision,
  name,
  rocket,
  success,
  upcoming,
  crew,
}: Props) => {
  return (
    <Link href={`/launch/${id}`}>
      <a
        className={`transition transform hover:-translate-y-1 cursor-pointer w-60 h-40 p-4 border shadow-sm border-dark/10 dark:border-light/20 rounded-xl mx-4 my-4`}
      >
        <Text
          variant="h4"
          color="main"
          weight="font-semibold"
          classes="truncate"
        >
          {`${name}${crew.length > 0 ? ` (Crew launch)` : ''}`}
        </Text>
        <Text variant="subtitle1" color="themeSecondary" weight="font-semibold">
          {`${formatDate(
            new Date(date_unix * 1000),
            getDateFormat(date_precision)
          )} ${upcoming ? '- Upcoming' : ''}`}
        </Text>
        <Text variant="subtitle1" color="themeSecondary"></Text>
        <Text variant="subtitle1" color="themeSecondary">
          {`Outcome: ${upcoming ? 'N/A' : success ? 'Successful' : 'Failed'}`}
        </Text>
        <Text variant="subtitle1" color="theme">{`Rocket: ${
          rocket!.name
        }`}</Text>
      </a>
    </Link>
  )
}
