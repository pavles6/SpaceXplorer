import axios, { AxiosResponse } from 'axios'
import {
  dragonsPreviewPayload,
  recentLaunchesPayload,
  launchPayload,
  nextLaunchPayload,
  LaunchesIdsPayload,
  rocketsPreviewPayload,
  RocketTypesPayload,
  PayloadTypesPayload,
  queryLaunchesPayload,
} from './endpoints'
import { Dragon, Launch, Rocket } from '../types/api'
import { QueryObject, QueryResult } from '../types/query'

export const getLaunch = async (id: string): Promise<Launch> => {
  const { data }: AxiosResponse = await axios(launchPayload(id))

  return data.docs[0]
}

// for static page generation of launches/[id] route
export const getLaunchesIds = async (): Promise<object[]> => {
  const {
    data: { docs },
  }: AxiosResponse = await axios(LaunchesIdsPayload)

  return docs
}

export const getDragonsPreview = async (): Promise<Dragon[]> => {
  const {
    data: { docs },
  }: AxiosResponse = await axios(dragonsPreviewPayload)

  return docs
}

export const getRocketsPreview = async (): Promise<Rocket[]> => {
  const {
    data: { docs },
  }: AxiosResponse = await axios(rocketsPreviewPayload)

  return docs
}

export const getNextLaunch = async (): Promise<Launch> => {
  const {
    data: { name, date_unix, id, date_precision },
  }: AxiosResponse = await axios(nextLaunchPayload)

  return {
    name,
    date_unix,
    id,
    date_precision,
  }
}

export const getRecentLaunches = async (): Promise<Launch[]> => {
  const { data }: AxiosResponse = await axios(recentLaunchesPayload)
  return data.docs
}

export const queryLaunches = async (
  query: QueryObject
): Promise<QueryResult> => {
  let populatedField = null

  if (query.payload_type) populatedField = 'payloads'

  if (query.rocket) populatedField = 'rocket'

  const { data }: AxiosResponse = await axios(queryLaunchesPayload(query))

  if (populatedField)
    data.docs = data.docs.map((doc) => {
      if (doc[populatedField] !== null || doc[populatedField].length > 0)
        return doc
    })

  return data
}

export const getRocketTypes = async (): Promise<string[]> => {
  const { data }: AxiosResponse = await axios(RocketTypesPayload)
  const rockets = []

  data.docs.forEach((doc) => rockets.push(doc.name))

  return rockets
}

export const getPayloadTypes = async (): Promise<string[]> => {
  const { data }: AxiosResponse = await axios(PayloadTypesPayload)
  const payloads = []

  data.docs.forEach((doc) =>
    payloads.includes(doc.type) ? null : payloads.push(doc.type)
  )

  return payloads
}
