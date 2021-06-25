import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import Text from '../Text/Text'
import { useMediaQuery } from 'react-responsive'

interface Props {
  title: string
  subtitle: string
}

export default function PreviewHeader({
  title,
  subtitle,
}: Props): ReactElement {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex items-center w-full h-28">
      <div
        className={`${
          isClient && isSmallScreen ? 'block' : 'hidden'
        } w-full flex flex-col justify-center items-center border-b-2 border-white border-opacity-10 pb-2`}
      >
        <Text weight="font-bold" color="textAccent" size="text-4xl">
          {title}
        </Text>
        <Text color="textSecondary" variant="subtitle1">
          {subtitle}
        </Text>
      </div>
      <div
        className={`${
          isClient && isSmallScreen ? 'hidden' : 'block'
        } flex flex-col ml-8 justify-center items-start`}
      >
        <Text
          classes={`flex items-center pl-1 h-10 border-l-8 border-${theme.mainColor}`}
          weight="font-bold"
          color="textAccent"
          size="text-4xl"
        >
          {title}
        </Text>
        <Text color="textSecondary" variant="subtitle1">
          {subtitle}
        </Text>
      </div>
    </div>
  )
}
