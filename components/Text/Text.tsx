import Link from 'next/link'
import React from 'react'
import { TextProps, TextVariants } from '../../lib/types/Text'

export default function Text({
  link = false,
  border = false,
  decoration = 'no-underline',
  target = '_self',
  textAlign,
  href = null,
  color = 'theme',
  weight = 'font-normal',
  classes = null,
  fixedSize,
  children,
  variant = null,
  cssId = undefined,
}: TextProps) {
  let output = null

  const borderStyles = 'pb-3 border-b border-dark/20 dark:border-light/20'
  let textColor = null

  switch (color) {
    case 'main':
      textColor = 'text-main dark:text-main'
      break
    case 'dark':
      textColor = 'text-dark dark:text-dark'
      break
    case 'darkSecondary':
      textColor = 'text-darkSecondary dark:text-darkSecondary'
      break
    case 'light':
      textColor = 'text-light dark:text-light'
      break
    case 'lightSecondary':
      textColor = 'text-lightSecondary dark:text-lightSecondary'
      break
    case 'theme':
      textColor = 'text-dark dark:text-light'
      break
    case 'themeSecondary':
      textColor = 'text-textDarkSecondary dark:text-textLightSecondary'
      break
    case 'info':
      textColor = 'text-info dark:text-info'
      break
    case 'warning':
      textColor = 'text-warning dark:text-warning'
      break
    case 'success':
      textColor = 'text-success dark:text-success'
      break
    case 'danger':
      textColor = 'text-danger dark:text-danger'
      break
  }

  const styles = variant
    ? `${TextVariants[variant].size} ${
        TextVariants[variant].weight
      } ${decoration} ${textColor}${textAlign ? ' ' + textAlign : ''}${
        classes ? ' ' + classes : ''
      }${border ? ' ' + borderStyles : ''}`
    : `${fixedSize ? fixedSize + ' ' : ''}${weight} ${decoration} ${textColor}${
        textAlign ? ' ' + textAlign : ''
      }${classes ? ' ' + classes : ''}${border ? ' ' + borderStyles : ''}`

  switch (variant) {
    case 'h1':
      output = (
        <h1 id={cssId} className={styles}>
          {children}
        </h1>
      )
      break
    case 'h2':
      output = (
        <h2 id={cssId} className={styles}>
          {children}
        </h2>
      )
      break
    case 'h3':
      output = (
        <h3 id={cssId} className={styles}>
          {children}
        </h3>
      )
      break
    case 'h4':
      output = (
        <h4 id={cssId} className={styles}>
          {children}
        </h4>
      )
      break
    case 'title1':
      output = (
        <p id={cssId} className={styles}>
          {children}
        </p>
      )
      break
    case 'title2':
      output = (
        <p id={cssId} className={styles}>
          {children}
        </p>
      )
      break
    case 'subtitle1':
      output = (
        <p id={cssId} className={styles}>
          {children}
        </p>
      )
      break
    case 'subtitle2':
      output = (
        <p id={cssId} className={styles}>
          {children}
        </p>
      )
      break
    case 'small1':
      output = (
        <span id={cssId} className={styles}>
          {children}
        </span>
      )
      break
    case 'small2':
      output = (
        <span id={cssId} className={styles}>
          {children}
        </span>
      )
      break
    default:
      output = (
        <p id={cssId} className={styles}>
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
        <a id={cssId || ''} target={target} className={styles}>
          {children}
        </a>
      </Link>
    )

  return output
}
