import { AxiosRequestConfig } from 'axios'
import { IEndpointPayload } from './IEndpoints'

interface RequestConfig extends AxiosRequestConfig {
  data?: IEndpointPayload
}

export const launchPayload = (id: string): RequestConfig => ({
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/launches/query',
  data: {
    options: {
      pagination: false,
      select:
        'date_unix date_precision name upcoming success details rocket links.wikipedia links.article links.webcast links.reddit.campaign links.reddit.launch links.flickr.original crew capsules payloads launchpad landpad id',
      populate: [
        {
          path: 'rocket',
          select: 'name id',
        },
        {
          path: 'crew',
          select: 'name agency image wikipedia launches id',
        },
        {
          path: 'capsules',
          select:
            'serial type id last_update status reuse_count water_landings land_landings',
        },
        {
          path: 'launchpad',
          select: 'locality region name id',
        },
        {
          path: 'payloads',
          select: 'id name type reused customers nationalities manufacturers ',
          populate: [
            {
              path: 'dragon.capsule',
              select:
                'capsule, flight_time_sec,mass_returned_kg,mass_returned_lbs,water_landing,land_landing',
            },
          ],
        },
      ],
    },
    query: {
      _id: id,
    },
  },
})

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
          '5eb87d13ffd86e000604b360',
          '5fe3af58b3467846b324215f',
          '5fe3b15eb3467846b324216d',
          '5fe3af84b3467846b3242161',
          '605b4b95aa5433645e37d041',
        ],
      },
    },
  },
}

export const nextLaunchPayload: RequestConfig = {
  method: 'GET',
  url: 'https://api.spacexdata.com/v4/launches/next',
}
