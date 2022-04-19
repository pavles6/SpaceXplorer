import React from 'react'

export interface TextProps {
  color?: TextColor
  weight?: TextWeight
  variant?: TextVariantProp
  fixedSize?: TextSize
  children?: JSX.Element | JSX.Element[] | string | React.ReactChild
  classes?: string
  href?: string
  target?: '_self' | '_blank'
  decoration?: TextDecoration
  textAlign?: 'text-left' | 'text-right' | 'text-center' | 'text-justify'
  border?: boolean
  link?: boolean
  cssId?: string
}

type TextDecoration = 'underline' | 'overline' | 'line-through' | 'no-underline'

type TextVariantProp = keyof typeof TextVariants

export type TextColor =
  | 'main'
  | 'dark'
  | 'light'
  | 'darkSecondary'
  | 'lightSecondary'
  | 'themeSecondary'
  | 'theme'
  | 'info'
  | 'warning'
  | 'success'
  | 'danger'

type TextWeight = 'font-normal' | 'font-semibold' | 'font-bold'

type TextSize =
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl'
  | 'text-4xl'
  | 'text-5xl'
  | 'text-6xl'
  | 'text-7xl'

export const TextVariants = {
  h1: {
    weight: 'font-bold',
    size: 'text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl',
  },
  h2: {
    weight: 'font-semibold',
    size: 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl',
  },
  h3: {
    weight: 'font-semibold',
    size: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  },
  h4: {
    weight: 'font-semibold',
    size: 'text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl',
  },
  title1: {
    weight: 'font-semibold',
    size: 'text-lg',
  },
  title2: {
    weight: 'font-normal',
    size: 'text-lg',
  },
  subtitle1: {
    weight: 'font-semibold',
    size: 'text-base',
  },
  subtitle2: {
    weight: 'font-normal',
    size: 'text-base',
  },
  small1: {
    weight: 'font-normal',
    size: 'text-sm',
  },
  small2: {
    weight: 'font-normal',
    size: 'text-xs',
  },
  articleHeading1: {
    weight: 'font-bold',
    size: 'text-2xl lg:text-3xl xl:text-4xl',
  },
  articleHeading2: {
    weight: 'font-semibold',
    size: 'text-xl lg:text-2xl xl:text-3xl',
  },
  articleHeading3: {
    weight: 'font-semibold',
    size: 'text-lg lg:text-xl xl:text-2xl',
  },
} as const
