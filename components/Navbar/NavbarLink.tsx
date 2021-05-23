import React from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../constants/global/theme'
import Link from 'next/link'

interface NavbarLinkProps {
  children: string
  active: boolean
  path: string
}

export default function NavbarLink(props: NavbarLinkProps) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  return (
    <Link href={props.path}>
      <a
        className={`flex items-center justify-center ${
          props.active ? theme.mainText : theme.textAccent
        } hover:${props.active ? null : theme.text} transition duration-150`}
      >
        <p
          className={`font-semibold uppercase ${
            !props.active ? 'cursor-pointer' : null
          }`}
        >
          {props.children}
        </p>
      </a>
    </Link>
  )
}
