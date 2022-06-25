import { Switch, Transition } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'

interface Props {
  resolvedTheme: string
  setTheme: Function
}

export const ThemeSwitch = ({ resolvedTheme, setTheme }: Props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-full flex lg:justify-center justify-end items-center lg:flex-grow-0 flex-grow ml-4 mr-2">
      <Switch
        aria-label="toggle website theme"
        checked={resolvedTheme != 'light'}
        onChange={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        className={`${
          resolvedTheme === 'dark' ? 'bg-light' : 'bg-darkSecondary'
        } relative inline-flex items-center h-8 rounded-full w-14 focus:outline-none border border-white/10 dark:border-black/10`}
      >
        <span
          className={`${
            resolvedTheme != 'light' ? 'translate-x-7' : 'translate-x-1'
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
            {resolvedTheme != 'light' ? (
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
