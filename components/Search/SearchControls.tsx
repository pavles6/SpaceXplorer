import { Transition } from '@headlessui/react'
import {
  FilterIcon,
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
import Text from '../Text/Text'

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
      <div className="flex space-x-2 flex-grow">
        {Object.keys(appliedFilters).map((filter) => {
          if (filters[filter] && filter !== 'page') {
            const title =
              typeof filters[filter] === 'string'
                ? filters[filter]
                : filters[filter].name
            let formattedTitle: string =
              title.toString().slice(0, 1)[0].toUpperCase() +
              title.toString().substr(1, title.toString().length)

            if (formattedTitle.includes('_')) {
              formattedTitle = formattedTitle.replace('_', ' ')
            }
            return (
              <Transition
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                key={(filter as any)?.title || filter}
                show={Boolean(filters[filter])}
              >
                <Button
                  variant="subtitle1"
                  click={() => removeFilter(filter as QueryTypes)}
                  classes={`flex items-center py-2 px-4 rounded-md ${theme.base.surface} ${theme.base.textAccent}`}
                >
                  {formattedTitle}
                  <XIcon className={`ml-4 w-5 h-5 ${theme.base.iconAccent}`} />
                </Button>
              </Transition>
            )
          }
        })}
      </div>
      <div className="flex space-x-2">
        <Button classes="block xl:hidden" icon={FilterIcon} click={() => {}} />
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
