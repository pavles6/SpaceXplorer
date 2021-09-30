interface OptionsParameters {
  select?: Object | string
  sort?: Object | string
  offset?: number | string
  page?: number | string
  limit?: number | string
  pagination?: boolean
  populate?: Array<string> | Object | string
}

export interface IEndpointPayload {
  options?: OptionsParameters
  query?: Object
}
