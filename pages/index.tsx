import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'
import { getRecentLaunches, getNextLaunch } from '../lib/api/api-calls'
import { Launch } from '../lib/types/api'
import Image from 'next/image'

interface Props {
  nextLaunchData: Launch
  recentLaunchesData: Launch[]
}

export default function HomePage({
  nextLaunchData,
  recentLaunchesData,
}: Props) {
  return (
    <>
      <Head>
        <title>SpaceXplorer</title>
      </Head>

      <Navbar />
      <div className="transition flex flex-col items-center h-full bg-light dark:bg-dark">
        <div className="max-w-screen-sm">
          <div>
            <div className="mt-32 flex flex-col justify-center items-start">
              <Text variant="h1" classes="mb-2">
                SpaceXplorer
              </Text>
              <Text variant="h4" classes="font-normal">
                SpaceXplorer helps you search through the archive of every
                SpaceX rocket launch.
              </Text>
              <div className="flex items-center mb-10 mt-4">
                <Text classes="mr-2">This project is based on </Text>
                <Text
                  link
                  href="https://github.com/r-spacex/SpaceX-API"
                  color="info"
                >
                  r/SpaceX API
                </Text>
              </div>
            </div>
          </div>
          <LaunchesPreview
            recentLaunches={recentLaunchesData}
            nextLaunch={nextLaunchData}
          />
        </div>
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
