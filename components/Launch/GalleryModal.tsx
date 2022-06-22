import { Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { ReactElement, useEffect } from 'react'
import { LaunchImage } from '../../lib/types/api'

interface Props {
  image: LaunchImage
  launchName: string
  close: Function
  show: boolean
}

export const LaunchGalleryModal = ({
  image,
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
        className="w-full h-full fixed inset-0 z-50 overflow-auto bg-black bg-opacity-90 py-8 md:px-8"
        onClick={() => close()}
      >
        <Transition.Child
          className="w-full h-full"
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex h-full relative flex-row items-center justify-center w-full">
            <Image
              layout="fill"
              width={image.imageData.width}
              height={image.imageData.height}
              objectFit="contain"
              src={image.imageData.src}
              placeholder="blur"
              blurDataURL={image.placeholder}
              alt={launchName}
            />
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}
