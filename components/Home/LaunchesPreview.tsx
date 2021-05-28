import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button/Button'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { TextSize } from '../Text/ETextSize'
import Skeleton from '../Skeleton/Skeleton'
import Link from 'next/link'
import { Launch } from '../../lib/types/api'
import { Theme } from '../../lib/types/theme'

interface timerNode {
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

  const [timer, setTimer] = useState<timerNode[]>([
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
    const countdownTime = nextLaunch?.date_unix * 1000
    countdownInterval = window?.setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownTime - now

      if (distance > 0) {
        let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString()
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ).toString()
        let minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        ).toString()
        let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString()

        if (days.length == 1) days = `0${days}`
        if (hours.length == 1) hours = `0${hours}`
        if (minutes.length == 1) minutes = `0${minutes}`
        if (seconds.length == 1) seconds = `0${seconds}`

        setTimer([
          {
            ...timer[0],
            value: days,
          },
          {
            ...timer[1],
            value: hours,
          },
          {
            ...timer[2],
            value: minutes,
          },
          {
            ...timer[3],
            value: seconds,
          },
        ])
      } else {
        window?.clearInterval(countdownInterval.current)
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
      <div className={`flex-1`}>
        {/* Next launch */}
        <div className="flex flex-col justify-center items-center">
          <Text
            color={theme.textAccent}
            size={TextSize.Xl2}
            weight="font-semibold"
          >
            Next Launch:
          </Text>
          <div className="m-6">
            {nextLaunch ? (
              <Button
                variant="link"
                href={`/launch/${nextLaunch.id}`}
                textColor={theme.mainText}
                textWeight="font-extrabold"
                textSize={TextSize.Xl6}
              >
                {nextLaunch.name}
              </Button>
            ) : (
              <Skeleton width={25} height={3.75} />
            )}
          </div>
          <div className="flex m-6 justify-around items-center max-w-screen-lg w-full space-x-5">
            {nextLaunch
              ? timer.map((item) => (
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
                ))
              : timer.map(({ type }) => (
                  <Skeleton key={type} width={10} height={10} />
                ))}
          </div>
        </div>
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
                ? featuredLaunches.map((item) => {
                    const monthNames = [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ]

                    return (
                      <Link key={item.id} href={`/launch/${item.id}`}>
                        <a
                          className={`w-52 hover:shadow-red transition transform hover:-translate-y-1 cursor-pointer w-72 h-52 p-4 border border-${theme.mainColor} rounded-xl mx-4 my-4`}
                        >
                          <Text
                            size={TextSize.Xl3}
                            color={theme.mainText}
                            weight="font-semibold"
                            classes="truncate"
                          >
                            {item.name}
                          </Text>
                          <Text
                            size={TextSize.Lg}
                            color={theme.text}
                            weight="font-semibold"
                          >
                            {`${
                              monthNames[
                                new Date(item.date_unix * 1000).getMonth()
                              ]
                            }, ${new Date(
                              item.date_unix * 1000
                            ).getFullYear()} ${
                              item.upcoming ? '- Upcoming' : ''
                            }`}
                          </Text>
                          <Text size={TextSize.Base} color={theme.text}></Text>
                          <Text size={TextSize.Base} color={theme.text}>
                            {`Outcome: ${
                              item.success === null
                                ? 'N/A'
                                : item.success
                                ? 'Successful'
                                : 'Failed'
                            }`}
                          </Text>
                          <Text
                            size={TextSize.Base}
                            color={theme.text}
                          >{`Rocket: ${item.rocket!.name}`}</Text>
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
