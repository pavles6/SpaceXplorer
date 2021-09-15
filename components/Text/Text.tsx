import Link from 'next/link'
import React from 'react'
import { usePalette } from '../../lib/palette/store'
import { TextProps, TextVariantMapping, TextWeight, TwClass } from './types'

const defaultWeights: TextVariantMapping<TextWeight> = {
  h1: 'font-bold',
  h2: 'font-semibold',
  h3: 'font-semibold',
  h4: 'font-semibold',
  title1: 'font-semibold',
  title2: 'font-normal',
  subtitle1: 'font-semibold',
  subtitle2: 'font-normal',
  small1: 'font-normal',
  small2: 'font-normal',
  articleHeading1: 'font-bold',
  articleHeading2: 'font-semibold',
  articleHeading3: 'font-semibold',
}

const textVariants: TextVariantMapping<TwClass> = {
  h1: 'text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl',
  h2: 'text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  h4: 'text-2xl lg:text-3xl',
  title1: 'text-lg',
  title2: 'text-lg',
  subtitle1: 'text-base',
  subtitle2: 'text-base',
  small1: 'text-sm',
  small2: 'text-xs',
  articleHeading1: 'text-2xl lg:text-3xl xl:text-4xl',
  articleHeading2: 'text-xl lg:text-2xl xl:text-3xl',
  articleHeading3: 'text-lg lg:text-xl xl:text-2xl',
}

export default function Text({
  link = false,
  divider = false,
  decoration = 'no-underline',
  target = '_self',
  align,
  href,
  color,
  weight,
  classes,
  size,
  children,
  variant,
  id,
}: TextProps) {
  const theme = usePalette()

  const defaultColor = theme.base.text

  let styles = null
  let output = null

  const titleDividerStyles = `pb-3 border-b ${theme.base.border}`

  if (variant)
    styles = `${textVariants[variant]} ${defaultWeights[variant] || weight} ${
      theme.base[color] || defaultColor
    } ${align || 'text-left'} ${divider ? titleDividerStyles : ''} ${weight} ${
      size || ''
    } ${decoration} ${classes || ''}`
  else {
    styles = `${theme.base[color]} ${align || 'text-left'} ${
      divider ? titleDividerStyles : ''
    } ${weight || 'font-normal'} ${size || 'text-base'} ${decoration} ${
      classes || ''
    }`
  }

  styles = eliminateRedundantWhitespaces(styles)

  switch (variant) {
    case 'h1':
      output = (
        <h1 id={id} className={styles}>
          {children}
        </h1>
      )
      break
    case 'h2':
      output = (
        <h2 id={id} className={styles}>
          {children}
        </h2>
      )
      break
    case 'h3':
      output = (
        <h3 id={id} className={styles}>
          {children}
        </h3>
      )
      break
    case 'h4':
      output = (
        <h4 id={id} className={styles}>
          {children}
        </h4>
      )
      break
    case 'title1':
      output = (
        <p id={id} className={styles}>
          {children}
        </p>
      )
      break
    case 'title2':
      output = (
        <p id={id} className={styles}>
          {children}
        </p>
      )
      break
    case 'subtitle1':
      output = (
        <p id={id} className={styles}>
          {children}
        </p>
      )
      break
    case 'subtitle2':
      output = (
        <p id={id} className={styles}>
          {children}
        </p>
      )
      break
    case 'small1':
      output = (
        <span id={id} className={styles}>
          {children}
        </span>
      )
      break
    case 'small2':
      output = (
        <span id={id} className={styles}>
          {children}
        </span>
      )
      break
    default:
      output = (
        <p id={id} className={styles}>
          {children}
        </p>
      )
  }

  if (link && !href)
    throw new Error(
      'Error in <Text/> component. Prop `link` is passed as true, but href is null.'
    )

  if (link)
    output = (
      <Link href={href}>
        <a id={id} target={target} className={styles}>
          {children}
        </a>
      </Link>
    )

  return output
}

const eliminateRedundantWhitespaces = (s: string) => s.replace(/^\s+|\s+$/g, '')
