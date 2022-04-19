import React, { useEffect, useState } from 'react'
import Text from '../Text/Text'
import { TimerNode } from './LaunchesPreview'

interface Props {
  timer: TimerNode[]
}

export const Countdown = ({ timer }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {timer.map((item, i) => (
        <React.Fragment key={item.type}>
          <div className="flex flex-col items-center justify-center">
            <div className="p-6 sm:p-8 md:p-10 flex justify-center items-center rounded-lg bg-lightSecondary dark:bg-darkSecondary">
              <Text
                color="theme"
                weight="font-semibold"
                classes="md:text-2xl"
                fixedSize="text-xl"
              >
                {item.value}
              </Text>
            </div>
            <Text classes="text-xs sm:text-base font-semibold" color="theme">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </div>
        </React.Fragment>
      ))}
    </>
  )
}
