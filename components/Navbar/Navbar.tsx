import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Text from '../Text/Text'
import { INavItem, navItems } from './NavItems'
import Button from '../Button/Button'
import { MenuIcon } from '@heroicons/react/outline'
import { Drawer } from './Drawer'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ThemeSwitch } from './ThemeSwitch'

interface Props {
  backgroundColor?: string
  isShadow?: boolean
}

export default function Navbar({ backgroundColor, isShadow = true }: Props) {
  const router = useRouter()

  const { theme: themeType, setTheme, systemTheme } = useTheme()

  const resolvedTheme = themeType === 'system' ? systemTheme : themeType

  const [menuOpened, setMenuOpened] = useState(false)

  const [mounted, setMounted] = useState(false)

  let shadow = 'shadow-md'
  if (!isShadow) shadow = 'no-shadow'

  if (!backgroundColor) backgroundColor = 'bg-black'

  const [navbarLinks, setNavbarLinks] = useState<INavItem[]>([...navItems])

  function checkForActiveLinks() {
    const links = [...navbarLinks]

    links.map((link, i) =>
      link.path.split('?')[0] === router.route
        ? (links[i].active = true)
        : (links[i].active = false)
    )

    setNavbarLinks([...links])
  }

  useEffect(() => {
    setMounted(true)
    checkForActiveLinks()
  }, [])

  useEffect(() => {
    if (window && menuOpened) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [menuOpened])

  return (
    <>
      <nav
        className={`w-full ${shadow} ${backgroundColor} transition h-16 fixed top-0 right-0 flex lg:justify-between items-center z-40 flex-row`}
      >
        <Button
          icon={MenuIcon}
          iconColor="text-light"
          classes="mx-2 lg:hidden transition"
          click={() => {
            setMenuOpened(true)
          }}
        />
        <Text
          link
          href="/"
          fixedSize="text-2xl"
          weight="font-semibold"
          classes="lg:ml-4 lg:text-3xl"
          color="lightSecondary"
        >
          SpaceXplorer
        </Text>

        <div className="hidden lg:flex flex-1 flex-row items-center h-10 justify-end space-x-5">
          {mounted
            ? navbarLinks.map(({ active, path, title, target = '_self' }) => {
                return (
                  <Link key={title} href={path}>
                    <a
                      target={target}
                      className={`flex items-center justify-center  transition duration-150 ${
                        active ? 'pointer-events-none cursor-default' : ''
                      }`}
                    >
                      <Text
                        weight="font-semibold"
                        color={active ? 'main' : 'light'}
                      >
                        {title}
                      </Text>
                    </a>
                  </Link>
                )
              })
            : null}
        </div>
        <ThemeSwitch resolvedTheme={resolvedTheme} setTheme={setTheme} />
      </nav>
      <Drawer
        closeMenu={() => setMenuOpened(false)}
        navLinks={navbarLinks}
        open={menuOpened}
      />
    </>
  )
}
