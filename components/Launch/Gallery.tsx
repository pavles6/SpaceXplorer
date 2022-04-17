import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { LaunchGalleryModal } from './GalleryModal'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'

interface Props {
  images: string[]
  name: string
}

export const LaunchGallerySection = ({ images, name }: Props) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)

  const isMobile = useMediaQuery({ maxWidth: 767 })

  const [imageIndex, setImageIndex] = useState<number>(0)

  return (
    <>
      <div className="flex w-full max-w-screen-xl h-full mt-8 flex-col px-4">
        <Text
          variant="articleHeading1"
          classes="mb-6"
          color="theme"
          textAlign="text-center"
        >
          Gallery
        </Text>
        <div className="flex w-full h-full flex-row items-center">
          <div className="w-full rounded-lg lg:rounded-xl cursor-zoom-in relative z-30 h-galleryImageXs sm:h-galleryImageSm md:h-galleryImageMd lg:h-galleryImage shadow-lg transition">
            <Image
              quality={50}
              id="image_preview"
              objectPosition="center"
              objectFit="cover"
              className="rounded-lg lg:rounded-xl"
              onClick={(e) => {
                const target = document.getElementById('image_preview')

                if (e.target === target) setGalleryModalOpen(true)
              }}
              layout="fill"
              src={images[imageIndex]}
              alt={name}
            />
            <div>
              <Button
                iconColor="text-white"
                classes="absolute z-40 top-1/2 left-0"
                iconClasses="w-8 h-8 md:w-12 md:h-12"
                click={() => {
                  if (imageIndex === 0) setImageIndex(images.length - 1)
                  else setImageIndex(imageIndex - 1)
                }}
                icon={ChevronLeftIcon}
              />
              <Button
                iconColor="text-white"
                classes="absolute z-40 top-1/2 right-0"
                iconClasses="w-8 h-8 md:w-12 md:h-12"
                icon={ChevronRightIcon}
                click={() => {
                  if (imageIndex === images.length - 1) setImageIndex(0)
                  else setImageIndex(imageIndex + 1)
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-2 flex items-center justify-center">
          <Text
            variant="subtitle1"
            color="theme"
            classes="self-center justify-self-center"
          >{`${imageIndex + 1}/${images.length}`}</Text>
          <div />
        </div>
      </div>
      <LaunchGalleryModal
        show={galleryModalOpen}
        launchName={name}
        close={() => setGalleryModalOpen(false)}
        imageUrl={images[imageIndex]}
      />
    </>
  )
}
