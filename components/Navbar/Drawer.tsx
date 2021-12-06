import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { usePalette } from '../../lib/palette/store'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { INavItem, navItems } from './NavItems'

interface Props {
  closeMenu: Function
  open: boolean
  navLinks: INavItem[]
}

export const Drawer = ({ closeMenu, open, navLinks }: Props) => {
  const theme = usePalette()

  return (
    <Transition
      show={open}
      enter="transition ease duration-600 transform"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease duration-600 transform"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as="div"
      onClick={(e) => {
        const element = document.getElementById('drawer_backdrop')
        if (e.target !== element) return
        closeMenu()
      }}
      id="drawer_backdrop"
      className="h-full w-screen  lg:hidden fixed z-40 bg-black bg-opacity-60"
    >
      <Transition.Child
        enter="transition ease duration-600 transform"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease duration-600 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full"
        as="div"
        className={`h-screen w-2/3 max-w-lg relative z-50 flex flex-col items-center ${theme.base.surfaceBackground}`}
      >
        <div className="h-16 w-full flex justify-between items-center">
          <Text
            size="text-2xl"
            weight="font-bold"
            classes="ml-2"
            color="textAccent"
          >
            SpaceXplorer
          </Text>
          <Button
            icon={XIcon}
            classes="mr-2 transition"
            click={() => {
              closeMenu(false)
            }}
          />
        </div>
        <div className={`px-4 w-full flex flex-col`}>
          {navLinks.map((link: INavItem) => {
            return (
              <Text
                link
                variant="subtitle1"
                color="textAccent"
                href={link.path}
                classes={`py-4 my-2 pl-2 transition rounded-lg ${
                  !link.active
                    ? theme.hover.surface
                    : `cursor-default pointer-events-none ${theme.base.surface}`
                } `}
                key={link.title}
              >
                {link.title}
              </Text>
            )
          })}
          <div className="border-t-2 mt-4 border-white border-opacity-10" />
        </div>
      </Transition.Child>
    </Transition>
  )
}
