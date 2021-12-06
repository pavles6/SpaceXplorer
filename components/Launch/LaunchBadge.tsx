import React, { FunctionComponent } from 'react'
import Text from '../Text/Text'
import { useTheme } from 'next-themes'
import { TextColor } from '../../lib/types/Text'

interface Props {
  value: string
  type: 'success' | 'failure'
  icon: FunctionComponent<React.ComponentProps<'svg'>>
  classes?: string
}

interface BadgeTypeProperties {
  container: string
  text: TextColor
  icon: string
}

interface BadgeStyles {
  failure: BadgeTypeProperties
  success: BadgeTypeProperties
}

export const LaunchBadge = ({
  value,
  type,
  icon: Icon,
  classes = '',
}: Props) => {
  const styles: BadgeStyles = {
    success: {
      container: `bg-primary`,
      text: `text-textAccentDark`,
      icon: `text-iconAccentDark`,
    },
    failure: {
      container: `bg-disabled dark:bg-disabledDark bg-opacity-30 dark:bg-opacity-30`,
      text: `text-textAccent dark:text-textAccentDark`,
      icon: `text-iconAccent dark:text-iconAccentDark`,
    },
  }

  return (
    <div
      className={`${classes} cursor-default flex items-center rounded-full ${styles[type].container}`}
    >
      <div className={`h-full p-1.5`}>
        <Icon className={`w-4 h-4 md:w-6 md:h-6 ${styles[type].icon}`} />
      </div>
      <Text
        size="text-sm"
        classes={`md:text-base px-2 py-1 ${styles[type].text}`}
      >
        {value}
      </Text>
    </div>
  )
}
