import Link from 'next/link'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
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
  const theme = usePalette()

  return (
    <Link href={`/launch/${id}`}>
      <a
        className={`transition transform hover:-translate-y-1 cursor-pointer w-60 h-40 p-4 border ${theme.base.border} rounded-xl mx-4 my-4`}
      >
        <Text
          variant="h4"
          color="textPrimary"
          weight="font-semibold"
          classes="truncate"
        >
          {name}
        </Text>
        {crew.length > 0 ? (
          <Text variant="subtitle1" color="textPrimary">{`Crew launch`}</Text>
        ) : null}
        <Text variant="subtitle1" color="text" weight="font-semibold">
          {`${formatDate(
            new Date(date_unix * 1000),
            getDateFormat(date_precision)
          )} ${upcoming ? '- Upcoming' : ''}`}
        </Text>
        <Text variant="subtitle1" color="text"></Text>
        <Text variant="subtitle1" color="text">
          {`Outcome: ${upcoming ? 'N/A' : success ? 'Successful' : 'Failed'}`}
        </Text>
        <Text variant="subtitle1" color="text">{`Rocket: ${
          rocket!.name
        }`}</Text>
      </a>
    </Link>
  )
}
