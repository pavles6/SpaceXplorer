import React from 'react'
import { Launch } from '../../lib/types/api'
import { formatDate, getDateFormat } from '../../lib/utils/date-functions'
import Text from '../Text/Text'
import { Countdown } from './Countdown'
import { TimerNode } from './LaunchesPreview'

interface Props extends Launch {
  timer: TimerNode[]
}

export const NextLaunch = ({
  id,
  name,
  timer,
  date_unix,
  date_precision,
}: Props) => {
  return (
    <>
      <div className="mb-4 mt-4 flex items-center justify-center w-full">
        <Text
          link
          href={`/launch/${id}`}
          color="main"
          variant="h4"
          decoration="underline"
        >
          {name}
        </Text>
        <Text color="theme" variant="h4" classes="ml-2">
          is lifting off in:
        </Text>
      </div>
      <div className="flex gap-2 md:gap-4 justify-center items-center max-w-screen-sm w-full">
        {date_precision === 'hour' ? (
          <Countdown timer={timer} />
        ) : (
          <Text variant="title1">
            {formatDate(
              new Date(date_unix * 1000),
              getDateFormat(date_precision)
            )}
          </Text>
        )}
      </div>
    </>
  )
}
