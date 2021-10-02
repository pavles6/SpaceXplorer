import { Transition } from '@headlessui/react'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
import { LaunchQueryResultItem } from '../../lib/types/query'
import Text from '../Text/Text'
import { ResultListItem } from './ResultListItem'

interface Props {
  resultsView: 'grid' | 'list'
  launches: LaunchQueryResultItem[]
}

export const ResultList = ({ resultsView, launches }: Props) => {
  const theme = usePalette()

  return (
    <Transition
      className="justify-center flex w-full flex-row flex-wrap"
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={resultsView === 'list'}
    >
      <div className="min-w-full px-2">
        <div className={`w-full flex justify-between items-center`}>
          <Text
            variant="subtitle1"
            align="text-center"
            classes={`${theme.base.textSecondary} w-1/4`}
          >
            Name
          </Text>
          <Text
            variant="subtitle1"
            align="text-center"
            classes={`${theme.base.textSecondary} w-1/4`}
          >
            Date
          </Text>
          <Text
            variant="subtitle1"
            align="text-center"
            classes={`${theme.base.textSecondary} w-1/4`}
          >
            Outcome
          </Text>
          <Text
            variant="subtitle1"
            align="text-center"
            classes={`${theme.base.textSecondary} w-1/4`}
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
    </Transition>
  )
}
