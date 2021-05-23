import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../constants/global/theme'
import { TextSize } from '../Text/ETextSize'
import Text from '../Text/Text'

interface Props {
  title: string
  subtitle: string
  action?: ReactElement
}

export default function PreviewHeader({
  title,
  action,
  subtitle,
}: Props): ReactElement {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  return (
    <div className="items-center justify-between flex w-full h-28">
      <div className="flex flex-col ml-8 justify-center items-start">
        <Text
          classes={`flex items-center pl-1 h-10 border-l-8 border-${theme.mainColor}`}
          weight="font-bold"
          color={theme.textAccent}
          size={TextSize.Xl5}
        >
          {title}
        </Text>
        <Text color={theme.text} size={TextSize.Lg}>
          {subtitle}
        </Text>
      </div>
    </div>
  )
}
