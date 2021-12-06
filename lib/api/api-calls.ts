import axios, { AxiosResponse } from 'axios'
import {
  DragonsPreviewPayload,
  RecentLaunchesPayload,
  LaunchesPayload,
  NextLaunchPayload,
  LaunchesIdsPayload,
  RocketsPreviewPayload,
  RocketTypesPayload,
  QueryLaunchesPayload,
} from './endpoints'
import { Dragon, Launch, Rocket } from '../types/api'
import { QueryParameters, QueryResult } from '../types/query'

export const getLaunch = async (id: string): Promise<Launch> => {
  const { data }: AxiosResponse = await axios(LaunchesPayload(id))

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
  }: AxiosResponse = await axios(DragonsPreviewPayload)

  return docs
}

export const getRocketsPreview = async (): Promise<Rocket[]> => {
  const {
    data: { docs },
  }: AxiosResponse = await axios(RocketsPreviewPayload)

  return docs
}

export const getNextLaunch = async (): Promise<Launch> => {
  const {
    data: { name, date_unix, id, date_precision },
  }: AxiosResponse = await axios(NextLaunchPayload)

  return {
    name,
    date_unix,
    id,
    date_precision,
  }
}

export const getRecentLaunches = async (): Promise<Launch[]> => {
  const { data }: AxiosResponse = await axios(RecentLaunchesPayload)
  return data.docs
}

export const queryLaunches = async (
  query: QueryParameters
): Promise<QueryResult> => {
  const requestPayload = QueryLaunchesPayload(query)
  const { data }: AxiosResponse = await axios(requestPayload)

  return data
}

export const getRocketTypes = async (): Promise<
  Array<{
    id: string
    name: string
  }>
> => {
  const { data }: AxiosResponse = await axios(RocketTypesPayload)
  const rockets = []

  data.docs.forEach((doc) => rockets.push({ name: doc.name, id: doc.id }))

  return rockets as any
}
