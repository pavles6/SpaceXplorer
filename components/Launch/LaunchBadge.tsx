import React, { FunctionComponent } from 'react'
import { TextColor } from '../../lib/types/Text'
import Text from '../Text/Text'

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
      container: `bg-main`,
      text: `light`,
      icon: `text-light`,
    },
    failure: {
      container: `bg-light/50 dark:bg-dark/50 bg-opacity-30 dark:bg-opacity-30`,
      text: `theme`,
      icon: `text-dark dark:text-light`,
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
        fixedSize="text-sm"
        classes={`md:text-base px-2 py-1`}
        color={styles[type].text}
      >
        {value}
      </Text>
    </div>
  )
}
