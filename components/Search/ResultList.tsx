import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { LaunchQueryResultItem } from '../../lib/types/query'
import Text from '../Text/Text'
import { ResultListItem } from './ResultListItem'

interface Props {
  launches: LaunchQueryResultItem[]
}

export const ResultList = ({ launches }: Props) => {
  const isLargeScreenSize = useMediaQuery({ minWidth: 1024 })

  return (
    <div className="max-w-screen-xl px-2 w-full flex items-center">
      <ul className="flex flex-col lg:flex-wrap lg:flex-row items-center justify-center w-full lg:gap-4 space-y-6 lg:space-y-0 mt-12">
        {launches.map((launch) => (
          <ResultListItem
            isLargeScreen={isLargeScreenSize}
            key={launch.id}
            launch={launch}
          />
        ))}
      </ul>
    </div>
  )
}
