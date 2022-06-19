import React from 'react'
import { LaunchQueryResultItem } from '../../lib/types/query'
import Text from '../Text/Text'
import Link from 'next/link'
import { formatDate, getDateFormat } from '../../lib/utils/date-functions'
import { DocumentSearchIcon } from '@heroicons/react/outline'

interface Props {
  launch: LaunchQueryResultItem
}

export const ResultListItem = ({ launch }: Props) => {
  return (
    <li className="max-w-xs w-full">
      <Link href={`/launch/${launch.id}`} key={launch.id}>
        <a className="flex w-full flex-col items-center cursor-pointer rounded-md bg-light dark:bg-dark border dark:border-white/10 border-black/10">
          <div className="w-full px-4 pt-4 mb-6 flex justify-between bg-lightSecondary dark:bg-darkSecondary pb-4 rounded-t-md">
            <Text textAlign="text-left" color="theme" variant="h4">
              {launch.name.length > 30
                ? launch.name.substring(0, 15) + '...'
                : launch.name}
            </Text>
            <DocumentSearchIcon className="w-6 h-6 text-main" />
          </div>
          <div className="flex w-full px-4 pb-4 flex-col items-start space-y-4">
            <Text textAlign="text-left" variant="subtitle2">
              {'Date of launch: ' +
                formatDate(
                  new Date(launch.date_unix * 1000),
                  getDateFormat(launch.date_precision, {
                    month: 'MMM',
                  })
                )}
            </Text>
            <Text textAlign="text-left" variant="subtitle2">
              {'Status: ' +
                (launch.upcoming
                  ? 'N/A (Upcoming)'
                  : launch.success
                  ? 'Successful'
                  : 'Failed')}
            </Text>
            <Text textAlign="text-left" variant="subtitle2">
              {'Rocket: ' + launch.rocket.name}
            </Text>
          </div>
        </a>
      </Link>
    </li>
  )
}
