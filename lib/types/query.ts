import { Launch } from './api'

export type QueryTypes =
  | 'q'
  | 'launch_type'
  | 'date_range'
  | 'rocket'
  | 'payload_type'
  | 'outcome'
  | 'has_images'
  | 'page'

export interface QueryObject {
  q?: string
  launch_type?: 'crew' | 'non-crew'
  date_range?: string | 'newest' | 'oldest' | 'upcoming'
  rocket?: string
  payload_type?: string
  outcome?: 'successful' | 'failed' | 'N/A'
  has_images?: boolean
  page?: number | string
}

export type LaunchQueryResultItem = Pick<
  Launch,
  | 'name'
  | 'id'
  | 'date_unix'
  | 'date_precision'
  | 'success'
  | 'crew'
  | 'upcoming'
> & { rocket: { name: string; id: string } }

export type QueryResult = {
  docs: LaunchQueryResultItem[] | null
  totalPages: number
  totalDocs: number
  page: number
  limit: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
