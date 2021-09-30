import { FilterIcon, ViewGridIcon, XIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useEffect, useState } from 'react'
import Button from '../components/Button/Button'
import { LaunchCard } from '../components/common/LaunchCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import { SearchHeader } from '../components/Search/Header'
import { PaginationControls } from '../components/Search/PaginationControls'
import { SearchInput } from '../components/Search/SearchInput'
import {
  getPayloadTypes,
  getRocketTypes,
  queryLaunches,
} from '../lib/api/api-calls'
import { usePalette } from '../lib/palette/store'
import { QueryObject, QueryResult, QueryTypes } from '../lib/types/query'
import { useIsMount } from '../lib/utils/useIsMount'

interface Props {
  rocketTypes: string[]
  payloadTypes: string[]
  result: QueryResult
  appliedFilters: QueryObject
}

type QueryFilters = {
  [K in QueryTypes]: string | any
}

export default function SearchPage({
  payloadTypes,
  result,
  rocketTypes,
  appliedFilters,
}: Props) {
  const theme = usePalette()

  console.log(appliedFilters)

  const router = useRouter()

  const isFirstRender = useIsMount()

  const [resultsView, setResultsView] = useState<'grid' | 'table'>('grid')

  const [filters, setFilters] = useState<QueryFilters>({
    q: appliedFilters.q || '',
    date_range: appliedFilters.date_range || '',
    launch_type: appliedFilters.launch_type || '',
    outcome: appliedFilters.outcome || '',
    rocket: appliedFilters.rocket || '',
    payload_type: appliedFilters.payload_type || '',
    page: appliedFilters.page || 1,
    has_images: appliedFilters.has_images || '',
  })

  console.log(result)

  const applyFilters = () => {
    const query = {
      ...router.query,
      ...filters,
    }

    Object.keys(query).map((filter) =>
      query[filter] ? null : delete query[filter]
    )

    router.replace(
      {
        pathname: '/search',
        query,
      },
      undefined,
      { scroll: false }
    )
  }

  const removeFilter = (filterType: QueryTypes) => {
    if (router.query[filterType]) {
      setFilters({ ...filters, [filterType]: '' })
    }
    applyFilters()
  }

  useEffect(() => {
    if (!isFirstRender) applyFilters()
  }, [filters])

  useEffect(() => {
    if (filters.page > result.totalPages) {
      setFilters({ ...filters, page: result.totalPages })
      applyFilters()
    }
  }, [])

  return (
    <>
      <Head>
        <title>{`${
          filters.q.length > 0 ? `${filters.q} - ` : ''
        }Search | SpaceXplorer`}</title>
      </Head>
      <Navbar />
      <header
        className={`flex w-full flex-col items-center relative ${theme.base.surfaceBackground}`}
      >
        <SearchHeader />
        <SearchInput
          changed={(value) => {
            setFilters({ ...filters, q: value })
          }}
          value={filters.q}
        />
      </header>
      <div
        className={`w-full flex justify-center ${theme.base.surfaceBackground}`}
      >
        <div
          className={`mb-24 pt-4 min-h-full w-full max-w-4xl ${theme.base.surfaceBackground}`}
        >
          <div
            className={`h-16 w-full flex justify-between items-center border-b ${theme.base.border} px-4 my-4`}
          >
            <div className="flex space-x-2">
              {Object.keys(appliedFilters).map((filter) => {
                if (filters[filter] && filter !== 'page') {
                  let formattedTitle: string =
                    filters[filter].toString().slice(0, 1)[0].toUpperCase() +
                    filters[filter]
                      .toString()
                      .substr(1, filters[filter].toString().length)

                  if (formattedTitle.includes('_')) {
                    formattedTitle = formattedTitle.replace('_', ' ')
                  }
                  return (
                    <Button
                      variant="subtitle1"
                      click={() => removeFilter(filter as QueryTypes)}
                      key={filter}
                      classes={`flex items-center justify-center py-2 px-4 rounded-md ${theme.base.surface}`}
                    >
                      {formattedTitle}
                      <XIcon className="ml-4 w-5 h-5" />
                    </Button>
                  )
                }
              })}
            </div>
            <div className="flex space-x-2">
              <Button
                classes="block 2xl:hidden"
                icon={FilterIcon}
                click={() => {}}
              />
              <Button
                icon={ViewGridIcon}
                click={() => {
                  setResultsView(resultsView === 'grid' ? 'table' : 'grid')
                }}
              />
            </div>
          </div>
          <div className="justify-center flex w-full flex-row flex-wrap ">
            {result.docs.length !== 0
              ? result.docs.map((el) => (
                  <LaunchCard
                    key={el.id}
                    name={el.name}
                    date_unix={el.date_unix}
                    date_precision={el.date_precision}
                    rocket={el.rocket}
                    id={el.id}
                    success={el.success}
                    upcoming={el.upcoming}
                    crew={el.crew}
                  />
                ))
              : 'No results'}
          </div>
          <PaginationControls
            currentPage={filters.page}
            limit={result.limit}
            resultCurrentPage={result.page}
            setCurrentPage={(page) => {
              setFilters({ ...filters, page })
            }}
            totalDocs={result.totalDocs}
            totalPages={result.totalPages}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query)

  const query: QueryObject = {
    date_range: (ctx.query.date_range || null) as any,
    has_images: (ctx.query.has_images || null) as any,
    launch_type: (ctx.query.launch_type || null) as any,
    outcome: (ctx.query.outcome || null) as any,
    page: (ctx.query.page || '1') as any,
    payload_type: (ctx.query.payload_type || null) as any,
    q: (ctx.query.q || null) as any,
    rocket: (ctx.query.rocket || null) as any,
  }

  return {
    props: {
      payloadTypes: await getPayloadTypes(),
      rocketTypes: await getRocketTypes(),
      result: await queryLaunches(query),
      appliedFilters: query,
    } as Props,
  }
}
