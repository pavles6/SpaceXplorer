import { Switch } from '@headlessui/react'
import React from 'react'

interface Props {
  checked: boolean
  changed: Function
}

export const RadioButton = ({ changed, checked }: Props) => {
  return (
    <Switch
      className={`w-6 h-6 flex items-center justify-center focus:outline-none rounded-full ${
        checked ? 'bg-primary' : 'border-2 border-primary'
      }`}
      checked={checked}
      onChange={() => {
        changed()
      }}
    >
      {checked ? <span className="p-1 bg-white rounded-full" /> : null}
    </Switch>
  )
}
