import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { LaunchGalleryModal } from './GalleryModal'
import Image from 'next/image'
import { LaunchImage } from '../../lib/types/api'

interface Props {
  images: LaunchImage[]
  name: string
}

export const LaunchGallerySection = ({ images, name }: Props) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)

  const [imageIndex, setImageIndex] = useState<number>(0)

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <>
      <div className="flex w-full max-w-screen-xl h-full mt-8 flex-col px-4 pb-12">
        <Text
          variant="articleHeading1"
          classes="mb-6"
          color="theme"
          textAlign="text-center"
        >
          Gallery
        </Text>
        <div className="flex w-full h-full flex-row items-center">
          <div className="w-full rounded-lg lg:rounded-xl cursor-zoom-in relative z-30 h-galleryImageXs sm:h-galleryImageSm md:h-galleryImageMd lg:h-galleryImage transition">
            <Image
              quality={50}
              id="image_preview"
              objectPosition="center"
              objectFit="cover"
              className="rounded-lg lg:rounded-xl"
              onLoad={() => setIsImageLoaded(true)}
              onClick={(e) => {
                const target = document.getElementById('image_preview')

                if (e.target === target) setGalleryModalOpen(true)
              }}
              layout="fill"
              src={images[imageIndex].imageData.src}
              placeholder="blur"
              blurDataURL={images[imageIndex].placeholder}
              alt={name}
            />
            <div>
              {isImageLoaded ? (
                <>
                  <Button
                    iconColor="text-white"
                    classes="absolute  top-1/2 left-0"
                    iconClasses="w-8 h-8 md:w-12 md:h-12"
                    click={() => {
                      if (imageIndex === 0) setImageIndex(images.length - 1)
                      else setImageIndex(imageIndex - 1)
                      setIsImageLoaded(false)
                    }}
                    icon={ChevronLeftIcon}
                  />
                  <Button
                    iconColor="text-white"
                    classes="absolute  top-1/2 right-0"
                    iconClasses="w-8 h-8 md:w-12 md:h-12"
                    icon={ChevronRightIcon}
                    click={() => {
                      if (imageIndex === images.length - 1) setImageIndex(0)
                      else setImageIndex(imageIndex + 1)
                      setIsImageLoaded(false)
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full mt-2 flex items-center justify-center">
          <Text
            variant="subtitle1"
            color="theme"
            classes="self-center justify-self-center"
          >{`${imageIndex + 1}/${images.length}`}</Text>
        </div>
      </div>
      <LaunchGalleryModal
        show={galleryModalOpen}
        launchName={name}
        close={() => setGalleryModalOpen(false)}
        image={images[imageIndex]}
      />
    </>
  )
}
