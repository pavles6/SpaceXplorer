import React, { FunctionComponent, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { TextSize } from '../Text/ETextSize'
import { Theme } from '../../lib/types/theme'

interface Props {
  click?: Function
  textColor?: string
  children: string
  icon?: FunctionComponent<React.ComponentProps<'svg'>>
  variant: 'link' | 'button'
  href?: string
  textWeight?: string
  textSize: TextSize
  classes?: string
}

export default function Button({
  click,
  variant = 'button',
  textColor,
  classes,
  textWeight,
  children,
  href,
  textSize,
  icon: Icon,
}: Props): ReactElement {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  if (!textColor) textColor = theme.textAccent

  if (variant === 'link') {
    return (
      <Link href={href}>
        <a className={`${classes} ${textColor}`}>
          <p
            style={{
              color: 'inherit',
            }}
            className={`${textSize} ${textWeight}`}
          >
            {children}
          </p>
          {Icon ? (
            <Icon className={`${theme.text} absolute h-8 w-8 mx-2`}></Icon>
          ) : null}
        </a>
      </Link>
    )
  }

  return (
    <button className={`${classes} ${textColor}`} onClick={() => click()}>
      <p
        style={{
          color: 'inherit',
        }}
        className={`${textSize} ${textWeight}`}
      >
        {children}
      </p>
      {Icon ? (
        <Icon className={`${textColor} absolute h-8 w-8 mx-2`}></Icon>
      ) : null}
    </button>
  )
}
