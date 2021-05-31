type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

interface Document {
  id: string
}

interface DragonDraft extends Document {
  name: string
  type: string
  active: boolean
  crew_capacity: number
  orbit_duration_yr: number
  dry_mass_kg: number
  dry_mass_lb: number
  first_flight: string
  diameter: {
    meters: number
    feet: number
  }
  flickr_images: string[]
  wikipedia: string
  description: string
}

interface RocketDraft extends Document {
  name: string
  type: string
  engines: {
    number: number
    type: string
    version: string
  }
  first_flight: string
  active: boolean
  company: string
  description: string
  wikipedia: string
  flickr_images: string[]
}

interface LaunchDraft extends Document {
  date_unix: number
  name: string
  id: string
  upcoming: boolean
  success: boolean | null
  details: string
  rocket: RocketDraft
  links: {
    wikipedia: string
    article: string
    webcast: string
  }
}

export interface Dragon extends DeepPartial<DragonDraft> {}

export interface Rocket extends DeepPartial<RocketDraft> {}

export interface Launch extends DeepPartial<LaunchDraft> {}
