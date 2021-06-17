import { useSelector } from 'react-redux'
import { State } from '../../lib/types/redux'
import { Disclosure, Transition } from '@headlessui/react'
import { TextSize } from '../Text/ETextSize'
import { ChevronDownIcon } from '@heroicons/react/outline'

interface ExpandableProps {
  title: string
  children: React.ReactNode | React.ReactNodeArray
}

export const Expandable = ({ title, children }: ExpandableProps) => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className="w-full h-full">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex ${TextSize.Lg} font-semibold ${theme.text} flex items-center justify-between space-x-4 focus:outline-none w-full ${theme.surface} rounded-xl p-4`}
            >
              {title}
              <ChevronDownIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 ${
                  open ? theme.mainText : theme.text
                } mx-2 transition duration-300`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-150 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <Disclosure.Panel
                as="ul"
                className="p-4 space-y-2 transition duration-300 w-full flex flex-wrap  flex-col"
              >
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}
