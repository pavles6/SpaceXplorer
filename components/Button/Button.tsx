import React, { FunctionComponent, ReactElement } from 'react'
import { TextProps } from '../../lib/types/Text'
import Text, { useTextVariant } from '../Text/Text'
import { usePalette } from '../../lib/palette/store'

interface ButtonProps extends TextProps {
  click?: Function
  icon?: FunctionComponent<React.ComponentProps<'svg'>>
  buttonVariant?: 'link' | 'button'
  iconClasses?: string
  buttonClasses?: string
  target?: '_self' | '_blank'
  id?: string
  iconColor?: string
  disabled?: boolean
}

export default function Button({
  click,
  buttonVariant = 'button',
  variant = 'subtitle1',
  children = '',
  iconClasses,
  classes,
  href,
  color,
  icon: Icon,
  iconColor,
  id,
  disabled = false,
  target = '_self',
}: ButtonProps): ReactElement {
  const theme = usePalette()

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
            className={`${theme.base.textAccent} ${
              !iconButton ? 'absolute' : ''
            } ${iconClasses || 'h-8 w-8'}`}
          />
        ) : null}
      </Text>
    )
  }

  return (
    <button
      disabled={disabled}
      id={id}
      className={`${classes} focus:outline-none ${useTextVariant(variant)}`}
      onClick={() => click()}
    >
      {children ? children : null}
      {Icon ? (
        <Icon
          className={`${!iconColor ? theme.base.textAccent : iconColor} ${
            !iconButton ? 'absolute' : ''
          } ${iconClasses || 'h-8 w-8'}`}
        />
      ) : null}
    </button>
  )
}
