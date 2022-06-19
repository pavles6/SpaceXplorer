import React from 'react'
import { DocumentSearchIcon } from '@heroicons/react/outline'

export const ResultListItemSkeleton = () => {
  return (
    <li className="max-w-xs w-full">
      <div className="flex w-full flex-col items-center cursor-pointer rounded-md bg-light dark:bg-dark border dark:border-white/10 border-black/10 animate-pulse">
        <div className="w-full px-4 pt-4 mb-6 flex justify-between bg-lightSecondary dark:bg-darkSecondary pb-4 rounded-t-md">
          <div className="w-44 h-5 bg-darkSecondary/50 dark:bg-lightSecondary/50 rounded-md animate-pulse" />
          <DocumentSearchIcon className="w-6 h-6 text-main" />
        </div>
        <div className="flex w-full px-4 pb-4 flex-col items-start space-y-4">
          <div className="w-32 h-3.5 bg-darkSecondary/50 dark:bg-lightSecondary/50 rounded-md animate-pulse" />
          <div className="w-28 h-3.5 bg-darkSecondary/50 dark:bg-lightSecondary/50 rounded-md animate-pulse" />
          <div className="w-20 h-3.5 bg-darkSecondary/50 dark:bg-lightSecondary/50 rounded-md animate-pulse" />
        </div>
      </div>
    </li>
  )
}
