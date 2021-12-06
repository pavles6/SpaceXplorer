import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'
import { getRecentLaunches, getNextLaunch } from '../lib/api/api-calls'
import { Launch } from '../lib/types/api'
import Image from 'next/image'
import { usePalette } from '../lib/palette/store'

interface Props {
  nextLaunchData: Launch
  recentLaunchesData: Launch[]
}

export default function HomePage({
  nextLaunchData,
  recentLaunchesData,
}: Props) {
  const theme = usePalette()

  const [navbarColor, setNavbarColor] = useState('bg-transparent')

  const [navbarShadow, setNavbarShadow] = useState(false)

  function handleScroll() {
    const landingImageContainer = document.getElementById(
      'landing_image_container'
    )
    if (landingImageContainer)
      if (window.scrollY >= landingImageContainer.clientHeight / 3) {
        setNavbarColor(theme.base['dark:surface'])
        setNavbarShadow(true)
      } else {
        setNavbarColor('bg-transparent')
        setNavbarShadow(false)
      }
  }

  // cdup
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // cwu
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <>
      <Head>
        <title>SpaceXplorer</title>
      </Head>

      {/* Header */}
      <Navbar isShadow={navbarShadow} backgroundColor={navbarColor} />

      <div className="w-full">
        <div
          id="landing_image_container"
          className="flex items-center justify-center w-full lg:h-pageHeader md:h-pageHeaderMd sm:h-pageHeaderSm h-pageHeaderXs relative"
        >
          <Image
            quality={100}
            src="/img/landing-header.jpg"
            layout="fill"
            objectFit="cover"
          />
          <div className="w-full h-full bg-landing-image-gradient absolute z-20" />
          <div className="absolute z-30 w-11/12 md:w-full flex flex-col justify-center">
            <Text variant="h1" color="dark:textAccent" align="text-center">
              SpaceXplorer: The SpaceX launch explorer
            </Text>
            <Text
              classes="hidden md:block text-base text-white sm:text-lg xl:text-xl"
              weight="font-semibold"
              align="text-center"
            >
              Explore each SpaceX launch, and discover their details
            </Text>
            <Text
              link
              href="https://github.com/r-spacex/SpaceX-API"
              variant="subtitle1"
              decoration="underline"
              color="dark:textAccent"
              weight="font-semibold"
              align="text-center"
            >
              Powered by an awesome r/SpaceX-API
            </Text>
          </div>
        </div>
      </div>
      <div
        className={`transition flex flex-col items-center h-full ${theme.base.surfaceBackground}  `}
      >
        <LaunchesPreview
          recentLaunches={recentLaunchesData}
          nextLaunch={nextLaunchData}
        />

        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const nextLaunchData = await getNextLaunch()
  const recentLaunchesData = await getRecentLaunches()

  return {
    props: {
      nextLaunchData,
      recentLaunchesData,
    },
  }
}
