import { Switch, Transition } from '@headlessui/react'
import React from 'react'

interface Props {
  checked: boolean
  changed: Function
}

export const RadioButton = ({ changed, checked }: Props) => {
  return (
    <Switch
      className={`w-6 h-6 flex items-center justify-center border-2 focus:outline-none rounded-full transition ${
        checked
          ? 'border-main'
          : 'border-darkSecondary/20 dark:border-lightSecondary/20'
      }`}
      checked={checked}
      onChange={() => {
        changed()
      }}
    >
      <Transition
        show={checked}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={React.Fragment}
      >
        <span className="p-1 bg-main rounded-full" />
      </Transition>
    </Switch>
  )
}
