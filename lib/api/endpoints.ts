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
          select: 'name id wikipedia',
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

export const recentLaunchesPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/launches/query',
  data: {
    options: {
      limit: 5,
      select: 'date_unix name id upcoming success rocket',
      sort: {
        date_unix: 'desc',
      },
      populate: [{ path: 'rocket', select: 'name' }],
    },
    query: {
      success: {
        $eq: true,
      },
      date_precision: {
        $eq: 'hour',
      },
    },
  },
}

export const nextLaunchPayload: RequestConfig = {
  method: 'GET',
  url: 'https://api.spacexdata.com/v4/launches/next',
}

export const LaunchesIdsPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/launches/query',
  data: {
    options: {
      pagination: false,
      select: 'id',
    },
  },
}
