import { Disclosure, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { Fragment, ReactElement } from 'react'
import Text from '../Text/Text'

interface Props {
  title: string
  children?: ReactElement[] | ReactElement
  fieldsChecked: boolean
  defaultOpen?: boolean
}

export const FilterDropdown = ({
  title,
  children,
  fieldsChecked,
  defaultOpen = false,
}: Props) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="focus:outline-none">
            <div className="border-borderColor dark:border-borderColorDark transform py-5 border-b flex items-center justify-between">
              <Text variant="subtitle1" color="textAccent" classes="pl-2">
                {title}
                <Transition
                  show={fieldsChecked}
                  enter="transition ease duration-600 transform"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease duration-600 transform"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  as={Fragment}
                >
                  <span className="inline-flex ml-1.5 w-2 h-2 rounded-full bg-primary" />
                </Transition>
              </Text>
              {open ? (
                <MinusIcon className="w-4 h-4 text-icon dark:text-iconDark" />
              ) : (
                <PlusIcon className="w-4 h-4 text-icon dark:text-iconDark" />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
