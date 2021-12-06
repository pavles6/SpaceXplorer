import { Switch } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'
import { usePalette } from '../../lib/palette/store'

interface Props {
  checked: boolean
  changed: Function
}

export const CheckBox = ({ checked, changed }: Props) => {
  const theme = usePalette()

  return (
    <Switch
      className={`w-7 h-7 flex items-center justify-center focus:outline-none rounded-lg ${
        checked ? theme.base.surfacePrimary : theme.base.surface
      }`}
      checked={checked}
      onChange={() => {
        changed()
      }}
    >
      {checked ? (
        <CheckIcon className={`w-6 h-6 ${theme.base['dark:iconAccent']}`} />
      ) : null}
    </Switch>
  )
}
