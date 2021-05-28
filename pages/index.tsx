import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DragonPreview from '../components/Home/DragonPreview'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import RocketsPreview from '../components/Home/RocketsPreview'
import Navbar from '../components/Navbar/Navbar'
import { TextSize } from '../components/Text/ETextSize'
import Text from '../components/Text/Text'
import { landingImageHeight } from '../constants/other'
import { getFeaturedLaunches, getNextLaunch } from '../lib/api-calls'
import { Launch } from '../lib/types/api'
import { Theme } from '../lib/types/theme'

interface Props {
  nextLaunch: Launch
  featuredLaunches: Launch[]
}

export default function Home({ nextLaunch, featuredLaunches }: Props) {
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
        <title>Astronaut</title>
      </Head>

      {/* Header */}
      <Navbar isShadow={navbarShadow} backgroundColor={navbarColor} />

      {/* landing */}
      <div className="w-full">
        <div className="flex flex-col justify-center items-center items-center bg-landing-image w-full h-landing bg-cover">
          <Text
            classes="text-center"
            size={TextSize.Xl6}
            weight="font-bold"
            color={theme.textAccent}
          >
            Astronaut: The SpaceX API explorer
          </Text>
          <Text
            classes="text-center mt-1"
            size={TextSize.Xl}
            color={theme.textAccent}
          >
            Explore SpaceX launches, rockets, projects and more
          </Text>
          <Text
            link
            href="https://github.com/r-spacex/SpaceX-API"
            classes={`underline text-center mt-1 ${theme.mainText} cursor-pointer`}
            size={TextSize.Lg}
            color="text-white"
            weight="font-semibold"
          >
            Powered by an awesome open-source API
          </Text>
        </div>
      </div>

      {/* page container */}
      <div
        className={`transition flex flex-col items-center h-full delay-300 ${theme.surfaceBackground}  `}
      >
        <LaunchesPreview
          featuredLaunches={featuredLaunches}
          nextLaunch={nextLaunch}
        />
        <RocketsPreview />
        <DragonPreview />

        {/* Footer */}
        <div
          className={`${theme.surface} w-full h-20 flex justify-between items-center`}
        >
          <Text
            classes="ml-5"
            size={TextSize.Lg}
            weight="font-semibold"
            color={theme.text}
          >
            Licensed under{' '}
            <Link href="#">
              <span className="underline cursor-pointer">MIT License</span>
            </Link>
          </Text>
          <Text
            classes=""
            size={TextSize.Lg}
            weight="font-semibold"
            color={theme.text}
          >
            Made with Next.js &amp; Redux +{' '}
            <span className="text-red-500">❤</span>
          </Text>
          <Text
            link
            href="#"
            classes="underline mr-5 cursor-pointer"
            size={TextSize.Lg}
            weight="font-semibold"
            color={theme.text}
          >
            GitHub Repository
          </Text>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const nextLaunchData = await getNextLaunch()
  const featuredLaunchesData = await getFeaturedLaunches()

  return {
    props: {
      nextLaunch: nextLaunchData,
      featuredLaunches: featuredLaunchesData,
    },
  }
}
