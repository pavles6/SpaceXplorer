import Link from 'next/link'
import React from 'react'
import { TextSize } from './ETextSize'

interface TextProps {
  color?: string
  size?: TextSize
  weight?: string
  classes?: string
  link?: boolean
  href?: string
  children?: React.ReactNode | React.ReactNodeArray
}

export default function Text(props: TextProps) {
  if (props.link) {
    return (
      <Link href={props.href}>
        <a
          className={`${props.color} ${props.weight} ${props.size} ${props.classes}  transition delay-300`}
        >
          {props.children}
        </a>
      </Link>
    )
  }
  return (
    <div
      className={`${props.color} ${props.weight} ${props.size} ${props.classes}  transition delay-300`}
    >
      {props.children}
    </div>
  )
}
