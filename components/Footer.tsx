import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../lib/types/redux'
import { TextSize } from './Text/ETextSize'
import Text from './Text/Text'

export default function Footer() {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div
      style={{
        width: '850px',
      }}
      className={`border-t-2 mt-52 px-10 border-white border-opacity-10 h-20 flex justify-between items-center`}
    >
      <Text size={TextSize.Lg} weight="font-semibold" color={theme.text}>
        Licensed under{' '}
        <Text link href="#" color={theme.mainText}>
          GPL v3.0 License
        </Text>
      </Text>
      <Text
        classes=""
        size={TextSize.Lg}
        weight="font-semibold"
        color={theme.text}
      >
        Made with Next.js &amp; Redux + <span className="text-red-500">❤</span>
      </Text>
      <a href="https://github.com/pavles6/astronaut" target="__blank">
        <Text size={TextSize.Lg} weight="font-semibold" color={theme.mainText}>
          GitHub Repository
        </Text>
      </a>
    </div>
  )
}
