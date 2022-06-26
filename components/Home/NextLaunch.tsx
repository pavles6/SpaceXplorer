import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  calculateCountdown,
  formatDate,
  getDateFormat,
} from '../../lib/utils/date-functions'
import Text from '../Text/Text'
import { Countdown } from './Countdown'
import { TimerNode } from './LaunchesPreview'

interface Props {
  isCountdown: boolean
  date_unix: number
  date_precision: string
}

export const NextLaunch = ({
  date_unix,
  date_precision,
  isCountdown,
}: Props) => {
  const [timerLoading, setTimerLoading] = useState(true)
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

  const startTimer = useCallback(() => {
    countdownInterval = window?.setInterval(() => {
      const countdown = calculateCountdown(date_unix)
      const timerData: TimerNode[] = timer.map((node: TimerNode) => ({
        ...node,
        value: countdown[node.type],
      }))
      setTimer(timerData)
      setTimerLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (isCountdown) {
      startTimer()
      return () => window.clearInterval(countdownInterval)
    }
  }, [])

  return (
    <>
      <div className="flex gap-2 md:gap-4 justify-center items-center max-w-screen-sm w-full">
        {date_precision === 'hour' ? (
          <Countdown loading={timerLoading} timer={timer} />
        ) : (
          <Text variant="title1">
            {formatDate(
              new Date(date_unix * 1000),
              getDateFormat(date_precision)
            )}
          </Text>
        )}
      </div>
    </>
  )
}
