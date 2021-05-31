import { AxiosRequestConfig } from 'axios'
import { IEndpointPayload } from './IEndpoints'

interface RequestConfig extends AxiosRequestConfig {
  data?: IEndpointPayload
}

export const dragonsPreviewPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/dragons/query',
  data: {
    options: {
      pagination: false,
      select: 'name flickr_images active first_flight description id',
    },
  },
}

export const rocketsPreviewPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/rockets/query',
  data: {
    options: {
      pagination: false,
      select:
        'name id flickr_images description engines.number first_flight active',
    },
  },
}

export const featuredLaunchesPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/launches/query',
  data: {
    options: {
      pagination: false,
      select: 'date_unix name id upcoming success rocket',
      populate: [
        {
          path: 'rocket',
          select: 'name',
        },
      ],
    },
    query: {
      _id: {
        $in: [
          '5fe3af58b3467846b324215f',
          '5ed981d91f30554030d45c2a',
          '5fe3b15eb3467846b324216d',
          '5eb87d27ffd86e000604b372',
          '5eb87ceeffd86e000604b341',
        ],
      },
    },
  },
}

export const nextLaunchPayload: RequestConfig = {
  method: 'GET',
  url: 'https://api.spacexdata.com/v4/launches/next',
}
