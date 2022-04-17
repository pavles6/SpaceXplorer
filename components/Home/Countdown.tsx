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
            <div className="p-5 sm:p-8 md:p-10 flex justify-center items-center rounded-lg bg-lightSecondary dark:bg-darkSecondary">
              <Text
                color="theme"
                weight="font-semibold"
                classes="md:text-2xl"
                fixedSize="text-xl"
              >
                {item.value}
              </Text>
            </div>
            <Text variant="subtitle1" color="theme">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </div>
          {i !== timer.length - 1 && mounted ? (
            <div className="md:hidden p-1 rounded-xl bg-surfacePrimaryDark dark:bg-surfacePrimary" />
          ) : null}
        </React.Fragment>
      ))}
    </>
  )
}
