import Head from 'next/head'
import Footer from '../components/Footer'
import LaunchesPreview from '../components/Home/LaunchesPreview'
import Navbar from '../components/Navbar/Navbar'
import Text from '../components/Text/Text'
import { getRecentLaunches, getNextLaunch } from '../lib/api/api-calls'
import { Launch } from '../lib/types/api'

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
        <meta
          name="description"
          content="SpaceXplorer is a place where you can find info about every SpaceX rocket launch."
        />
      </Head>

      <Navbar />
      <div className="transition flex flex-col items-center h-full bg-light dark:bg-dark">
        <div className="max-w-screen-sm px-4">
          <div>
            <div className="mt-32 flex flex-col justify-center items-start">
              <Text variant="h1" classes="mb-2">
                SpaceXplorer
              </Text>
              <Text variant="h4" classes="font-normal">
                SpaceXplorer is a place where you can find info about every
                SpaceX rocket launch.
              </Text>
              <div className="flex items-center mt-4">
                <Text classes="mr-1">This project is based on </Text>
                <Text
                  link
                  href="https://github.com/r-spacex/SpaceX-API"
                  color="info"
                  decoration="underline"
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
