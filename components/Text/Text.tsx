import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../lib/types/redux'
import { Theme } from '../../lib/types/theme'
import { TextSize } from './ETextSize'

const headingWithBorderStyles = 'pb-3 border-b-2 border-white border-opacity-10'

interface TextVariant {
  h1: string
  h2: string
  h3: string
  title1: (color: string) => string
  title2: (color: string) => string
  subtitle1: (color: string) => string
  subtitle2: (color: string) => string
}

// Pre-defined styles for commonly used text styles, inspired by Material-UI Typography component
const textVariantFunction = (theme: Theme, heading: boolean): TextVariant => ({
  h1: `${TextSize.Xl5} ${theme.textAccent} ${
    heading ? headingWithBorderStyles : ''
  } font-bold`,
  h2: `${TextSize.Xl3} ${theme.textAccent} ${
    heading ? headingWithBorderStyles : ''
  } font-semibold`,
  h3: `${TextSize.Xl} ${theme.text} ${
    heading ? headingWithBorderStyles : ''
  } font-semibold`,
  title1: (color: string) => `${TextSize.Lg} font-semibold ${color}`,
  title2: (color: string) => `${TextSize.Lg} ${color}`,
  subtitle1: (color: string) => `${TextSize.Base} font-semibold ${color}`,
  subtitle2: (color: string) => `${TextSize.Base} ${color}`,
})

/**
 * @member {variant} When using `subtitle1` or `subtitle2`, a `color` prop must be passed
 *
 *
 */
interface Props {
  /** Pre-defined variants for commonly used text styles, inspired by Material-UI Typography component */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'title1'
    | 'title2'
    | 'subtitle1'
    | 'subtitle2'
    | ''
  /**Tailwindcss class for color */
  color?: string
  /**Text size, use from TextSize enum */
  size?: TextSize
  /**Tailwindcss class for font weight */
  weight?: string
  /**Additional optional styles, or whole text config instead of passing multiple props */
  classes?: string
  /**If true, text will be rendered as an link, using Next.js <Link/> component */
  link?: boolean
  /**Adds an bottom border under the text, if passed as true */
  heading?: boolean
  /**Url for link, only if `link` prop is true */
  href?: string
  /**Text alignment */
  align?: 'text-left' | 'text-center' | 'text-right' | 'text-justify'
  /** Can be supplied when `link` prop is `true`, usually `__blank` */
  target?: string
  children?: React.ReactNode | React.ReactNodeArray
}

export default function Text({
  link = false,
  href = '',
  target = '',
  color = '',
  weight = '',
  size = TextSize.Base,
  classes = '',
  children,
  heading = false,
  align = 'text-left',
  variant = '',
}: Props) {
  const theme = useSelector((state: State) => state.theme)

  const textVariants = textVariantFunction(theme, heading)
  let predefinedVariant = null

  if (variant) {
    for (const foundVariant of Object.keys(textVariants))
      if (variant === foundVariant) {
        if (typeof textVariants[variant] === 'function')
          if (!color)
            throw new Error(
              'Error in <Text/> Component. Supplied text variant which needs color prop, but no color prop has been found.'
            )
          else predefinedVariant = (textVariants[variant] as Function)(color)
        else predefinedVariant = textVariants[variant]
      }
  }

  const eliminateRedundantWhitespaces = (s: string) =>
    s.replace(/^\s+|\s+$/g, '')

  let styles: string = `${color} ${weight} ${size} ${classes} ${
    heading ? headingWithBorderStyles : ''
  } ${align} transition`

  let computedClasses: string = predefinedVariant
    ? eliminateRedundantWhitespaces(
        `${predefinedVariant} ${classes} ${align} transition`
      )
    : eliminateRedundantWhitespaces(styles)

  let output = <p className={computedClasses}>{children}</p>

  if (link)
    output = (
      <Link href={href || '#'}>
        <a target={target || ''} className={computedClasses}>
          {children}
        </a>
      </Link>
    )

  return output
}
