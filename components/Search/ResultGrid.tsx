import { Transition } from '@headlessui/react'
import React from 'react'
import { LaunchQueryResultItem } from '../../lib/types/query'
import { LaunchCard } from '../common/LaunchCard'

interface Props {
  resultsView: 'grid' | 'list'
  launches: LaunchQueryResultItem[]
}

export const ResultGrid = ({ resultsView, launches }: Props) => {
  return (
    <Transition
      className="justify-center flex w-full flex-row flex-wrap"
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={resultsView === 'grid'}
    >
      {launches.map((el) => (
        <LaunchCard
          key={el.id}
          name={el.name}
          date_unix={el.date_unix}
          date_precision={el.date_precision}
          rocket={el.rocket}
          id={el.id}
          success={el.success}
          upcoming={el.upcoming}
          crew={el.crew}
        />
      ))}
    </Transition>
  )
}
