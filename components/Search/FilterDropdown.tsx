import { Disclosure, Switch, Transition } from '@headlessui/react'
import {
  MinusIcon,
  MinusSmIcon,
  PlusIcon,
  PlusSmIcon,
} from '@heroicons/react/solid'
import React, { Fragment, ReactElement } from 'react'
import { usePalette } from '../../lib/palette/store'
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
  const theme = usePalette()

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="focus:outline-none">
            <div
              className={`${theme.base.border} transform py-5 border-b flex items-center justify-between`}
            >
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
                  <span
                    className={`inline-flex ml-1.5 w-2 h-2 rounded-full ${theme.base.surfacePrimary}`}
                  />
                </Transition>
              </Text>
              {open ? (
                <MinusIcon className={`w-4 h-4 ${theme.base.iconSecondary}`} />
              ) : (
                <PlusIcon className={`w-4 h-4 ${theme.base.iconSecondary}`} />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
