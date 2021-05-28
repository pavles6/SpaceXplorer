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
