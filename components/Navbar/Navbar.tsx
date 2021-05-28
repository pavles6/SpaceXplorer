import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import { useRouter } from 'next/router'
import Text from '../Text/Text'
import { INavbarLink } from './INavbarLink'
import NavbarLink from './NavbarLink'
import { TextSize } from '../Text/ETextSize'

interface Props {
  backgroundColor?: string
  isShadow?: boolean
}

export default function Navbar({ backgroundColor, isShadow = true }: Props) {
  const router = useRouter()
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  let shadow = 'shadow-md'
  if (!isShadow) shadow = 'no-shadow'

  if (!backgroundColor) backgroundColor = theme.surface

  const [navbarLinks, setNavbarLinks] = useState<INavbarLink[]>([
    {
      path: '/',
      title: 'home',
      active: false,
    },
    {
      path: '/launches',
      title: 'launches',
      active: false,
    },
    {
      path: '/rockets',
      title: 'Rockets',
      active: false,
    },
    {
      path: '/dragon',
      title: 'dragon',
      active: false,
    },
  ])

  useEffect(() => {
    // setting an active link
    const links = [...navbarLinks]

    links.map((link, i) =>
      router.asPath === link.path ? (links[i].active = true) : null
    )

    setNavbarLinks(links)
  }, [])

  return (
    <div
      className={`w-full ${shadow} ${backgroundColor} transition delay-150 h-16 fixed  flex justify-between items-center z-50 flex-row`}
    >
      {/* Navbar Title */}
      <Text
        size={TextSize.Xl4}
        weight="font-bold"
        classes="ml-5"
        color="text-white"
      >
        Astronaut
      </Text>

      <div className="flex flex-1 mr-6 flex-row items-center h-10 justify-end space-x-5">
        {navbarLinks.map((link) => {
          return (
            <NavbarLink path={link.path} key={link.title} active={link.active}>
              {link.title}
            </NavbarLink>
          )
        })}

        <button className="focus:outline-none text-white">
          <span className=" material-icons text-3xl">more_horiz</span>
        </button>
      </div>
    </div>
  )
}
