import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../lib/types/theme'
import { useRouter } from 'next/router'
import Text from '../Text/Text'
import { INavbarLink } from './INavbarLink'
import NavbarLink from './NavbarLink'
import { TextSize } from '../Text/ETextSize'
import Button from '../Button/Button'
import { MenuAlt3Icon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Transition } from '@headlessui/react'

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
        } top-0 right-0 flex justify-between items-center z-40 flex-row`}
      >
        {/* Navbar Title */}
        <Text
          link
          href="/"
          size={TextSize.Xl3}
          weight="font-bold"
          classes={`ml-2 hover:${theme.mainText} active:${theme.mainText}`}
          color={theme.textAccent}
        >
          SpaceXplorer
        </Text>

        <div className="hidden lg:flex flex-1 mr-6 flex-row items-center h-10 justify-end space-x-5">
          {navbarLinks.map((link) => {
            return (
              <NavbarLink
                path={link.path}
                key={link.title}
                active={link.active}
              >
                {link.title}
              </NavbarLink>
            )
          })}
          <button className="focus:outline-none text-white">
            <span className=" material-icons text-3xl">more_horiz</span>
          </button>
        </div>
        <Button
          icon={MenuIcon}
          classes="mr-2 lg:hidden"
          click={() => {
            setMenuOpened(true)
          }}
        />
      </nav>
      <Transition
        show={menuOpened}
        enter="transition-opacity ease-in duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          onClick={() => setMenuOpened(false)}
          className="h-full flex justify-end top-0 lg:hidden fixed z-40 w-screen bg-black bg-opacity-60"
        >
          <Transition.Child
            enter="transition ease-in-out duration-150 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-150 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              className={`h-full w-96 relative z-50 flex flex-col items-center ${theme.surface}`}
            >
              <div className="h-16 w-full flex justify-end items-center">
                <Button
                  icon={XIcon}
                  classes="mr-2"
                  click={() => {
                    setMenuOpened(false)
                  }}
                />
              </div>
              {navbarLinks.map((link: INavbarLink) => {
                return (
                  <div className="m-6" key={link.title}>
                    <NavbarLink path={link.path} active={link.active}>
                      {link.title}
                    </NavbarLink>
                  </div>
                )
              })}
              <div className="w-11/12 border-t-2 border-white border-opacity-10"></div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  )
}
