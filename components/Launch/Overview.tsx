import {
  BookmarkIcon,
  CalendarIcon,
  CubeIcon,
  DocumentTextIcon,
  FireIcon,
  LibraryIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import React from 'react'
import { useSelector } from 'react-redux'
import { LaunchLinks } from '../../lib/types/api'
import { State } from '../../lib/types/redux'
import { formatDate } from '../../lib/utils/date-functions'
import { TextSize } from '../Text/ETextSize'
import Text from '../Text/Text'
import { DataRow } from './DataListItem'
import { MediaLinkComponent, MediaLinkType } from './MediaLink'

interface Props {
  details: string | null
  links: LaunchLinks
  rocketName: string
  rocketId: string
  name: string
  date_unix: number
  launchpadName: string
  launchpadRegion: string
  launchpadId: string
  launchOutcome: string
  upcoming: boolean
}

export const OverviewSection = ({
  details,
  links,
  date_unix,
  name,
  rocketId,
  rocketName,
  launchOutcome,
  launchpadId,
  launchpadName,
  launchpadRegion,
  upcoming,
}: Props) => {
  const mediaLinks: MediaLinkType[] = [
    {
      url: links.webcast,
      title: 'Youtube livestream',
      Icon: VideoCameraIcon,
    },
    {
      url: links.wikipedia,
      title: 'Wikipedia',
      Icon: LibraryIcon,
    },
    {
      url: links.article,
      title: 'Spaceflight Now article',
      Icon: DocumentTextIcon,
    },
    {
      url: links.reddit.campaign,
      title: 'Reddit campaign',
      Icon: FireIcon,
    },
    {
      url: links.reddit.launch,
      title: 'Reddit launch discussion',
      Icon: LightningBoltIcon,
    },
  ]
  let shouldSort = false
  mediaLinks.forEach((link) => (link.url === null ? (shouldSort = true) : null))
  if (shouldSort) {
    mediaLinks.sort((link, _) => (link.url === null ? 1 : -1))
  }

  const theme = useSelector((state: State) => state.theme)

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Text
          color={theme.textAccent}
          weight="font-bold"
          size={TextSize.h1}
          heading
        >
          Description and overview
        </Text>
      </div>
      <Text
        align="text-justify"
        classes="pt-4"
        variant="title2"
        color={theme.text}
      >
        {details || 'No details are provided yet.'}
      </Text>
      <div className="flex flex-wrap flex-col md:flex-row mt-10 lg:space-x-6 flex-row w-full items-start justify-center xl:justify-start">
        {mediaLinks.map((link) => (
          <MediaLinkComponent key={link.title} link={link} />
        ))}
      </div>
      <div className="flex w-full mt-12 flex-col space-y-2">
        <Text
          classes="mb-4"
          heading
          size={TextSize.h2}
          color={theme.textAccent}
        >
          Basic information
        </Text>
        <DataRow Icon={LightningBoltIcon} title="Name" value={name} />
        <DataRow
          Icon={CubeIcon}
          title="Rocket"
          value={rocketName}
          link
          href={`/rocket/${rocketId}`}
        />
        <DataRow
          Icon={CalendarIcon}
          title="Date of launch"
          value={formatDate(new Date(date_unix * 1000), 'MMMM D, YYYY.')}
        />
        <DataRow
          Icon={LocationMarkerIcon}
          title="Launchpad"
          value={`${launchpadName}, ${launchpadRegion}`}
          link
          href={`/launchpad/${launchpadId}`}
        />
        <DataRow
          Icon={BookmarkIcon}
          title="Outcome"
          value={upcoming ? 'N/A (Upcoming)' : launchOutcome}
        />
      </div>
    </div>
  )
}
