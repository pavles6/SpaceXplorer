import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DragonPreview from '../components/Home/DragonPreview'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import RocketsPreview from '../components/Home/RocketsPreview'
import Navbar from '../components/Navbar/Navbar'
import { TextSize } from '../components/Text/ETextSize'
import Text from '../components/Text/Text'
import { Theme } from '../constants/global/theme'
import { landingImageHeight } from '../constants/other'
import { getFeaturedLaunches, getNextLaunch } from '../redux/actions/launches'
import { wrapper } from '../redux/store'
import { LaunchesState } from '../types/redux'

export default function Home() {
  const dispatch = useDispatch()
  const { nextLaunch, featuredLaunches } = useSelector(
    (state: { launches: LaunchesState }) => state.launches
  )

  const theme = useSelector((state: { theme: Theme }) => state.theme)

  const [navbarColor, setNavbarColor] = useState('bg-transparent')

  const [navbarShadow, setNavbarShadow] = useState<boolean>(false)

  function handleScroll() {
    if (window.scrollY >= landingImageHeight / 3) {
      setNavbarColor(theme.surface)
      setNavbarShadow(true)
    } else setNavbarColor('bg-transparent')
  }

  useEffect(() => {
    dispatch(getFeaturedLaunches())
  }, [])

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
      <Navbar shadow={navbarShadow} backgroundColor={navbarColor} />

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
            Cool data mapped within eye-candy UI, made with a very cool
            tech-stack.
          </Text>
          <Text
            link
            href="https://github.com/r-spacex/SpaceX-API"
            classes={`underline text-center mt-1 ${theme.mainText} cursor-pointer`}
            size={TextSize.Xl}
            color="text-white"
            weight="font-semibold"
          >
            Powered by an awesome API
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

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    ({ preview }) => {
      console.log('getStaticProps on index.tsx has been called.')
      store.dispatch(getFeaturedLaunches())
    }
)
