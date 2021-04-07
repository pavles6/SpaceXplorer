import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text'
import { Theme } from '../constants/global/theme'
import { landingImageHeight, navbarBackgroundColor } from '../constants/other'

export default function Home() {
  const { themeData }: { themeData: Theme } = useSelector(
    (state: any) => state.theme
  )
  let r = []
  for (let i = 0; i < 1000; i++) {
    r[i] = i
  }

  const [navbarColor, setNavbarColor] = useState('bg-transparent')

  const [navbarShadow, setNavbarShadow] = useState<boolean>(false)

  function handleScroll() {
    if (window.scrollY >= landingImageHeight / 2) {
      setNavbarColor(navbarBackgroundColor)
      setNavbarShadow(true)
    } else setNavbarColor('bg-transparent')
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  console.log('i got rendered [index]')

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
            size="text-6xl"
            weight="font-bold"
            color="text-white"
          >
            Astronaut: The ultimate SpaceX API explorer
          </Text>
          <Text
            classes="text-center mt-1"
            size="text-xl"
            weight="font-semibold"
            color="text-white"
          >
            Eye-candy UI for all the interesting data, made with a very cool
            tech-stack.
          </Text>
        </div>
      </div>

      {/* page container */}
      <div
        className={`transition flex flex-col items-center h-full delay-300 ${themeData.surfaceBackground}`}
      >
        <LaunchesPreview theme={themeData} />
        <LaunchesPreview theme={themeData} />
        <LaunchesPreview theme={themeData} />
      </div>
    </>
  )
}
