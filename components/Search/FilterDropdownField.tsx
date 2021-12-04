import { Switch } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
import Text from '../Text/Text'

interface Props {
  checked?: boolean
  changed: Function
  title: string
}

export const FilterDropdownField = ({ checked, changed, title }: Props) => {
  const theme = usePalette()

  return (
    <div className="flex py-3 items-center space-x-4">
      <Switch
        className={`${checked ? 'p-1.5' : 'p-4'} rounded-md ${
          checked ? theme.base.surfacePrimary : theme.base.surface
        }`}
        checked={checked}
        onChange={() => changed()}
      >
        {checked ? (
          <CheckIcon className={`w-5 h-5 ${theme.base.iconAccent}`} />
        ) : null}
      </Switch>
      <Text>{title}</Text>
    </div>
  )
}
