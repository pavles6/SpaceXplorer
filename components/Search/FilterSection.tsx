import React from 'react'
import { QueryFilters } from '../../lib/types/query'
import Text from '../Text/Text'
import { FilterDropdown } from './FilterDropdown'
import { FilterDropdownField } from './FilterDropdownField'

interface Props {
  filters: QueryFilters
  setFilters: Function
  rocketTypes: Array<any>
}

export const FilterSection = ({ filters, setFilters, rocketTypes }: Props) => {
  return (
    <>
      <div className="border-borderColor dark:border-borderColorDark border-b flex h-16 items-center justify-start w-full mt-4">
        <Text
          variant="h4"
          color="textAccent"
          classes="flex items-center h-full pl-2"
        >
          Filter
        </Text>
      </div>
      <FilterDropdown fieldsChecked={filters.launch_type !== ''} title="Type">
        <FilterDropdownField
          type="radio"
          title="Crew"
          checked={filters.launch_type === 'crew'}
          changeFilter={() =>
            setFilters({
              ...filters,
              page: 1,
              launch_type: filters.launch_type === 'crew' ? '' : 'crew',
            })
          }
        />
        <FilterDropdownField
          title="Non crew"
          type="radio"
          checked={filters.launch_type === 'non-crew'}
          changeFilter={() =>
            setFilters({
              ...filters,
              page: 1,
              launch_type: filters.launch_type === 'non-crew' ? '' : 'non-crew',
            })
          }
        />
      </FilterDropdown>
      <FilterDropdown fieldsChecked={filters.rocket.length > 0} title="Rocket">
        {rocketTypes.map((rocket) => (
          <FilterDropdownField
            type="checkbox"
            key={rocket.id}
            title={rocket.name}
            checked={filters.rocket.includes(rocket.id)}
            changeFilter={() =>
              setFilters({
                ...filters,
                page: 1,
                rocket: filters.rocket.includes(rocket.id)
                  ? (filters.rocket as Array<string>).filter(
                      (filterRocket) => filterRocket !== rocket.id
                    )
                  : [...filters.rocket, rocket.id],
              })
            }
          />
        ))}
      </FilterDropdown>
      <FilterDropdown fieldsChecked={filters.outcome !== ''} title="Outcome">
        <FilterDropdownField
          type="radio"
          title="Sucessful"
          checked={filters.outcome === 'successful'}
          changeFilter={() =>
            setFilters({
              ...filters,
              page: 1,
              outcome: filters.outcome === 'successful' ? '' : 'successful',
            })
          }
        />
        <FilterDropdownField
          type="radio"
          title="Failed"
          checked={filters.outcome === 'failed'}
          changeFilter={() =>
            setFilters({
              ...filters,
              page: 1,
              outcome: filters.outcome === 'failed' ? '' : 'failed',
            })
          }
        />
      </FilterDropdown>
      <FilterDropdown fieldsChecked={filters.has_images !== ''} title="Other">
        <FilterDropdownField
          type="checkbox"
          title="Includes images"
          checked={filters.has_images === 'images'}
          changeFilter={() =>
            setFilters({
              ...filters,
              page: 1,
              has_images: filters.has_images === 'images' ? '' : 'images',
            })
          }
        />
      </FilterDropdown>
    </>
  )
}
