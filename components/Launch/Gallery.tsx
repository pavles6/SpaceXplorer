import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import GalleryModal from './GalleryModal'
import Image from 'next/image'

interface Props {
  images: string[]
  name: string
}

export const GallerySection = ({ images, name }: Props) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)

  const [imageIndex, setImageIndex] = useState<number>(0)

  return (
    <>
      <div className="flex w-full max-w-screen-xl h-full space-y-8 mt-12 flex-col">
        <Text variant="articleHeading1" color="textAccent" align="text-center">
          Gallery
        </Text>
        <div className="flex w-full h-full flex-row items-center">
          <div className="w-full cursor-zoom-in relative z-30 h-galleryImageXs sm:h-galleryImageSm md:h-galleryImageMd lg:h-galleryImage shadow-lg transition">
            <Image
              id="image_preview"
              objectPosition="center"
              objectFit="cover"
              className="xl:rounded-xl"
              onClick={(e) => {
                const target = document.getElementById('image_preview')

                if (e.target === target) setGalleryModalOpen(true)
              }}
              layout="fill"
              src={images[imageIndex]}
              alt={name}
            />
            <Button
              buttonClasses="absolute z-40 top-1/2 left-0"
              iconClasses="w-12 h-12"
              click={() => {
                if (imageIndex === 0) setImageIndex(images.length - 1)
                else setImageIndex(imageIndex - 1)
              }}
              icon={ChevronLeftIcon}
            />
            <Button
              buttonClasses="absolute z-40 top-1/2 right-0"
              iconClasses="w-12 h-12"
              icon={ChevronRightIcon}
              click={() => {
                if (imageIndex === images.length - 1) setImageIndex(0)
                else setImageIndex(imageIndex + 1)
              }}
            />
          </div>
        </div>
      </div>
      <GalleryModal
        show={galleryModalOpen}
        launchName={name}
        close={() => setGalleryModalOpen(false)}
        imageUrl={images[imageIndex]}
      />
    </>
  )
}