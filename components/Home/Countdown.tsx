import React, { useEffect, useState } from 'react'
import { usePalette } from '../../lib/palette/store'
import Text from '../Text/Text'
import { TimerNode } from './LaunchesPreview'
import { useTheme } from 'next-themes'

interface Props {
  timer: TimerNode[]
}

export const Countdown = ({ timer }: Props) => {
  const theme = usePalette()

  const themeMetadata = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {timer.map((item, i) => (
        <React.Fragment key={item.type}>
          <div className="flex flex-col items-center justify-center">
            <div
              className={`md:p-16 flex justify-center items-center rounded-lg ${
                theme.md[`surface`]
              }`}
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
          {i !== timer.length - 1 && mounted ? (
            <div
              className={`md:hidden p-1 rounded-xl ${
                themeMetadata.theme === 'dark'
                  ? theme.base['light:surface']
                  : theme.base['dark:surface']
              }`}
            />
          ) : null}
        </React.Fragment>
      ))}
    </>
  )
}
