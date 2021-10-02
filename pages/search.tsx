import { Transition } from '@headlessui/react'
import { FilterIcon, ViewGridIcon, XIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { traceDeprecation } from 'process'
import React, { FormEventHandler, useEffect, useState } from 'react'
import Button from '../components/Button/Button'
import { LaunchCard } from '../components/common/LaunchCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import { SearchHeader } from '../components/Search/Header'
import { PaginationControls } from '../components/Search/PaginationControls'
import { ResultGrid } from '../components/Search/ResultGrid'
import { SearchControls } from '../components/Search/SearchControls'
import { SearchInput } from '../components/Search/SearchInput'
import Text from '../components/Text/Text'
import {
  getPayloadTypes,
  getRocketTypes,
  queryLaunches,
} from '../lib/api/api-calls'
import { usePalette } from '../lib/palette/store'
import {
  QueryFilters,
  QueryParameters,
  QueryResult,
  QueryTypes,
} from '../lib/types/query'
import { formatDate, getDateFormat } from '../lib/utils/date-functions'
import { useIsMount } from '../lib/utils/useIsMount'
import { ResultList } from '../components/Search/ResultList'

interface Props {
  rocketTypes: string[]
  payloadTypes: string[]
  result: QueryResult
  appliedFilters: QueryParameters
}

export default function SearchPage({
  payloadTypes,
  result,
  rocketTypes,
  appliedFilters,
}: Props) {
  const theme = usePalette()

  const router = useRouter()

  const isFirstRender = useIsMount()

  const [resultsView, setResultsView] = useState<'grid' | 'list'>('list')

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

  const isResults = result.docs.length !== 0

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
          <SearchControls
            appliedFilters={appliedFilters}
            filters={filters}
            removeFilter={removeFilter}
            resultsView={resultsView}
            setResultsView={setResultsView}
          />
          <div className="flex">
            {isResults ? (
              <>
                <ResultGrid resultsView={resultsView} launches={result.docs} />
                <ResultList resultsView={resultsView} launches={result.docs} />
              </>
            ) : (
              'No results'
            )}
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

  const query: QueryParameters = {
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
