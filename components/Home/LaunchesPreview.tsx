import React, { useMemo } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { Launch } from '../../lib/types/api'
import { LaunchCard } from '../common/LaunchCard'
import { NextLaunch } from './NextLaunch'

export interface TimerNode {
  type: string
  value: string
}

interface Props {
  nextLaunch: Launch
  recentLaunches: Launch[]
}

export default function LaunchesPreview({ nextLaunch, recentLaunches }: Props) {
  const isCountdown = useMemo(() => {
    const isHourPrecision = nextLaunch.date_precision === 'hour'
    const isDistance = nextLaunch.date_unix * 1000 - new Date().getTime() > 0

    return isHourPrecision && isDistance
  }, [nextLaunch.date_unix, nextLaunch.date_precision])

  return (
    <div className="w-full min-h-min px-4 md:px-0">
      {isCountdown ? (
        <>
          <div className="mb-4 mt-6 flex items-center justify-center w-full">
            <Text
              link
              href={`/launch/${nextLaunch.id}`}
              color="main"
              variant="h4"
              decoration="underline"
            >
              {nextLaunch.name}
            </Text>
            <Text color="theme" variant="h4" classes="ml-2">
              is lifting off in:
            </Text>
          </div>
          <NextLaunch
            isCountdown={isCountdown}
            date_precision={nextLaunch.date_precision}
            date_unix={nextLaunch.date_unix}
          />
        </>
      ) : null}

      <div className="mt-12">
        <div className="flex flex-col w-full items-center">
          <Text
            color="theme"
            fixedSize="text-2xl"
            weight={'font-semibold'}
            classes="mb-6 lg:text-3xl"
          >
            Recent launches
          </Text>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center max-w-screen-lg">
            {recentLaunches
              ? recentLaunches.map((launch) => {
                  return <LaunchCard key={launch.id} {...launch} />
                })
              : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-12 mb-12 justify-end">
        <Button
          buttonVariant="link"
          href="/search?date_sort=descending&date_range=past"
          variant="title1"
          color="light"
          classes={`transition transform hover:-translate-y-1 bg-main rounded-lg px-12 lg:px-20 py-5`}
        >
          Browse all launches
        </Button>
      </div>
    </div>
  )
}
