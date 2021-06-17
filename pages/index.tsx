import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import DragonsPreview from '../components/Home/DragonsPreview'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import RocketsPreview from '../components/Home/RocketsPreview'
import Navbar from '../components/Navbar/Navbar'
import { TextSize } from '../components/Text/ETextSize'
import Text from '../components/Text/Text'
import { landingImageHeight } from '../lib/constants/other'
import {
  getDragonsPreview,
  getFeaturedLaunches,
  getNextLaunch,
  getRocketsPreview,
} from '../lib/api-calls'
import { Dragon, Launch, Rocket } from '../lib/types/api'
import { Theme } from '../lib/types/theme'

interface Props {
  nextLaunchData: Launch
  featuredLaunchesData: Launch[]
  rocketsPreviewData: Rocket[]
  dragonsPreviewData: Dragon[]
}

export default function Home({
  nextLaunchData,
  featuredLaunchesData,
  rocketsPreviewData,
  dragonsPreviewData,
}: Props) {
  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [navbarColor, setNavbarColor] = useState('bg-transparent')

  const [navbarShadow, setNavbarShadow] = useState(false)

  function handleScroll() {
    if (window.scrollY >= landingImageHeight / 3) {
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
        <title>SpaceTracker</title>
      </Head>

      {/* Header */}
      <Navbar isShadow={navbarShadow} backgroundColor={navbarColor} />

      {/* landing */}
      <div className="w-full">
        <div className="flex flex-col justify-center items-center items-center bg-landing-image w-full h-landing bg-cover">
          <Text
            classes="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
            weight="font-bold"
            color={theme.textAccent}
          >
            SpaceXplorer: The SpaceX data explorer
          </Text>
          <Text classes="text-center" weight="font-semibold" color={theme.text}>
            Explore SpaceX launches, rockets, projects and more
          </Text>
          <Text
            link
            href="https://github.com/r-spacex/SpaceX-API"
            classes={`text-center mt-1 ${theme.mainText} cursor-pointer`}
            size={TextSize.Xl}
            color="text-white"
            weight="font-semibold"
          >
            Powered by an awesome SpaceX-API
          </Text>
        </div>
      </div>

      {/* page container */}
      <div
        className={`transition flex flex-col items-center h-full delay-300 ${theme.surfaceBackground}  `}
      >
        <LaunchesPreview
          featuredLaunches={featuredLaunchesData}
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
  const featuredLaunchesData = await getFeaturedLaunches()
  const rocketsPreviewData = await getRocketsPreview()
  const dragonsPreviewData = await getDragonsPreview()

  return {
    props: {
      nextLaunchData,
      featuredLaunchesData,
      rocketsPreviewData,
      dragonsPreviewData,
    },
  }
}
