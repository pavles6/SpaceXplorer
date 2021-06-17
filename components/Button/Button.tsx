import React, { FunctionComponent, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { TextSize } from '../Text/ETextSize'
import { Theme } from '../../lib/types/theme'

interface Props {
  click?: Function
  textColor?: string
  children?: string
  icon?: FunctionComponent<React.ComponentProps<'svg'>>
  variant?: 'link' | 'button'
  href?: string
  textWeight?: string
  textSize?: TextSize
  classes?: string
  iconClasses?: string
}

export default function Button({
  click,
  variant = 'button',
  textColor,
  classes = '',
  textWeight,
  children = '',
  iconClasses = '',
  href,
  textSize = TextSize.Base,
  icon: Icon,
}: Props): ReactElement {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  if (!textColor) textColor = theme.textAccent

  const iconButton = !children && Icon

  if (variant === 'link') {
    return (
      <Link href={href}>
        <a className={`${classes} ${textColor}`}>
          {!iconButton ? (
            <p
              style={{
                color: 'inherit',
              }}
              className={`${textSize} ${textWeight}`}
            >
              {children}
            </p>
          ) : null}
          {Icon ? (
            <Icon
              className={`${textColor} ${
                !iconButton ? 'absolute' : ''
              } h-8 w-8 ${iconClasses}`}
            ></Icon>
          ) : null}
        </a>
      </Link>
    )
  }

  return (
    <button
      className={`${classes} focus:outline-none ${textColor}`}
      onClick={() => click()}
    >
      {children ? (
        <p
          style={{
            color: 'inherit',
          }}
          className={`${textSize} ${textWeight}`}
        >
          {children}
        </p>
      ) : null}
      {Icon ? (
        <Icon
          className={`${textColor} ${
            !iconButton ? 'absolute' : ''
          } h-8 w-8 ${iconClasses}`}
        ></Icon>
      ) : null}
    </button>
  )
}
