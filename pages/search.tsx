import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import { SearchHeader } from '../components/Search/Header'
import { PaginationControls } from '../components/Search/PaginationControls'
import { SearchControls } from '../components/Search/SearchControls'
import { SearchInput } from '../components/Search/SearchInput'
import { getRocketTypes, queryLaunches } from '../lib/api/api-calls'
import { QueryFilters, QueryParameters, QueryResult } from '../lib/types/query'
import { useIsMount } from '../lib/utils/useIsMount'
import { ResultList } from '../components/Search/ResultList'
import { FilterSection } from '../components/Search/FilterSection'

interface RockeyPayloadFilterType {
  name: string
  id: string
}

interface Props {
  rocketTypes: RockeyPayloadFilterType[]
  result: QueryResult
  appliedFilters: QueryParameters
}

export default function SearchPage({
  result,
  rocketTypes,
  appliedFilters,
}: Props) {
  const router = useRouter()

  const isFirstRender = useIsMount()

  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false)

  useEffect(() => {
    if (window && filterDrawerOpened) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [filterDrawerOpened])

  const [filters, setFilters] = useState<QueryFilters>({
    q: appliedFilters.q || '',
    date_range: appliedFilters.date_range,
    launch_type: appliedFilters.launch_type || '',
    outcome: appliedFilters.outcome || '',
    rocket: appliedFilters.rocket
      ? appliedFilters.rocket.includes(',')
        ? appliedFilters.rocket
            .split(',')
            .map((rocket) => rocketTypes.find((type) => type.id === rocket).id)
        : [rocketTypes.find((type) => type.id === appliedFilters.rocket).id]
      : [],
    page: appliedFilters.page || result.page,
    has_images: appliedFilters.has_images || '',
  })

  const applyFilters = () => {
    const query = {
      ...router.query,
      ...filters,
      rocket: filters?.rocket?.join(',') || '',
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

  useEffect(() => {
    if (!isFirstRender) applyFilters()
  }, [filters])

  useEffect(() => {
    if (result.page > result.totalPages) {
      setFilters({ ...filters, page: result.totalPages })
    }
    if (!filters.date_range) {
      setFilters({ ...filters, date_range: 'newest' })
    }
    applyFilters()
  }, [])

  const isResults = result.docs.length !== 0

  const sortOptions = [
    {
      title: 'Newest',
      set: () =>
        setFilters({
          ...filters,
          date_range: 'newest',
        }),
      active: filters.date_range === 'newest',
    },
    {
      title: 'Oldest',
      set: () =>
        setFilters({
          ...filters,
          date_range: 'oldest',
        }),
      active: filters.date_range === 'oldest',
    },
  ]

  return (
    <>
      <Head>
        <title>{`${
          filters.q.length > 0 ? `${filters.q} - ` : ''
        }Search | SpaceXplorer`}</title>
      </Head>

      <Navbar />

      <header className="flex w-full flex-col items-center relative bg-surfaceSecondary dark:bg-surfaceSecondaryDark">
        <SearchHeader />
        <SearchInput
          changed={(value) => {
            setFilters({ ...filters, page: 1, q: value })
          }}
          value={filters.q}
        />
      </header>

      <div className="w-full h-full flex flex-col bg-surfaceSecondary dark:bg-surfaceSecondaryDark">
        <div className="mb-24 px-2 pt-4 min-h-full justify-center flex w-full bg-surfaceSecondary dark:bg-surfaceSecondaryDark">
          <div className="hidden lg:flex h-full w-full flex-col max-w-sm mr-8">
            <FilterSection
              filters={filters}
              rocketTypes={rocketTypes}
              setFilters={setFilters}
            />
          </div>
          <div className="flex flex-col w-full max-w-4xl">
            <SearchControls
              opened={filterDrawerOpened}
              setOpened={setFilterDrawerOpened}
              filters={filters}
              rocketTypes={rocketTypes}
              setFilters={setFilters}
              sortOptions={sortOptions}
            />
            {isResults ? <ResultList launches={result.docs} /> : 'No results'}
            <PaginationControls
              currentPage={filters.page}
              limit={result.limit}
              resultCurrentPage={result.page}
              setCurrentPage={(page) => {
                setFilters({ ...filters, page })
                window.scroll({ top: 120, left: 0, behavior: 'smooth' })
              }}
              totalDocs={result.totalDocs}
              totalPages={result.totalPages}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query: QueryParameters = {
    date_range: (ctx.query.date_range || null) as any,
    has_images: (ctx.query.has_images || null) as any,
    launch_type: (ctx.query.launch_type || null) as any,
    outcome: (ctx.query.outcome || null) as any,
    page: (parseInt(ctx.query.page as string) || 1) as any,
    q: (ctx.query.q || null) as any,
    rocket: (ctx.query.rocket || null) as any,
  }

  return {
    props: {
      rocketTypes: await getRocketTypes(),
      result: await queryLaunches(query),
      appliedFilters: query,
    } as Props,
  }
}
