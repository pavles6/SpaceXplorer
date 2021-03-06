import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import { PaginationControls } from '../components/Search/PaginationControls'
import { SearchControls } from '../components/Search/SearchControls'
import { getRocketTypes, queryLaunches } from '../lib/api/api-calls'
import { QueryFilters, QueryParameters, QueryResult } from '../lib/types/query'
import { useIsMount } from '../lib/utils/useIsMount'
import { ResultList } from '../components/Search/ResultList'
import { FilterSection } from '../components/Search/FilterSection'
import Text from '../components/Text/Text'
import { ResultListItemSkeleton } from '../components/Search/ResultListItemSkeleton'

interface RocketPayloadFilterType {
  name: string
  id: string
}

interface Props {
  rocketTypes: RocketPayloadFilterType[]
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

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (window && filterDrawerOpened) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [filterDrawerOpened])

  const [filters, setFilters] = useState<QueryFilters>({
    q: appliedFilters.q || '',
    date_range: appliedFilters.date_range || '',
    date_sort: appliedFilters.date_sort,
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

  const applyFilters = useCallback(() => {
    setIsLoading(true)
    const query = {
      ...router.query,
      ...filters,
      rocket: filters?.rocket?.join(',') || '',
    }

    Object.keys(query).map((filter) =>
      query[filter] ? null : delete query[filter]
    )

    router
      .replace(
        {
          pathname: '/search',
          query,
        },
        undefined,
        { scroll: false }
      )
      .then(() => setIsLoading(false))
  }, [filters])

  useEffect(() => {
    if (!isFirstRender) applyFilters()
  }, [filters])

  useEffect(() => {
    if (result.page > result.totalPages) {
      setFilters({ ...filters, page: result.totalPages })
    }
    applyFilters()
  }, [])

  const isResults = result.docs.length !== 0

  const sortOptions = [
    {
      title: 'Descending',
      set: () =>
        setFilters({
          ...filters,
          date_sort: 'descending',
        }),
      active: filters.date_sort === 'descending',
    },
    {
      title: 'Ascending',
      set: () =>
        setFilters({
          ...filters,
          date_sort: 'ascending',
        }),
      active: filters.date_sort === 'ascending',
    },
  ]

  return (
    <>
      <Head>
        <title>{`${
          filters.q.length > 0 ? `${filters.q} - ` : ''
        }Search | SpaceXplorer`}</title>
        <meta name="description" content="Browse SpaceX rocket launches" />
      </Head>

      <Navbar />

      <div className="w-full h-full pt-16 flex flex-col bg-light dark:bg-dark">
        <div className="pb-24 px-4 pt-14 h-full justify-center items-start flex w-full bg-light dark:bg-dark">
          <div className="hidden lg:flex h-full w-full flex-col max-w-sm mr-8">
            <FilterSection
              filters={filters}
              rocketTypes={rocketTypes}
              setFilters={setFilters}
            />
          </div>
          <div className="flex flex-col h-full w-full max-w-screen-lg justify-center">
            <SearchControls
              opened={filterDrawerOpened}
              setOpened={setFilterDrawerOpened}
              filters={filters}
              rocketTypes={rocketTypes}
              setFilters={setFilters}
              sortOptions={sortOptions}
            />
            {isLoading ? (
              <div className="max-w-screen-xl px-2 w-full flex items-center">
                <ul className="flex flex-col lg:flex-wrap lg:flex-row items-center justify-center w-full lg:gap-4 space-y-6 lg:space-y-0 mt-12">
                  {[...Array(10)].map((_, i) => (
                    <ResultListItemSkeleton key={i} />
                  ))}
                </ul>
              </div>
            ) : isResults ? (
              <ResultList launches={result.docs} />
            ) : (
              <div className="w-full pt-12 h-full flex items-center justify-center">
                <div className="flex flex-col items-center min-h-full justify-center">
                  <Text variant="h2" color="theme">
                    No results found.
                  </Text>
                  <Text variant="subtitle2" color="themeSecondary">
                    Try other search criteria to get better results.
                  </Text>
                </div>
              </div>
            )}
            <PaginationControls
              currentPage={filters.page}
              limit={result.limit}
              resultCurrentPage={result.page}
              setCurrentPage={(page) => {
                setFilters({ ...filters, page })
                window.scroll({ top: 0, behavior: 'smooth' })
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
    date_sort: (ctx.query.date_sort || null) as any,
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
