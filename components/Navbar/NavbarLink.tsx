import React from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../constants/global/theme'
import Link from 'next/link'

interface NavbarLinkProps {
  children: string
  active: boolean
  path: string
}

interface ReduxState {
  theme: {
    themeType: string
    themeData: Theme
  }
}

export default function NavbarLink(props: NavbarLinkProps) {
  const themeData = useSelector((state: ReduxState) => state.theme.themeData)

  return (
    <Link href={props.path}>
      <a
        className={` flex items-center  justify-center ${
          props.active ? 'text-red-500' : 'text-gray-200'
        }`}
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
