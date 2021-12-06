import { FilterIcon } from '@heroicons/react/solid'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
import Button from '../Button/Button'
import { SortMenu } from './SortMenu'

interface Props {
  sortOptions: Array<object>
}

export const SearchControls = ({ sortOptions }: Props) => {
  const theme = usePalette()

  return (
    <div
      className={`h-16 w-full flex justify-between items-center border-b ${theme.base.border} px-4 my-4`}
    >
      <SortMenu sortOptions={sortOptions} />
      <div className="flex space-x-2">
        <Button classes="block lg:hidden" icon={FilterIcon} click={() => {}} />
      </div>
    </div>
  )
}
