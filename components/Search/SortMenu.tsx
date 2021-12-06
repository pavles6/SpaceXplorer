import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import React, { Fragment } from 'react'
import { usePalette } from '../../lib/palette/store'

interface Option {
  title: string
  set: Function
  active: boolean
}

interface Props {
  sortOptions: Array<object>
}

export const SortMenu = ({ sortOptions }: Props) => {
  const theme = usePalette()
  const { theme: themeType } = useTheme()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`group inline-flex focus:outline-none justify-center items-center ${theme.base.textAccent}`}
        >
          Sort
          <ChevronDownIcon
            className={`flex-shrink-0 -mr-1 ml-1 h-5 w-5 ${theme.base.iconSecondary}`}
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
        <Menu.Items
          className={`${theme.base.surface} origin-top-left absolute left-0 mt-2 w-40 rounded-md ring-1 ring-white ring-opacity-20 shadow-md focus:outline-none z-20`}
        >
          <div className="py-1">
            {sortOptions.map((option: Option) => (
              <Menu.Item key={option.title}>
                {({ active }) => (
                  <button
                    disabled={option.active}
                    className={`focus:outline-none flex w-full px-6 py-3 text-md ${
                      option.active
                        ? `${theme.base.textAccent} font-semibold cursor-default`
                        : theme.base.text
                    } hover:bg-opacity-10 ${
                      themeType === 'dark'
                        ? theme.hover['light:surface']
                        : theme.hover['dark:surface']
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
