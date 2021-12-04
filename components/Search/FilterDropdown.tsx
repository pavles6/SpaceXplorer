import { Disclosure, Switch, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { ReactElement } from 'react'
import { usePalette } from '../../lib/palette/store'
import Text from '../Text/Text'
import { FilterDropdownField } from './FilterDropdownField'

interface Props {
  title: string
  children?: ReactElement[] | ReactElement
}

export const FilterDropdown = ({ title, children }: Props) => {
  const theme = usePalette()

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button>
            <div
              className={`${theme.base.border} ${theme.hover.surface} transform py-6 mx-4 border-b flex items-center justify-between w-full`}
            >
              <Text variant="title1" color="textAccent" classes="pl-2">
                {title}
              </Text>
              {open ? (
                <MinusIcon className="w-6 h-6" />
              ) : (
                <PlusIcon className="w-6 h-6" />
              )}
            </div>
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-150 ease-in"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel className="px-6">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
