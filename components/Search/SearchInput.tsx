import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { usePalette } from '../../lib/palette/store'

interface Props {
  value: string
  changed: Function
}

export const SearchInput = ({ value, changed }: Props) => {
  const theme = usePalette()

  return (
    <div className="flex z-20 transform -translate-y-1/2 items-center justify-center relative w-11/12 md:w-2/3 max-w-2xl h-14 md:h-16 rounded-xl bg-white shadow-xl">
      <SearchIcon
        className={`pl-4 w-10 h-10 ${theme.base['light:iconSecondary']}`}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="h-full w-full"
      >
        <input
          onChange={(e) => changed(e.target.value)}
          placeholder="Type something... (e.g. Crew-2)"
          type="search"
          value={value}
          className={`px-4 bg-transparent h-full w-full focus:outline-none ${theme.base['light:textSecondary']} text-lg`}
        />
      </form>
    </div>
  )
}
