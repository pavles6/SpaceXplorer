import moment, { isDate } from 'moment'

export function formatDate(date: Date, format: string): string {
  // format validation
  if (!moment(Date.now(), format).isValid()) {
    throw new Error(`Invalid date format > ${format}`)
  }

  return moment(date).format(format)
}
