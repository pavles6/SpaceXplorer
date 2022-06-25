import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'

interface Option {
  title: string
  set: Function
  active: boolean
}

interface Props {
  sortOptions: Array<object>
}

export const SortMenu = ({ sortOptions }: Props) => {
  return (
    <Menu
      as="div"
      aria-label="open sort menu"
      className="relative inline-block text-left"
    >
      <div>
        <Menu.Button
          className={`group inline-flex focus:outline-none justify-center items-center text-dark dark:text-light`}
        >
          Sort
          <ChevronDownIcon
            className={`flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-icon dark:text-iconDark`}
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bg-light dark:bg-dark origin-top-left absolute left-0 mt-2 w-40 rounded-md ring-1 dark:ring-white ring-black ring-opacity-10 dark:ring-opacity-10 dark:ring-transparent   focus:outline-none z-20">
          <div className="py-1">
            {sortOptions.map((option: Option) => (
              <Menu.Item key={option.title}>
                {() => (
                  <button
                    disabled={option.active}
                    className={`focus:outline-none flex w-full px-6 py-3 text-md ${
                      option.active
                        ? `text-dark dark:text-light font-bold cursor-default `
                        : 'text-darkSecondary dark:text-lightSecondary hover:bg-lightSecondary dark:hover:bg-darkSecondary'
                    }`}
                    onClick={() => option.set()}
                  >
                    {option.title}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
