import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
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
  const { theme: themeType } = useTheme()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`group inline-flex focus:outline-none justify-center items-center text-textAccent dark:text-textAccentDark`}
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
        <Menu.Items className="bg-surfacePrimary dark:bg-surfacePrimaryDark origin-top-left absolute left-0 mt-2 w-40 rounded-md ring-1 ring-white ring-opacity-20 shadow-md focus:outline-none z-20">
          <div className="py-1">
            {sortOptions.map((option: Option) => (
              <Menu.Item key={option.title}>
                {() => (
                  <button
                    disabled={option.active}
                    className={`focus:outline-none flex w-full px-6 py-3 text-md ${
                      option.active
                        ? `text-textAccent dark:text-textAccentDark font-semibold cursor-default`
                        : 'text-textMain dark:text-textMainDark'
                    } hover:bg-opacity-10 ${
                      themeType === 'dark'
                        ? 'hover:bg-surfacePrimary'
                        : 'hover:bg-surfacePrimaryDark'
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
