import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { calculateCountdown } from '../../lib/utils/date-functions'
import Link from 'next/link'
import { Launch } from '../../lib/types/api'
import { Theme } from '../../lib/types/theme'
import { formatDate } from '../../lib/utils/date-functions'
import { Countdown } from './Countdown'

export interface TimerNode {
  type: string
  value: string
}

interface Props {
  nextLaunch: Launch
  recentLaunches: Launch[]
}

export default function LaunchesPreview({ nextLaunch, recentLaunches }: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

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
    startTimer()
    return () => {
      window.clearInterval(countdownInterval)
    }
  }, [nextLaunch])

  return (
    <div
      className={`w-full min-h-landingTile  ${theme.surfaceBackground} flex flex-col justify-center`}
    >
      <div className="flex flex-col justify-center items-center">
        {/*... */}
        <PreviewHeader
          title="Launches"
          subtitle="Check out every detail of each SpaceX launch"
        ></PreviewHeader>
      </div>
      <div>
        {/* Next launch */}
        <div className="flex flex-col justify-center items-center">
          <Text color="textAccent" variant="h4">
            Next Launch:
          </Text>
          <div className="m-6">
            <Text
              link
              href={`/launch/${nextLaunch.id}`}
              color="mainText"
              variant="h2"
              decoration="underline"
            >
              {nextLaunch.name}
            </Text>
          </div>
          <div className="flex md:space-x-6 justify-around items-center max-w-screen-sm w-full">
            <Countdown timer={timer} />
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <div className="flex flex-col w-full items-center">
            <Text
              color="textAccent"
              size="text-2xl"
              weight={'font-semibold'}
              classes="mb-6 lg:text-3xl"
            >
              Recent launches
            </Text>
            <ul className="flex flex-col md:flex-row md:flex-wrap justify-center items-center">
              {recentLaunches
                ? recentLaunches.map((launch, i) => {
                    return (
                      <Link key={launch.id} href={`/launch/${launch.id}`}>
                        <a
                          className={`hover:shadow-red transition transform hover:-translate-y-1 cursor-pointer w-72 h-52 p-4 border border-${theme.mainColor} rounded-xl sm:mx-4 my-4`}
                        >
                          <Text
                            variant="h4"
                            color="mainText"
                            weight="font-semibold"
                            classes="truncate"
                          >
                            {launch.name}
                          </Text>
                          <Text
                            variant="subtitle1"
                            color="text"
                            weight="font-semibold"
                          >
                            {`${formatDate(
                              new Date(launch.date_unix * 1000),
                              'MMMM, YYYY.'
                            )} ${launch.upcoming ? '- Upcoming' : ''}`}
                          </Text>
                          <Text variant="subtitle1" color="text"></Text>
                          <Text variant="subtitle1" color="text">
                            {`Outcome: ${
                              launch.success === null
                                ? 'N/A'
                                : launch.success
                                ? 'Successful'
                                : 'Failed'
                            }`}
                          </Text>
                          <Text variant="subtitle1" color="text">{`Rocket: ${
                            launch.rocket!.name
                          }`}</Text>
                        </a>
                      </Link>
                    )
                  })
                : null}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center my-12 justify-end">
          <Button
            buttonVariant="link"
            href="/launches"
            variant="title1"
            color="textAccent"
            classes={`transition transform hover:-translate-y-1 bg-${theme.mainColor} rounded-lg px-20 py-5`}
          >
            See all launches
          </Button>
        </div>
      </div>
    </div>
  )
}
