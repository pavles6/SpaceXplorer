import { Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { ReactElement, useEffect } from 'react'

interface Props {
  imageUrl: string
  launchName: string
  close: Function
  show: boolean
}

export const LaunchGalleryModal = ({
  imageUrl,
  close,
  show,
  launchName,
}: Props): ReactElement => {
  useEffect(() => {
    if (window && show) {
      document.body.style.overflow = 'hidden'
    } else document.body.style.overflow = 'auto'
  }, [show])

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="w-screen h-screen fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75"
        onClick={() => close()}
      >
        <Transition.Child
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex h-screen flex-row items-center justify-center">
            <Image
              layout="fill"
              objectFit="contain"
              src={imageUrl}
              alt={launchName}
              className="p-6 max-w-screen max-h-screen"
            />
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}
