import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import DragonsPreview from '../components/Home/DragonsPreview'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import RocketsPreview from '../components/Home/RocketsPreview'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'
import { landingImageHeight } from '../lib/constants/other'
import {
  getDragonsPreview,
  getRecentLaunches,
  getNextLaunch,
  getRocketsPreview,
} from '../lib/api-calls'
import { Dragon, Launch, Rocket } from '../lib/types/api'
import { Theme } from '../lib/types/theme'
import Image from 'next/image'

interface Props {
  nextLaunchData: Launch
  recentLaunchesData: Launch[]
  rocketsPreviewData: Rocket[]
  dragonsPreviewData: Dragon[]
}

export default function Home({
  nextLaunchData,
  recentLaunchesData,
  rocketsPreviewData,
  dragonsPreviewData,
}: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [navbarColor, setNavbarColor] = useState('bg-transparent')

  const [navbarShadow, setNavbarShadow] = useState(false)

  function handleScroll() {
    const landingImageContainer = document.getElementById(
      'landing_image_container'
    )
    if (landingImageContainer)
      if (window.scrollY >= landingImageContainer.clientHeight / 3) {
        setNavbarColor(theme.surface)
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
          className="flex items-center justify-center w-full lg:h-landing md:h-landingMd sm:h-landingSm h-landingXs relative"
        >
          <Image
            quality={100}
            src="/img/landing-bg.jpg"
            layout="fill"
            objectFit="cover"
          />
          <div className="w-full h-full bg-landing-image-gradient absolute z-20" />
          <div className="absolute z-30 w-11/12 md:w-full flex flex-col justify-center">
            <Text variant="h1" color="mainText" align="text-center">
              SpaceXplorer: The SpaceX data hub
            </Text>
            <Text
              classes="text-base sm:text-lg xl:text-xl"
              weight="font-semibold"
              color="textAccent"
              align="text-center"
            >
              Explore SpaceX launches, rockets and its other projects
            </Text>
            <Text
              link
              href="https://github.com/r-spacex/SpaceX-API"
              variant="subtitle1"
              decoration="underline"
              color="textAccent"
              weight="font-semibold"
              align="text-center"
            >
              Powered by an awesome SpaceX-API
            </Text>
          </div>
        </div>
      </div>
      <div
        className={`transition flex flex-col items-center h-full delay-300 ${theme.surfaceBackground}  `}
      >
        <LaunchesPreview
          recentLaunches={recentLaunchesData}
          nextLaunch={nextLaunchData}
        />
        <RocketsPreview rocketsPreview={rocketsPreviewData} />
        <DragonsPreview dragonsPreview={dragonsPreviewData} />

        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const nextLaunchData = await getNextLaunch()
  const recentLaunchesData = await getRecentLaunches()
  const rocketsPreviewData = await getRocketsPreview()
  const dragonsPreviewData = await getDragonsPreview()

  return {
    props: {
      nextLaunchData,
      recentLaunchesData,
      rocketsPreviewData,
      dragonsPreviewData,
    },
  }
}
