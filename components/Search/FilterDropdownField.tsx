import React from 'react'
import { usePalette } from '../../lib/palette/store'
import { CheckBox } from '../common/CheckBox'
import { RadioButton } from '../common/RadioButton'
import Text from '../Text/Text'

interface Props {
  checked?: boolean
  changeFilter: Function
  title: string
  type: 'radio' | 'checkbox'
}

export const FilterDropdownField = ({
  checked,
  changeFilter,
  title,
  type,
}: Props) => {
  return (
    <div className="flex py-3 items-center space-x-4">
      {type === 'checkbox' ? (
        <CheckBox changed={changeFilter} checked={checked} />
      ) : (
        <RadioButton changed={changeFilter} checked={checked} />
      )}
      <Text>{title}</Text>
    </div>
  )
}
