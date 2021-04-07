import React from 'react'

interface TextProps {
  color?: string
  size?: string
  weight?: string
  classes?: string
  children?: React.ReactNode | React.ReactNodeArray
}

export default function Text(props: TextProps) {
  return (
    <div
      className={`${props.color} ${props.weight} ${props.size} ${props.classes}  transition delay-300`}
    >
      {props.children}
    </div>
  )
}
