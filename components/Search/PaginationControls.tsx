import React from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'

interface Props {
  currentPage: number | string
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
  return (
    <div
      className={`${
        currentPage <= totalPages && totalPages > 1 ? 'block' : 'hidden'
      } h-16 w-full max-w-screen-lg flex justify-between items-center px-4 my-4`}
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
      <Text classes="md:hidden w-full" variant="subtitle1">
        {`Page ${resultCurrentPage} of ${totalPages}`}
      </Text>
      <div className="flex items-center w-full justify-end md:w-auto space-x-4">
        <Button
          disabled={Number(currentPage) - 1 === 0 ? true : false}
          click={() => setCurrentPage(Number(currentPage) - 1)}
          classes="disabled:text-textDarkSecondary/75 dark:disabled:text-textDarkSecondary font-semibold bg-lightSecondary dark:bg-darkSecondary text-dark dark:text-light px-4 py-3 rounded-md disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button
          click={() => setCurrentPage(Number(currentPage) + 1)}
          classes="disabled:text-textDarkSecondary/75 dark:disabled:text-textDarkSecondary font-semibold bg-lightSecondary dark:bg-darkSecondary text-dark dark:text-light px-4 py-3 rounded-md disabled:cursor-not-allowed"
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
