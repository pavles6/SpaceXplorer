import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from '../../constants/global/theme'
import { useRouter } from 'next/router'
import {
  TOGGLE_DARK_THEME,
  TOGGLE_LIGHT_THEME,
} from '../../constants/redux/actionTypes'
import Text from '../Text'
import { IfcNavbarLink } from './IfcNavbarLink'
import NavbarLink from './NavbarLink'
import { navbarBackgroundColor } from '../../constants/other'

interface ReduxState {
  theme: {
    themeType: string
    themeData: Theme
  }
}

interface Props {
  backgroundColor?: string
  shadow: boolean
}

export default function Navbar({
  backgroundColor = navbarBackgroundColor,
}: Props) {
  const router = useRouter()
  const themeData = useSelector((state: ReduxState) => state.theme.themeData)
  const dispatch = useDispatch()
  const themeType = useSelector((state: ReduxState) => state.theme.themeType)

  const [navbarLinks, setNavbarLinks] = useState<IfcNavbarLink[]>([
    {
      path: '/',
      title: 'Home',
      active: false,
    },
    {
      path: '/launches',
      title: 'Launches',
      active: false,
    },
    {
      path: '/ships',
      title: 'Ships',
      active: false,
    },
    {
      path: '/starlink',
      title: 'Starlink',
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
      className={`w-full ${backgroundColor} transition delay-150 h-16 fixed  flex justify-between items-center flex-row`}
    >
      {/* Navbar Title */}
      <Text
        size="text-4xl"
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
        <button
          className="focus:outline-none"
          onClick={() =>
            dispatch({
              type:
                themeType === 'dark' ? TOGGLE_LIGHT_THEME : TOGGLE_DARK_THEME,
              payload: window,
            })
          }
        >
          <span className="transition material-icons text-3xl text-white">
            {themeType == 'dark' ? 'brightness_4' : 'brightness_high'}
          </span>
        </button>
        <button className="focus:outline-none text-white">
          <span className=" material-icons text-3xl">more_horiz</span>
        </button>
      </div>
    </div>
  )
}
