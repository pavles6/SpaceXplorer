import { Theme } from '../constants/global/theme'

export interface State {
  theme: ThemeState
  launches: LaunchesState
}

export interface LaunchesState {
  nextLaunch: FetchableLaunch
  featuredLaunches: FeaturedLaunches
  pastLaunches: Launch[]
}

export interface ThemeState extends Theme {}

interface ReduxDispatchData {
  payload: any
  type: string
}

export interface Fetchable {
  loading: boolean
}

export interface Rocket {
  name?: string
  type?: string
  active?: boolean
  company?: string
  description?: string
  wikipedia?: string
}

export interface Launch {
  date_unix?: number
  name?: string
  id?: string
  upcoming?: boolean
  success?: boolean | null
  details?: string
  rocket?: Rocket
  links?: {
    wikipedia?: string
    article?: string
    webcast?: string
  }
}

export interface FetchableLaunch extends Launch, Fetchable {}

export interface FeaturedLaunches extends Fetchable {
  items: Launch[]
}
