import React from 'react'
import Text from '../Text/Text'

interface Props {
  spacing?: string
  title: string
  value: string
  link?: boolean
  href?: string
  classes?: string
  target?: '_blank' | '_self'
}

export const DataRow = ({
  title,
  value,
  classes,
  spacing,
  link,
  href,
  target = '_self',
}: Props) => {
  return (
    <div
      className={`flex ${classes || ''} justify-between lg:justify-start ${
        spacing || 'space-x-2'
      }`}
    >
      <div className="flex flex-shrink-0">
        <Text variant="subtitle2" color="themeSecondary">
          {title + ':'}
        </Text>
      </div>
      <Text
        classes={`flex-shrink ${link ? 'underline' : ''}`}
        link={link}
        href={href}
        target={target}
        variant="subtitle1"
        textAlign="text-right"
        color={link ? 'info' : 'theme'}
        decoration={link ? 'underline' : 'no-underline'}
      >{`${value}`}</Text>
    </div>
  )
}
