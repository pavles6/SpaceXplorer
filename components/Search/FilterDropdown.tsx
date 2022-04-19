import { Disclosure, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { Fragment, ReactElement } from 'react'
import Text from '../Text/Text'

interface Props {
  title: string
  children?: ReactElement[] | ReactElement
  fieldsChecked: boolean
}

export const FilterDropdown = ({ title, children, fieldsChecked }: Props) => {
  return (
    <Disclosure defaultOpen={fieldsChecked}>
      {({ open }) => (
        <>
          <Disclosure.Button className="focus:outline-none">
            <div className="border-dark/10 dark:border-light/20 transform py-5 border-b flex items-center justify-between">
              <Text variant="subtitle1" color="theme" classes="pl-2">
                {title as any}
              </Text>
              {open ? (
                <MinusIcon className="w-4 h-4 text-dark dark:text-light" />
              ) : (
                <PlusIcon className="w-4 h-4 text-dark dark:text-light" />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
