import { AxiosRequestConfig } from 'axios'
import { QUERY_PAGE_LIMIT } from '../constants/api'
import { QueryParameters } from '../types/query'
import { IEndpointPayload } from './IEndpoints'

interface RequestConfig extends AxiosRequestConfig {
  data?: IEndpointPayload
}

export const LaunchesPayload = (id: string): RequestConfig => ({
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/launches/query',
  data: {
    options: {
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
      pagination: false,
    },
    query: {
      _id: id,
    },
  },
})

export const DragonsPreviewPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/dragons/query',
  data: {
    options: {
      pagination: false,
      select: 'name flickr_images active first_flight description id',
    },
  },
}

export const RocketsPreviewPayload: RequestConfig = {
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

export const RecentLaunchesPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/launches/query',
  data: {
    options: {
      limit: 4,
      select: 'date_unix date_precision name id upcoming success rocket crew',
      sort: {
        date_unix: 'desc',
      },
      populate: [{ path: 'rocket', select: 'name' }],
    },
    query: {
      upcoming: {
        $eq: false,
      },
      date_precision: {
        $eq: 'hour',
      },
    },
  },
}

export const NextLaunchPayload: RequestConfig = {
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

export const RocketTypesPayload: RequestConfig = {
  method: 'POST',
  url: 'https://api.spacexdata.com/v4/rockets/query',
  data: {
    options: {
      pagination: false,
      select: 'name',
    },
  },
}

export const QueryLaunchesPayload = (query: QueryParameters): RequestConfig => {
  const mongoQuery = {} as any
  const sort = {} as any
  const populate = [{ path: 'rocket', select: 'name' }] as any

  const { q, date_range, has_images, launch_type, outcome, rocket, date_sort } =
    query

  if (q)
    mongoQuery.name = {
      $regex: q,
      $options: 'i',
    }

  if (date_sort) {
    if (date_sort === 'descending') sort.date_unix = 'desc'

    if (date_sort === 'ascending') sort.date_unix = 'asc'
  }

  if (date_range) {
    if (date_range === 'past')
      mongoQuery.upcoming = {
        $eq: false,
      }

    if (date_range === 'upcoming')
      mongoQuery.upcoming = {
        $eq: true,
      }
  }

  if (has_images === 'images')
    mongoQuery['links.flickr.original.1'] = {
      $exists: true,
    }

  if (launch_type === 'crew')
    mongoQuery['crew.1'] = {
      $exists: true,
    }

  if (launch_type === 'non-crew')
    mongoQuery['crew.1'] = {
      $exists: false,
    }

  if (outcome === 'successful')
    mongoQuery.success = {
      $eq: true,
    }

  if (outcome === 'failed')
    mongoQuery.success = {
      $eq: false,
    }

  if (rocket) {
    populate.push({
      path: 'rocket',
      select: 'name',
    })
    mongoQuery.rocket = {
      $in: rocket.split(','),
    }
  }

  return {
    method: 'POST',
    url: 'https://api.spacexdata.com/v4/launches/query',
    data: {
      options: {
        limit: QUERY_PAGE_LIMIT,
        page: query.page || 1,
        select: 'name id date_unix date_precision success crew rocket upcoming',
        sort,
        populate,
      },
      query: mongoQuery,
    },
  }
}
