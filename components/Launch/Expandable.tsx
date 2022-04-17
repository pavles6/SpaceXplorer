import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Text from '../Text/Text'

interface ExpandableProps {
  title: string
  children: React.ReactNode | React.ReactNodeArray
}

export const Expandable = ({ title, children }: ExpandableProps) => {
  return (
    <div className="w-full h-full">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex items-center justify-between space-x-4 focus:outline-none w-full bg-lightSecondary dark:bg-darkSecondary rounded-xl p-4`}
            >
              <Text variant="title1" color="theme">
                {title}
              </Text>
              <ChevronDownIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 ${
                  open
                    ? 'text-main dark:text-main'
                    : 'text-dark dark:text-light'
                } mx-2 transition duration-300`}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-150 ease-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel
                static
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
