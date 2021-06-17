import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode | React.ReactNodeArray
  url: string
  link: boolean
}

export default function ConditionalLink({ children, url, link }: Props) {
  if (link)
    return (
      <Link href={url}>
        <a target="__blank">{children}</a>
      </Link>
    )
  else return <>{children}</>
}
