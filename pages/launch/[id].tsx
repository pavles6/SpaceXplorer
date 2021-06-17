import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar/Navbar'
import { defaultLaunchLandingImage } from '../../lib/constants/other'
import { getLaunch } from '../../lib/api-calls'
import { Launch } from '../../lib/types/api'
import { State } from '../../lib/types/redux'
import Footer from '../../components/Footer'
import { HeaderSection } from '../../components/Launch/Header'
import { OverviewSection } from '../../components/Launch/Overview'
import { PayloadSection } from '../../components/Launch/Payload'
import { CrewSection } from '../../components/Launch/Crew'
import { GallerySection } from '../../components/Launch/Gallery'

interface Props {
  launchData: Launch
}

export default function LaunchPage({ launchData }: Props) {
  const {
    capsules,
    rocket,
    crew,
    date_unix,
    details,
    launchpad,
    links,
    name,
    payloads,
    success,
    upcoming,
  } = launchData
  const theme = useSelector((state: State) => state.theme)

  const isImage = launchData.links!.flickr!.original.length > 0 || null

  const [landingImage, setLandingImage] = useState<string>(null)

  useEffect(() => {
    if (isImage) {
      const randomImage = Math.floor(
        Math.random() * launchData.links.flickr.original.length
      )
      setLandingImage(launchData.links.flickr.original[randomImage])
    } else {
      setLandingImage(defaultLaunchLandingImage)
    }
  }, [])

  let launchOutcome = ''

  if (upcoming) {
    launchOutcome = `Upcoming`
  }

  if (success) launchOutcome = 'Successful'
  if (success === false) launchOutcome = 'Failed'

  console.log(launchData)

  return (
    <>
      <Navbar />
      <div>
        <HeaderSection
          date_unix={launchData.date_unix}
          landingImage={landingImage}
          launchOutcome={launchOutcome}
          name={launchData.name}
        />
        <div className={`${theme.surfaceBackground}`}>
          <div
            className={`${theme.surfaceBackground} flex flex-col items-center w-full`}
          >
            <article
              className={`flex flex-col max-w-screen-xl w-11/12 lg:w-full lg:px-6 h-full pt-12`}
            >
              <OverviewSection
                date_unix={date_unix}
                launchOutcome={launchOutcome}
                upcoming={upcoming}
                launchpadRegion={launchpad.region}
                launchpadName={launchpad.name}
                launchpadId={launchpad.id}
                rocketName={rocket.name}
                rocketId={rocket.id}
                name={name}
                details={details}
                links={links}
              />
              <PayloadSection capsules={capsules} payloads={payloads} />
              <CrewSection crew={crew} />
            </article>
            {isImage ? (
              <GallerySection name={name} images={links.flickr.original} />
            ) : null}
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const launchData = await getLaunch(context.params.id)

  return {
    props: {
      launchData,
    },
  }
}
