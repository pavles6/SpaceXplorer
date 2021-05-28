import axios, { AxiosResponse } from 'axios'
import { featuredLaunchesPayload, nextLaunchPayload } from './api/endpoints'

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
