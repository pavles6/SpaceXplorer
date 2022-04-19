import { Switch } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'

interface Props {
  checked: boolean
  changed: Function
}

export const CheckBox = ({ checked, changed }: Props) => {
  return (
    <Switch
      className={`w-7 h-7 flex items-center justify-center focus:outline-none rounded-md transition ${
        checked
          ? 'bg-main'
          : 'bg-lightSecondary border border-black border-opacity-10 dark:bg-darkSecondary dark:border-white dark:border-opacity-10'
      }`}
      checked={checked}
      onChange={() => {
        changed()
      }}
    >
      {checked ? <CheckIcon className="w-6 h-6 text-white" /> : null}
    </Switch>
  )
}
