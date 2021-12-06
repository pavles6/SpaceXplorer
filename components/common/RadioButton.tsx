import { Switch } from '@headlessui/react'
import React from 'react'
import { usePalette } from '../../lib/palette/store'

interface Props {
  checked: boolean
  changed: Function
}

export const RadioButton = ({ changed, checked }: Props) => {
  const theme = usePalette()

  return (
    <Switch
      className={`w-6 h-6 flex items-center justify-center focus:outline-none rounded-full ${
        checked
          ? `${theme.base.surfacePrimary}`
          : `border-2 ${theme.base.borderPrimary}`
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
