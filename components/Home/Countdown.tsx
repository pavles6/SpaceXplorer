import React, { useEffect, useState } from 'react'
import Text from '../Text/Text'
import { TimerNode } from './LaunchesPreview'

interface Props {
  timer: TimerNode[]
  loading: boolean
}

export const Countdown = ({ timer, loading }: Props) => {
  return (
    <>
      {loading
        ? timer.map((item) => (
            <div className="flex-col flex items-center" key={item.type}>
              <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-28 md:h-28 flex justify-center items-center rounded-lg bg-lightSecondary dark:bg-darkSecondary animate-pulse" />
              <Text classes="mt-1 text-xs sm:text-base font-semibold text-transparent rounded-md dark:text-transparent bg-lightSecondary animate-pulse dark:bg-darkSecondary dark:animate-pulse">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Text>
            </div>
          ))
        : timer.map((item) => (
            <React.Fragment key={item.type}>
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-28 md:h-28 flex justify-center items-center rounded-lg bg-lightSecondary dark:bg-darkSecondary">
                  <Text
                    color="theme"
                    weight="font-semibold"
                    classes={`md:text-2xl`}
                    fixedSize="text-xl"
                  >
                    {item.value}
                  </Text>
                </div>
                <Text
                  classes="mt-1 text-xs sm:text-base font-semibold"
                  color="theme"
                >
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Text>
              </div>
            </React.Fragment>
          ))}
    </>
  )
}
