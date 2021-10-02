import { Transition } from '@headlessui/react'
import {
  CollectionIcon,
  FilterIcon,
  MenuAlt3Icon,
  ViewGridIcon,
  ViewListIcon,
  XIcon,
} from '@heroicons/react/solid'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
import {
  QueryFilters,
  QueryParameters,
  QueryTypes,
} from '../../lib/types/query'
import Button from '../Button/Button'

interface Props {
  appliedFilters: QueryParameters
  filters: QueryFilters
  removeFilter: Function
  resultsView: string
  setResultsView: Function
}

export const SearchControls = ({
  appliedFilters,
  filters,
  removeFilter,
  resultsView,
  setResultsView,
}: Props) => {
  const theme = usePalette()

  return (
    <div
      className={`h-16 w-full flex justify-between items-center border-b ${theme.base.border} px-4 my-4`}
    >
      <div className="flex space-x-2">
        {Object.keys(appliedFilters).map((filter) => {
          if (filters[filter] && filter !== 'page') {
            let formattedTitle: string =
              filters[filter].toString().slice(0, 1)[0].toUpperCase() +
              filters[filter]
                .toString()
                .substr(1, filters[filter].toString().length)

            if (formattedTitle.includes('_')) {
              formattedTitle = formattedTitle.replace('_', ' ')
            }
            return (
              <Transition
                className="justify-center flex w-full flex-row flex-wrap"
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                key={filter}
                show={filters[filter] !== null}
              >
                <Button
                  variant="subtitle1"
                  click={() => removeFilter(filter as QueryTypes)}
                  classes={`flex items-center justify-center py-2 px-4 rounded-md ${theme.base.surface}`}
                >
                  {formattedTitle}
                  <XIcon className="ml-4 w-5 h-5" />
                </Button>{' '}
              </Transition>
            )
          }
        })}
      </div>
      <div className="flex space-x-2">
        <Button classes="block 2xl:hidden" icon={FilterIcon} click={() => {}} />
        <Button
          icon={resultsView === 'grid' ? ViewGridIcon : ViewListIcon}
          click={() => {
            setResultsView(resultsView === 'grid' ? 'list' : 'grid')
          }}
        />
      </div>
    </div>
  )
}
