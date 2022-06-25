import React, { FunctionComponent } from 'react'
import { TextColor } from '../../lib/types/Text'
import Text from '../Text/Text'

interface Props {
  value: string
  type: 'success' | 'failure'
  icon: FunctionComponent<React.ComponentProps<'svg'>>
  classes?: string
  color?: 'info' | 'danger' | 'success' | 'main' | 'warning'
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
  color = 'main',
}: Props) => {
  let successBadgeColor = ''

  switch (color) {
    case 'danger':
      successBadgeColor = 'bg-danger'
      break
    case 'success':
      successBadgeColor = 'bg-success'
      break
    case 'warning':
      successBadgeColor = 'bg-warning'
      break
    case 'main':
      successBadgeColor = 'bg-main'
      break
    case 'info':
      successBadgeColor = 'bg-info'
      break
  }

  const styles: BadgeStyles = {
    success: {
      container: successBadgeColor,
      text: `light`,
      icon: `text-light`,
    },
    failure: {
      container: 'bg-dark/50 bg-opacity-30',
      text: `light`,
      icon: `text-light`,
    },
  }

  return (
    <div
      className={`${classes} border border-white border-opacity-30 cursor-default flex items-center rounded-full ${styles[type].container} bg-opacity-50`}
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
