export type TextWeight =
  | 'font-thin'
  | 'font-extralight'
  | 'font-light'
  | 'font-normal'
  | 'font-medium'
  | 'font-semibold'
  | 'font-bold'
  | 'font-extrabold'
  | 'font-black'

export type TextSize =
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
  | 'text-8xl'
  | 'text-9xl'

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title1'
  | 'title2'
  | 'subtitle1'
  | 'subtitle2'
  | 'small1'
  | 'small2'
  | 'articleHeading1'
  | 'articleHeading2'
  | 'articleHeading3'

export type TextColor =
  | 'text'
  | 'textAccent'
  | 'mainText'
  | 'mainTextAccent'
  | 'textSecondary'

export type TextDecoration = 'underline' | 'line-through' | 'no-underline'

export type TwClass = string

export interface TextVariantMapping<T = string> {
  h1: T
  h2: T
  h3: T
  h4: T
  title1: T
  title2: T
  subtitle1: T
  subtitle2: T
  small1: T
  small2: T
  articleHeading1: T
  articleHeading2: T
  articleHeading3: T
}

export interface TextProps {
  /** Pre-defined variants for commonly used text styles, inspired by Material-UI Typography component */
  variant?: TextVariant
  /**Tailwindcss color class */
  color?: TextColor
  /**Fixed text size, can affect UI on different screen sizes*/
  size?: TextSize
  /**Tailwindcss font weight class */
  weight?: TextWeight
  /**Additional optional styles */
  classes?: TwClass
  /**If true, text will be rendered as an link, using Next.js <Link/> component */
  link?: boolean
  /**Adds an bottom border under the text, if passed as true */
  divider?: boolean
  /**Url for link, only if `link` prop is true */
  href?: string
  /**Text alignment */
  align?: 'text-left' | 'text-center' | 'text-right' | 'text-justify'
  /**Supplied when `link` prop is `true` */
  target?: string
  decoration?: TextDecoration
  children?: React.ReactNode | React.ReactNodeArray
  id?: string
}
