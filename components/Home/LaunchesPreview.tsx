import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { TextSize } from '../Text/ETextSize'
import { calculateCountdown } from '../../lib/utils/date-functions'
import Link from 'next/link'
import { Launch } from '../../lib/types/api'
import { Theme } from '../../lib/types/theme'
import { formatDate } from '../../lib/utils/date-functions'

interface TimerNode {
  type: string
  value: string
}

interface Props {
  nextLaunch: Launch
  featuredLaunches: Launch[]
}

export default function LaunchesPreview({
  nextLaunch,
  featuredLaunches,
}: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [launchNameUnderline, setLaunchNameUnderline] = useState(false)

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
          subtitle="Get to know about every SpaceX space Launch"
        ></PreviewHeader>
      </div>
      <div>
        {/* Next launch */}
        <Link href={`/launch/${nextLaunch.id}`}>
          <a
            onMouseOver={() => setLaunchNameUnderline(true)}
            onMouseLeave={() => setLaunchNameUnderline(false)}
            className="flex cursor-pointer flex-col justify-center items-center"
          >
            <Text
              color={theme.textAccent}
              size={TextSize.Xl2}
              weight="font-semibold"
            >
              Next Launch:
            </Text>
            <div className="m-6">
              <Text
                color={theme.mainText}
                weight="font-extrabold"
                size={TextSize.Xl6}
                classes={`${launchNameUnderline ? 'underline' : ''}`}
              >
                {nextLaunch.name}
              </Text>
            </div>
            <div className="flex m-6 justify-around items-center max-w-screen-lg w-full space-x-5">
              {timer.map((item) => (
                <div
                  key={item.type}
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className={`w-40 h-40 flex justify-center items-center rounded-lg ${theme.surface}`}
                  >
                    <Text
                      color={theme.textAccent}
                      size={TextSize.Xl6}
                      weight="font-bold"
                    >
                      {item.value}
                    </Text>
                  </div>
                  <Text size={TextSize.Lg} color={theme.text}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Text>
                </div>
              ))}
            </div>
          </a>
        </Link>
        {/* Featured launches */}
        <div className="flex justify-center mt-6">
          <div className="flex flex-col w-full items-center">
            <Text
              color={theme.textAccent}
              size={TextSize.Xl3}
              weight={'font-semibold'}
              classes="mb-6"
            >
              Featured launches
            </Text>
            <ul className="flex flex-wrap justify-center items-center">
              {featuredLaunches
                ? featuredLaunches.map((launch) => {
                    return (
                      <Link key={launch.id} href={`/launch/${launch.id}`}>
                        <a
                          className={`hover:shadow-red transition transform hover:-translate-y-1 cursor-pointer w-72 h-52 p-4 border border-${theme.mainColor} rounded-xl mx-4 my-4`}
                        >
                          <Text
                            size={TextSize.Xl3}
                            color={theme.mainText}
                            weight="font-semibold"
                            classes="truncate"
                          >
                            {launch.name}
                          </Text>
                          <Text
                            size={TextSize.Lg}
                            color={theme.text}
                            weight="font-semibold"
                          >
                            {`${formatDate(
                              new Date(launch.date_unix * 1000),
                              'MMMM, YYYY.'
                            )} ${launch.upcoming ? '- Upcoming' : ''}`}
                          </Text>
                          <Text size={TextSize.Base} color={theme.text}></Text>
                          <Text size={TextSize.Base} color={theme.text}>
                            {`Outcome: ${
                              launch.success === null
                                ? 'N/A'
                                : launch.success
                                ? 'Successful'
                                : 'Failed'
                            }`}
                          </Text>
                          <Text
                            size={TextSize.Base}
                            color={theme.text}
                          >{`Rocket: ${launch.rocket!.name}`}</Text>
                        </a>
                      </Link>
                    )
                  })
                : null}
            </ul>
          </div>
        </div>
        <div className="flex flex-col h-60 items-center justify-end">
          <Button
            variant="link"
            href="/launches"
            textSize={TextSize.Xl2}
            textWeight="font-semibold"
            classes={`transition transform hover:-translate-y-1 bg-${theme.mainColor} ${theme.textAccent} rounded-lg px-20 py-5 mb-10 `}
          >
            See all launches
          </Button>
        </div>
      </div>
    </div>
  )
}
