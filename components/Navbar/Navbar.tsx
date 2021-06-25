import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import { useRouter } from 'next/router'
import Text from '../Text/Text'
import { INavbarLink } from './INavbarLink'
import NavbarLink from './NavbarLink'
import Button from '../Button/Button'
import { DotsVerticalIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Transition } from '@headlessui/react'
import { Drawer } from './Drawer'

interface Props {
  backgroundColor?: string
  isShadow?: boolean
}

export default function Navbar({ backgroundColor, isShadow = true }: Props) {
  const router = useRouter()

  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [menuOpened, setMenuOpened] = useState(false)

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
      path: '/capsules',
      title: 'capsules',
      active: false,
    },
  ])

  // setting an active link
  useEffect(() => {
    const links = [...navbarLinks]

    links.map((link, i) =>
      router.asPath === link.path ? (links[i].active = true) : null
    )

    setNavbarLinks(links)
  }, [])

  useEffect(() => {
    if (window && menuOpened) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [menuOpened])

  return (
    <>
      <nav
        className={`w-full ${shadow} ${backgroundColor} transition h-16 ${
          router.pathname == '/' ? 'fixed' : 'sticky'
        } top-0 right-0 flex lg:justify-between items-center z-40 flex-row`}
      >
        <Button
          icon={MenuIcon}
          buttonClasses="mx-2 lg:hidden transition"
          click={() => {
            setMenuOpened(true)
          }}
        />
        <Text
          link
          href="/"
          size="text-2xl"
          weight="font-bold"
          classes={`lg:ml-2 hover:${theme.mainText} active:${theme.mainText} lg:text-4xl`}
          color="textAccent"
        >
          SpaceXplorer
        </Text>

        <div className="hidden lg:flex flex-1 flex-row items-center h-10 justify-end space-x-5">
          {navbarLinks.map((link) => {
            return (
              <NavbarLink
                align="center"
                path={link.path}
                key={link.title}
                active={link.active}
              >
                {link.title}
              </NavbarLink>
            )
          })}
        </div>
        <div className="h-full flex lg:justify-center justify-end items-center lg:flex-grow-0 flex-grow ml-4 mr-2">
          <Button
            click={() => {}}
            iconClasses="w-8 h-8"
            icon={DotsVerticalIcon}
          />
        </div>
      </nav>
      <Drawer
        closeMenu={() => setMenuOpened(false)}
        navLinks={navbarLinks}
        open={menuOpened}
      />
    </>
  )
}
