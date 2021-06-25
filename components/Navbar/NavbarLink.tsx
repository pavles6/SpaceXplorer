import React from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import Link from 'next/link'

interface NavbarLinkProps {
  children: string
  active: boolean
  path: string
  align: 'start' | 'center' | 'end'
}

export default function NavbarLink({
  children,
  active,
  align,
  path,
}: NavbarLinkProps) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  return (
    <Link href={path}>
      <a
        className={`flex items-center justify-${align} ${
          active ? theme.mainText : theme.textAccent
        } hover:${active ? null : theme.text} ${
          active ? 'pointer-events-none' : ''
        } transition duration-150`}
      >
        <p
          className={`font-semibold uppercase ${
            !active ? 'cursor-pointer' : null
          }`}
        >
          {children}
        </p>
      </a>
    </Link>
  )
}
