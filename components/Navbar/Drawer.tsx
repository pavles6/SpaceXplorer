import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
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
      enter="transition-opacity ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        onClick={(e) => {
          const element = document.getElementById('drawer_backdrop')
          if (e.target !== element) return
          closeMenu()
        }}
        id="drawer_backdrop"
        className="h-full w-screen top-0 lg:hidden fixed z-40 bg-black bg-opacity-60"
      >
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          as={Fragment}
        >
          <div
            className={`h-screen w-2/3 max-w-lg relative z-50 flex flex-col items-center ${theme.base.surface}`}
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
                buttonClasses="mr-2 transition"
                click={() => {
                  closeMenu(false)
                }}
              />
            </div>
            <div className="px-4 w-full">
              {navLinks.map((link: INavItem) => {
                return (
                  <div
                    className={`py-4 pl-2 ${
                      !link.active ? 'hover:bg-white' : ''
                    } transition rounded-lg hover:bg-opacity-10`}
                    key={link.title}
                  >
                    pisha
                  </div>
                )
              })}
              <div className="border-t-2 mt-4 border-white border-opacity-10" />
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}
