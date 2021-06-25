import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../lib/types/redux'
import Text from '../Text/Text'
import { TimerNode } from './LaunchesPreview'

interface Props {
  timer: TimerNode[]
}

export const Countdown = ({ timer }: Props) => {
  const theme = useSelector((state: State) => state.theme)
  return (
    <>
      {timer.map((item, i) => (
        <React.Fragment key={item.type}>
          <div className="flex flex-col items-center justify-center">
            <div
              className={` md:p-16 flex justify-center items-center rounded-lg md:${theme.surface}`}
            >
              <Text
                color="textAccent"
                weight="font-semibold"
                classes="md:text-4xl"
                size="text-xl"
              >
                {item.value}
              </Text>
            </div>
            <Text variant="subtitle1" color="text">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </div>
          {i !== timer.length - 1 ? (
            <div className="md:hidden p-1 rounded-xl bg-white" />
          ) : null}
        </React.Fragment>
      ))}
    </>
  )
}
