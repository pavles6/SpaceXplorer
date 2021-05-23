import {
  FETCH_FEATURED_LAUNCHES,
  FETCH_NEXT_LAUNCH,
} from '../../constants/redux/actionTypes'
import { LaunchesState } from '../../types/redux'

export const initialLaunchesState: LaunchesState = {
  nextLaunch: {
    loading: true,
    date_unix: null,
    name: null,
    id: null,
  },
  featuredLaunches: {
    loading: true,
    items: [],
  },
  pastLaunches: [],
}

const launchesReducerFunction = (
  state: LaunchesState = initialLaunchesState,
  { type, payload }
): LaunchesState => {
  switch (type) {
    case FETCH_NEXT_LAUNCH:
      return {
        ...state,
        nextLaunch: {
          ...state.nextLaunch,
          ...payload,
          loading: false,
        },
      }

    case FETCH_FEATURED_LAUNCHES:
      return {
        ...state,
        featuredLaunches: {
          loading: false,
          items: [...state.featuredLaunches.items, ...payload],
        },
      }

    default:
      return state
  }
}

export default launchesReducerFunction
