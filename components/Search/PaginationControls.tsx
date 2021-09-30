import React from 'react'
import { usePalette } from '../../lib/palette/store'
import Button from '../Button/Button'
import Text from '../Text/Text'

interface Props {
  currentPage: number
  totalPages: number
  limit: number
  totalDocs: number
  resultCurrentPage: number
  setCurrentPage: Function
}

export const PaginationControls = ({
  currentPage,
  limit,
  setCurrentPage,
  totalDocs,
  totalPages,
  resultCurrentPage,
}: Props) => {
  const theme = usePalette()

  return (
    <div
      className={`${
        currentPage <= totalPages && totalPages > 1 ? 'block' : 'hidden'
      } h-16 w-full flex justify-between items-center px-4 my-4`}
    >
      <Text classes="hidden md:block" variant="subtitle1">{`Showing ${
        resultCurrentPage === 1 ? '1' : limit * (resultCurrentPage - 1) + 1
      } to ${
        limit > totalDocs
          ? totalDocs
          : `${
              limit * resultCurrentPage < totalDocs
                ? limit * resultCurrentPage
                : totalDocs
            } of ${totalDocs}`
      } results`}</Text>
      <div className="flex items-center justify-between w-full md:justify-auto md:w-auto space-x-4">
        <Button
          disabled={currentPage - 1 === 0 ? true : false}
          click={() => setCurrentPage(currentPage - 1)}
          classes={`${theme.disabled.textDisabled} font-semibold ${theme.base.surface} ${theme.base.textAccent} px-4 py-3 rounded-md disabled:cursor-not-allowed`}
        >
          Previous
        </Button>
        <Button
          click={() => setCurrentPage(currentPage + 1)}
          classes={`${theme.disabled.textDisabled} font-semibold ${theme.base.surface} ${theme.base.textAccent} px-4 py-3 rounded-md disabled:cursor-not-allowed`}
          disabled={
            currentPage === totalPages || totalDocs < limit ? true : false
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
