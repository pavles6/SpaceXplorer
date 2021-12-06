import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

interface Props {
  value: string
  changed: Function
}

export const SearchInput = ({ value, changed }: Props) => {
  return (
    <div className="flex z-20 transform -translate-y-1/2 items-center justify-center relative w-11/12 md:w-2/3 max-w-2xl h-14 md:h-16 rounded-xl bg-white shadow-xl">
      <SearchIcon className="pl-4 w-10 h-10 text-icon" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="h-full w-full"
      >
        <input
          onChange={(e) => changed(e.target.value)}
          placeholder="Type something... (e.g. Crew-2, Starlink)"
          type="search"
          value={value}
          className="px-4 bg-transparent h-full w-full focus:outline-none text-textSecondary text-sm lg:text-lg"
        />
      </form>
    </div>
  )
}
