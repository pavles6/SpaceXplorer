import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { calculateCountdown } from '../../lib/utils/date-functions'
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
  const [timer, setTimer] = useState<TimerNode[]>([
    {
      type: 'days',
      value: null,
    },
    {
      type: 'hours',
      value: null,
    },
    {
      type: 'minutes',
      value: null,
    },
    {
      type: 'seconds',
      value: null,
    },
  ])

  let countdownInterval: any = useRef<any | null>(null)

  const startTimer = () => {
    countdownInterval = window?.setInterval(() => {
      const result = calculateCountdown(nextLaunch.date_unix)
      if (!result) window?.clearInterval(countdownInterval.current)
      else {
        const timerData: TimerNode[] = timer.map((node: TimerNode) => ({
          ...node,
          value: result[node.type],
        }))
        setTimer(timerData)
      }
    }, 1000)
  }

  useEffect(() => {
    if (nextLaunch.date_precision === 'hour') {
      startTimer()
      return () => {
        window.clearInterval(countdownInterval)
      }
    }
  }, [nextLaunch])

  return (
    <div className="w-full min-h-min px-4 md:px-0">
      <NextLaunch {...nextLaunch} timer={timer} />

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
          href="/search"
          variant="title1"
          color="light"
          classes={`transition transform hover:-translate-y-1 bg-main rounded-lg px-20 py-5`}
        >
          Browse all launches
        </Button>
      </div>
    </div>
  )
}
