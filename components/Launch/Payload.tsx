import React from 'react'
import { DragonCapsule, Payload } from '../../lib/types/api'
import Text from '../Text/Text'
import { DataRow } from './DataListItem'
import { Expandable } from './Expandable'

interface Props {
  payloads: Payload[]
  capsules: DragonCapsule[]
}

export const LaunchPayloadSection = ({ payloads, capsules }: Props) => {
  let isNoPayloadData = false
  let isDragonCapsule = false

  const payloadCategories = {
    Satellite: [],
    'Dragon 2.0': [],
    'Dragon 1.0': [],
    'Dragon 1.1': [],
    'Crew Dragon': [],
    'Dragon Boilerplate': [],
  }

  for (let payloadData of payloads) {
    const categories = Object.keys(payloadCategories)
    if (categories.includes((payloadData as Payload).type)) {
      payloadCategories[(payloadData as any).type].push(payloadData)
    }
  }

  const payloadDataToMap = []

  for (let category of Object.keys(payloadCategories)) {
    if (payloadCategories[category].length > 0) {
      payloadDataToMap.push(
        <Expandable key={category} title={category}>
          {payloadCategories[category].map(
            (payload: { name: string; id: string }) => (
              <li key={payload.id}>
                <Text
                  variant="subtitle1"
                  color="info"
                  decoration="underline"
                  link
                  target="_blank"
                  href={`https://api.spacexdata.com/v4/payloads/${payload.id}`}
                >
                  {`${payload.name} (${category})`}
                </Text>
              </li>
            )
          )}
        </Expandable>
      )
    }
  }

  if (payloadDataToMap.length === 0) isNoPayloadData = true
  for (const category of Object.keys(payloadCategories))
    if (category !== 'Satellite')
      if (payloadCategories[category].length > 0) isDragonCapsule = true

  return (
    <div className="flex w-full h-full flex-col space-y-2">
      <Text classes="mb-4" border variant="articleHeading2" color="theme">
        Payload
      </Text>
      {!isNoPayloadData && payloads.length === 0 ? (
        <Text variant="title1" color="themeSecondary">
          There's no available payload data for this launch.
        </Text>
      ) : (
        payloadDataToMap.map((element) => element)
      )}
      <div className="flex h-full lg:pl-6 w-full flex-col space-y-2 ">
        {capsules.length > 0 && isDragonCapsule
          ? capsules.map((capsule) => (
              <div key={capsule.id}>
                <Text
                  classes="mt-4"
                  color="theme"
                  border
                  variant="articleHeading3"
                >
                  Payload capsule
                </Text>
                <div className="mt-6">
                  <div className="flex flex-col space-y-2">
                    <DataRow
                      title="Serial number"
                      value={capsule.serial}
                      link
                      target="_blank"
                      href={`https://api.spacexdata.com/v4/capsules/${capsule.id}`}
                    />
                    <DataRow title="Type" value={capsule.type} />
                    <DataRow
                      title="Status"
                      value={
                        capsule.status.slice(0, 1).toUpperCase() +
                        capsule.status.slice(1)
                      }
                    />
                    <DataRow
                      title="Times used"
                      value={capsule.reuse_count.toString()}
                    />
                    <DataRow
                      title="Land landings"
                      value={capsule.land_landings.toString()}
                    />
                    <DataRow
                      title="Water landings"
                      value={capsule.water_landings.toString()}
                    />
                    <DataRow
                      title="Last update"
                      value={capsule.last_update || 'N/A'}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
