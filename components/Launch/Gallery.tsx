import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import GalleryModal from './GalleryModal'

interface Props {
  images: string[]
  name: string
}

export const GallerySection = ({ images, name }: Props) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)

  const [imageIndex, setImageIndex] = useState<number>(0)

  return (
    <>
      <div className="flex w-full max-w-screen-2xl h-full space-y-8 mt-12 flex-col">
        <Text variant="h2" align="text-center">
          Gallery
        </Text>
        <div className="flex w-full h-full flex-row items-center">
          <Button
            iconClasses="w-10 h-10"
            click={() => {
              if (imageIndex === 0) setImageIndex(images.length - 1)
              else setImageIndex(imageIndex - 1)
            }}
            icon={ChevronLeftIcon}
          />
          <div
            className="w-full cursor-pointer h-carouselImageXs sm:h-carouselImageSm md:carouselImageMd lg:h-carouselImage bg-cover bg-center rounded-xl shadow-lg transition transform hover:-translate-y-1"
            onClick={() => setGalleryModalOpen(true)}
            style={{
              backgroundImage: `url('${images[imageIndex]}')`,
            }}
          />
          <Button
            iconClasses="w-10 h-10"
            icon={ChevronRightIcon}
            click={() => {
              if (imageIndex === images.length - 1) setImageIndex(0)
              else setImageIndex(imageIndex + 1)
            }}
          />
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
