import React from 'react'
import { LaunchQueryResultItem } from '../../lib/types/query'
import { ResultListItem } from './ResultListItem'

interface Props {
  launches: LaunchQueryResultItem[]
}

export const ResultList = ({ launches }: Props) => {
  return (
    <div className="max-w-screen-xl px-2 w-full flex items-center">
      <ul className="flex flex-col lg:flex-wrap lg:flex-row items-center justify-center w-full lg:gap-4 space-y-6 lg:space-y-0 mt-12">
        {launches.map((launch) => (
          <ResultListItem key={launch.id} launch={launch} />
        ))}
      </ul>
    </div>
  )
}
