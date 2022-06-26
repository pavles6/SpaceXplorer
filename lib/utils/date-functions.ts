export function formatDate(
  date: Date,
  format: Intl.DateTimeFormatOptions = {}
): string {
  const localeDateformat = Intl.DateTimeFormat('en', format)

  return localeDateformat.format(date)
}

export interface CountdownReturnObject {
  days: string
  hours: string
  minutes: string
  seconds: string
}

// this fn is supposed to be called in 1s interval
export function calculateCountdown(
  date_unix: number
): CountdownReturnObject | null {
  const now = new Date().getTime()
  const distance = date_unix * 1000 - now

  if (distance > 0) {
    let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString()
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ).toString()
    let minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    ).toString()
    let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString()

    if (days.length == 1) days = `0${days}`
    if (hours.length == 1) hours = `0${hours}`
    if (minutes.length == 1) minutes = `0${minutes}`
    if (seconds.length == 1) seconds = `0${seconds}`

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  } else {
    return null
  }
}

export function getDateFormat(
  date_precision: string,
  options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormatOptions {
  const dateFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
  }

  switch (date_precision) {
    case 'hour':
    case 'day':
      dateFormat.month = options?.month || 'short'
      dateFormat.day = options?.day || '2-digit'
      dateFormat.year = options?.year || 'numeric'
      break
    case 'month':
      dateFormat.month = options?.month || 'short'
      dateFormat.year = options?.year || 'numeric'
      break
    case 'half':
    case 'quarter':
    case 'year':
      dateFormat.year = options?.year || 'numeric'
      break
  }

  return dateFormat
}
