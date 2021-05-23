import axios, { AxiosResponse } from 'axios'
import {
  nextLaunchPayload,
  featuredLaunchesPayload,
} from '../../constants/api/endpoints'
import {
  FETCH_NEXT_LAUNCH,
  FETCH_FEATURED_LAUNCHES,
} from '../../constants/redux/actionTypes'

export const getNextLaunch = () => async (dispatch) => {
  const { data }: AxiosResponse = await axios(nextLaunchPayload)
  dispatch({ type: FETCH_NEXT_LAUNCH, payload: data.docs[0] })
}

export const getFeaturedLaunches = () => async (dispatch) => {
  const { data }: AxiosResponse = await axios(featuredLaunchesPayload)
  dispatch({ type: FETCH_FEATURED_LAUNCHES, payload: data.docs })
}
