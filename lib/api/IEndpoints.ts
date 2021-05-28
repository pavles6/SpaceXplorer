interface OptionsParameters {
  select?: Object | string
  sort?: Object | string
  offset?: number
  page?: number
  limit?: number
  pagination?: boolean
  populate?: Array<string> | Object | string
}

export interface IEndpointPayload {
  options?: OptionsParameters
  query?: Object
}
