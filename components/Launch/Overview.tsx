import {
  DocumentTextIcon,
  FireIcon,
  LibraryIcon,
  LightningBoltIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import React from 'react'
import { LaunchLinks } from '../../lib/types/api'
import Text from '../Text/Text'
import { DataRow } from './DataListItem'
import { LaunchMediaLink, IMediaLink } from './MediaLink'

interface Props {
  details: string | null
  links: LaunchLinks
  rocketName: string
  rocketWikipediaPage: string
  name: string
  formattedDate: string
  launchpadName: string
  launchpadRegion: string
  launchpadId: string
  launchOutcome: string
  upcoming: boolean
}

export const LaunchOverviewSection = ({
  details,
  links,
  formattedDate,
  name,
  rocketWikipediaPage,
  rocketName,
  launchOutcome,
  launchpadId,
  launchpadName,
  launchpadRegion,
  upcoming,
}: Props) => {
  const mediaLinks: IMediaLink[] = [
    {
      url: links.webcast,
      title: 'YouTube livestream',
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

  for (let link of mediaLinks)
    if (link.url === null) {
      // put unavailable links at the end
      mediaLinks.forEach((link, i) => {
        if (link.url === null) mediaLinks.push(mediaLinks.splice(i, 1)[0])
      })
    }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Text
          color="textAccent"
          weight="font-bold"
          variant="articleHeading1"
          divider
        >
          Description and overview
        </Text>
      </div>
      <Text
        align="text-justify"
        classes="pt-4"
        variant="subtitle2"
        color="text"
      >
        {details || 'No details are provided yet.'}
      </Text>
      <div className="flex flex-wrap flex-col md:flex-row mt-10 lg:space-x-6 w-full items-start justify-center xl:justify-start">
        {mediaLinks.map((link) => (
          <LaunchMediaLink key={link.title} link={link} />
        ))}
      </div>
      <div className="flex w-full mt-12 flex-col space-y-2">
        <Text
          classes="mb-4"
          divider
          variant="articleHeading2"
          color="textAccent"
        >
          Basic information
        </Text>
        <DataRow title="Name" value={name} />
        <DataRow
          title="Rocket"
          value={rocketName}
          link
          target="_blank"
          href={rocketWikipediaPage}
        />
        <DataRow title="Date of launch" value={formattedDate} />
        <DataRow
          title="Launchpad"
          value={`${launchpadName}, ${launchpadRegion}`}
          link
          target="_blank"
          href={`https://api.spacexdata.com/v4/launchpads/${launchpadId}`}
        />
        <DataRow
          title="Outcome"
          value={upcoming ? 'N/A (Upcoming)' : launchOutcome}
        />
      </div>
    </div>
  )
}
