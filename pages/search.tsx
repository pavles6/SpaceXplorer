import { FilterIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'
import { SearchHeader } from '../components/Search/Header'
import { PaginationControls } from '../components/Search/PaginationControls'
import { ResultGrid } from '../components/Search/ResultGrid'
import { SearchControls } from '../components/Search/SearchControls'
import { SearchInput } from '../components/Search/SearchInput'
import Text from '../components/Text/Text'
import { getRocketTypes, queryLaunches } from '../lib/api/api-calls'
import { usePalette } from '../lib/palette/store'
import {
  QueryFilters,
  QueryParameters,
  QueryResult,
  QueryTypes,
} from '../lib/types/query'
import { useIsMount } from '../lib/utils/useIsMount'
import { ResultList } from '../components/Search/ResultList'
import { FilterDropdown } from '../components/Search/FilterDropdown'
import { FilterDropdownField } from '../components/Search/FilterDropdownField'

interface RockeyPayloadFilterType {
  name: string
  id: string
}

interface Props {
  rocketTypes: RockeyPayloadFilterType[]
  payloadTypes: RockeyPayloadFilterType[]
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

  console.log(result)

  const [filters, setFilters] = useState<QueryFilters>({
    q: appliedFilters.q || '',
    date_range: appliedFilters.date_range || '',
    launch_type: appliedFilters.launch_type || '',
    outcome: appliedFilters.outcome || '',
    rocket: appliedFilters.rocket
      ? rocketTypes.find((type) => type.id === appliedFilters.rocket)
      : '',
    payload_type: appliedFilters.payload_type
      ? payloadTypes.find((type) => type.id === appliedFilters.payload_type)
      : '',
    page: appliedFilters.page || 1,
    has_images: appliedFilters.has_images || '',
  })

  const applyFilters = () => {
    const query = {
      ...router.query,
      ...filters,
      rocket: filters.rocket?.id || '',
      payload_type: filters.payload_type?.id || '',
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
      <div className={`w-full flex ${theme.base.surfaceBackground}`}>
        <div
          className={`mb-24 pt-4 min-h-full justify-center flex w-full ${theme.base.surfaceBackground}`}
        >
          <div className={`h-full w-full flex flex-col max-w-md mr-8`}>
            <div
              className={`${theme.base.border} border-b flex h-16 items-center justify-start w-full mx-4 mt-4`}
            >
              <Text
                variant="h4"
                color="textAccent"
                classes="flex items-center h-full pl-2"
              >
                Filters{' '}
                <FilterIcon
                  className={`ml-2 w-8 h-8 ${theme.base.textAccent}`}
                />
              </Text>
            </div>
            <FilterDropdown title="Date">
              <FilterDropdownField
                title="Newest"
                checked={filters.date_range === 'newest'}
                changed={() =>
                  setFilters({
                    ...filters,
                    date_range: filters.date_range === 'newest' ? '' : 'newest',
                  })
                }
              />
              <FilterDropdownField
                title="Oldest"
                checked={filters.date_range === 'oldest'}
                changed={() =>
                  setFilters({
                    ...filters,
                    date_range: filters.date_range === 'oldest' ? '' : 'oldest',
                  })
                }
              />
            </FilterDropdown>
            <FilterDropdown title="Type">
              <FilterDropdownField
                title="Crew"
                checked={filters.launch_type === 'crew'}
                changed={() =>
                  setFilters({
                    ...filters,
                    launch_type: filters.launch_type === 'crew' ? '' : 'crew',
                  })
                }
              />
              <FilterDropdownField
                title="Non crew"
                checked={filters.launch_type === 'non-crew'}
                changed={() =>
                  setFilters({
                    ...filters,
                    launch_type:
                      filters.launch_type === 'non-crew' ? '' : 'non-crew',
                  })
                }
              />
            </FilterDropdown>
            <FilterDropdown title="Rocket">
              {rocketTypes.map((rocket) => (
                <FilterDropdownField
                  title={rocket.name}
                  checked={filters.rocket.id === rocket.id}
                  changed={() =>
                    setFilters({
                      ...filters,
                      rocket: filters.rocket === rocket ? '' : rocket,
                    })
                  }
                />
              ))}
            </FilterDropdown>
            <FilterDropdown title="Outcome"></FilterDropdown>
            <FilterDropdown title="Other"></FilterDropdown>
          </div>
          <div className="flex flex-col w-full ml-8 max-w-4xl">
            <SearchControls
              appliedFilters={appliedFilters}
              filters={filters}
              removeFilter={removeFilter}
              resultsView={resultsView}
              setResultsView={setResultsView}
            />
            {isResults ? (
              <>
                <ResultGrid resultsView={resultsView} launches={result.docs} />
                <ResultList resultsView={resultsView} launches={result.docs} />
              </>
            ) : (
              'No results'
            )}
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

  console.log(await getRocketTypes())

  return {
    props: {
      rocketTypes: await getRocketTypes(),
      result: await queryLaunches(query),
      appliedFilters: query,
    } as Props,
  }
}
