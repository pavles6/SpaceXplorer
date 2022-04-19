import { Transition } from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/solid'
import React from 'react'
import Button from '../Button/Button'
import { FilterSection } from './FilterSection'
import { SearchInput } from './SearchInput'
import { SortMenu } from './SortMenu'

interface Props {
  sortOptions: Array<object>
  filters: any
  rocketTypes: Array<any>
  setFilters: Function
  opened: boolean
  setOpened: Function
}

export const SearchControls = ({
  sortOptions,
  filters,
  rocketTypes,
  setFilters,
  opened,
  setOpened,
}: Props) => {
  const isAnyFilterApplied =
    filters.launch_type !== '' ||
    filters.rocket.length > 0 ||
    filters.outcome !== '' ||
    filters.has_images !== ''

  return (
    <>
      <div className="w-full max-w-screen-lg flex border-b border-dark/10 dark:border-light/20 pb-4">
        <div className="flex items-center justify-between space-x-4 w-full px-2">
          <SortMenu sortOptions={sortOptions} />
          <div className="lg:hidden w-80">
            <SearchInput
              changed={(value) => {
                setFilters({ ...filters, page: 1, q: value })
              }}
              value={filters.q}
            />
          </div>
          <div className="flex items-center relative">
            <Button
              classes="block lg:hidden"
              iconClasses="text-darkSecondary dark:text-lightSecondary w-8 h-8"
              icon={FilterIcon}
              click={() => setOpened(!opened)}
              notificationBadge={isAnyFilterApplied}
            />
          </div>
        </div>
      </div>
      <Transition
        show={opened}
        enter="transition ease duration-150 transform"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease duration-150 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"
        onClick={(e) => {
          const element = document.getElementById('filter_drawer_backdrop')
          if (e.target !== element) return
          setOpened(false)
        }}
        id="filter_drawer_backdrop"
        className="flex items-end w-full h-full left-0 top-0 fixed z-40 bg-black bg-opacity-60"
      >
        <Transition.Child
          enter="transition ease duration-150 transform"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-150 transform"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
          as="div"
          className="overflow-auto pb-6 px-4 w-full h-2/3 bg-light dark:bg-dark rounded-t-xl"
        >
          <div className="flex overflow-auto flex-col">
            <FilterSection
              filters={filters}
              rocketTypes={rocketTypes}
              setFilters={setFilters}
            />
          </div>
        </Transition.Child>
      </Transition>
    </>
  )
}
