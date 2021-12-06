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
      className={`w-7 h-7 flex items-center justify-center focus:outline-none rounded-lg ${
        checked ? 'bg-primary' : 'bg-surfacePrimary dark:bg-surfacePrimary'
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
