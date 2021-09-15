import { Switch, Transition } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { Palette } from '../../lib/types/theme'

interface Props {
  themeType: string
  setTheme: Function
  theme: Palette
}

export const ThemeSwitch = ({ themeType, setTheme, theme }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-full flex lg:justify-center justify-end  items-center lg:flex-grow-0 flex-grow ml-4 mr-2">
      <Switch
        checked={themeType != 'light'}
        onChange={() => setTheme(themeType === 'light' ? 'dark' : 'light')}
        className={`${
          themeType !== 'light'
            ? theme.base['light:surface']
            : theme.base['dark:surface']
        } relative inline-flex items-center h-8 rounded-full w-14 focus:outline-none`}
      >
        <span
          className={`${
            themeType != 'light' ? 'translate-x-7' : 'translate-x-1'
          } inline-block transform transition rounded-full`}
        >
          <Transition
            show
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {themeType != 'light' ? (
              <MoonIcon className="text-black h-6 w-6" />
            ) : (
              <SunIcon className="text-white h-6 w-6" />
            )}
          </Transition>
        </span>
      </Switch>
    </div>
  )
}
