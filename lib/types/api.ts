import { DeepPartial } from './common/DeepPartial'

export interface Dragon extends DeepPartial<DragonDraft> {}

export interface Rocket extends DeepPartial<RocketDraft> {}

export interface Launch extends DeepPartial<LaunchDraft> {}

export interface LaunchLinks extends DeepPartial<LaunchLinksDraft> {}

export interface Payload extends DeepPartial<PayloadDraft> {}

export interface DragonCapsule extends DeepPartial<DragonCapsuleDraft> {}

export interface CrewMember extends DeepPartial<CrewMemberDraft> {}

interface Document {
  id: string
}

export interface LaunchImage {
  imageData: {
    src: string
    width: number
    height: number
  }
  placeholder: string
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

interface LaunchpadDraft extends Document {
  name: string
  full_name: string
  status:
    | 'active'
    | 'inactive'
    | 'unknown'
    | 'retired'
    | 'lost'
    | 'under construction'
  locality: string
  region: string
  timezone: string
  latitude: number
  longtitude: number
  launch_success: number
  rockets: RocketDraft[] | string[]
  launches: LaunchDraft[] | string[]
}

interface LaunchLinksDraft {
  wikipedia: string
  article: string
  webcast: string
  reddit: {
    campaign: string
    launch: string
  }
  flickr: {
    small: string[]
    original: string[]
  }
}

interface LaunchDraft extends Document {
  date_unix: number
  date_precision: 'year' | 'month' | 'day' | 'hour' | 'half' | 'quarter'
  name: string
  upcoming: boolean
  success: boolean | null
  details: string
  rocket: RocketDraft
  launchpad: LaunchpadDraft
  links: LaunchLinksDraft
  crew: CrewMemberDraft[]
  capsules: DragonCapsuleDraft[]
  payloads: PayloadDraft[]
}

interface CrewMemberDraft extends Document {
  name: string
  status: 'active' | 'inactive' | 'retired' | 'unknown'
  agency: string
  image: string
  wikipedia: string
  launches: LaunchDraft[]
  imagePlaceholder?: string | null
}

interface DragonCapsuleDraft extends Document {
  serial: string
  status: 'unknown' | 'active' | 'retired' | 'unknown'
  type: 'Dragon 1.0' | 'Dragon 1.1' | 'Dragon 2.0'
  dragon: DragonDraft
  reuse_count: number
  last_update: string
  water_landings: number
  land_landings: number
  launches: LaunchDraft[]
}

interface PayloadDraft extends Document {
  name: string
  type: string
  reused: boolean
  launch: LaunchDraft | string | null
  customers: string[]
  nationalities: string[]
  manufacturers: string[]
  mass_kg: number
  mass_lb: number
  dragon: {
    capsule: DragonCapsuleDraft | string
    mass_returned_kg: number
    mass_returned_lbs: number
    flight_time_sec: number
    water_landing: boolean
    land_landing: boolean
  }
}
