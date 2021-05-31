import axios, { AxiosResponse } from 'axios'
import {
  dragonsPreviewPayload,
  featuredLaunchesPayload,
  nextLaunchPayload,
  rocketsPreviewPayload,
} from './api/endpoints'

export const getDragonsPreview = async () => {
  const {
    data: { docs },
  }: AxiosResponse = await axios(dragonsPreviewPayload)

  return docs
}

export const getRocketsPreview = async () => {
  const {
    data: { docs },
  }: AxiosResponse = await axios(rocketsPreviewPayload)

  return docs
}

export const getNextLaunch = async () => {
  const {
    data: { name, date_unix, id },
  }: AxiosResponse = await axios(nextLaunchPayload)
  setTimeout(() => {}, 2000)

  return {
    name,
    date_unix,
    id,
  }
}

export const getFeaturedLaunches = async () => {
  const { data }: AxiosResponse = await axios(featuredLaunchesPayload)
  return data.docs
}
