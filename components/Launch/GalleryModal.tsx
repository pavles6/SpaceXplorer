import { Transition } from '@headlessui/react'
import React, { ReactElement, useEffect, useState } from 'react'

interface Props {
  imageUrl: string
  launchName: string
  close: Function
  show: boolean
}

function GalleryModal({
  imageUrl,
  close,
  show,
  launchName,
}: Props): ReactElement {
  useEffect(() => {
    if (window && show) {
      document.body.style.overflow = 'hidden'
    } else document.body.style.overflow = 'auto'
  }, [show])

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-350"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-350"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="w-screen h-screen fixed inset-0 z-50 overflow-auto bg-black bg-opacity-90"
        onClick={() => close()}
      >
        <Transition
          show={show}
          enter="transition-opacity duration-350"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-350"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex h-screen flex-row items-center justify-center">
            <img
              src={imageUrl}
              alt={launchName}
              className="object-contain p-6 max-w-screen max-h-screen"
            />
          </div>
        </Transition>
      </div>
    </Transition>
  )
}

export default GalleryModal
