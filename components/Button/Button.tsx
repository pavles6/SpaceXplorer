import React, { FunctionComponent, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Theme } from '../../lib/types/theme'
import { TextProps } from '../Text/types'
import Text from '../Text/Text'

interface ButtonProps extends TextProps {
  click?: Function
  icon?: FunctionComponent<React.ComponentProps<'svg'>>
  buttonVariant?: 'link' | 'button'
  iconClasses?: string
  buttonClasses?: string
  target?: string
  id?: string
}

export default function Button({
  click,
  buttonVariant = 'button',
  variant = 'subtitle1',
  buttonClasses = '',
  children = '',
  iconClasses,
  classes,
  href,
  color,
  icon: Icon,
  id,
  target = '_self',
}: ButtonProps): ReactElement {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const iconButton = !children && Icon

  if (buttonVariant === 'link') {
    return (
      <Text
        variant={variant}
        classes={classes}
        link
        color={color}
        href={href}
        target={target}
        id={id}
      >
        {!iconButton ? (
          <span
            style={{
              color: 'inherit',
            }}
          >
            {children}
          </span>
        ) : null}
        {Icon ? (
          <Icon
            className={`${theme.textAccent} ${!iconButton ? 'absolute' : ''} ${
              iconClasses || 'h-8 w-8'
            }`}
          />
        ) : null}
      </Text>
    )
  }

  return (
    <button
      id={id}
      className={`${buttonClasses} focus:outline-none`}
      onClick={() => click()}
    >
      {children ? (
        <Text variant={variant} color={color} classes={classes}>
          {children}
        </Text>
      ) : null}
      {Icon ? (
        <Icon
          className={`${theme.textAccent} ${!iconButton ? 'absolute' : ''} ${
            iconClasses || 'h-8 w-8'
          }`}
        />
      ) : null}
    </button>
  )
}
