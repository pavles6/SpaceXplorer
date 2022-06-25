import { SearchIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'

interface Props {
  changed: Function
}

export const SearchInput = ({ changed }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleQueryWithDelay = setTimeout(() => {
      changed(searchQuery)
    }, 500)

    return () => clearTimeout(handleQueryWithDelay)
  }, [searchQuery])

  return (
    <div className="flex items-center justify-center p-2 pr-0 w-full relative rounded-xl bg-lightSecondary dark:bg-darkSecondary shadow-sm dark:shadow-none ring-1 focus-within:ring-main ring-darkSecondary/25 dark:focus-within:ring-main dark:ring-lightSecondary/25">
      <SearchIcon className="pl-2 w-7 h-7 text-dark dark:text-light" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="h-full w-full"
      >
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type something..."
          type="search"
          value={searchQuery}
          className="px-2.5 bg-transparent h-full w-full focus:outline-none text-darkSecondary dark:text-lightSecondary text-sm"
        />
      </form>
    </div>
  )
}
