import React, { FunctionComponent, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../constants/global/theme'
import Link from 'next/link'

import Text from '../Text/Text'
import { TextSize } from '../Text/ETextSize'

interface Props {
  click: Function
  children: string
  Icon?: FunctionComponent<React.ComponentProps<'svg'>>
  variant: 'link' | 'button'
  href?: string
  size: TextSize
  classes?: string
}

export default function Button({
  click,
  variant = 'button',
  classes,
  children,
  href,
  size,
  Icon,
}: Props): ReactElement {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  if (variant === 'link') {
    return (
      <Link href={href}>
        <a
          className={
            classes ||
            `mx-6 transition delay-100 flex justify-between items-center p-3.5 rounded-lg focus:outline-none ${theme.surface} hover:bg-red-500`
          }
        >
          <Text size={size} weight="font-semibold" color={theme.textAccent}>
            {children}
          </Text>
          {Icon ? (
            <Icon className={`${theme.text} h-8 w-8 ml-10`}></Icon>
          ) : null}
        </a>
      </Link>
    )
  }

  return (
    <button
      className={`mx-6 transition delay-100 flex justify-between items-center p-3.5 rounded focus:outline-none ${theme.surface} hover:${theme.mainSurface}`}
      onClick={() => click()}
    >
      <Text size={size} weight="font-bold" color={theme.textAccent}>
        {children}
      </Text>
      {Icon ? <Icon className={`${theme.text} h-8 w-8 ml-10`}></Icon> : null}
    </button>
  )
}
