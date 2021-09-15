import axios, { AxiosResponse } from 'axios'
import {
  dragonsPreviewPayload,
  recentLaunchesPayload,
  launchPayload,
  nextLaunchPayload,
  LaunchesIdsPayload,
  rocketsPreviewPayload,
} from './endpoints'
import { Dragon, Launch, Rocket } from '../types/api'

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
