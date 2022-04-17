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
