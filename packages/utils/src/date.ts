import { format } from "date-fns"

export const formatDate = (date: Date): string => {
  return format(date, "MMM d") // This line corresponds to "Aug 16", where "MMM" stands for the month in abbreviated form and "d" stands for the day of the month as a zero-padded number.
}
export const formatTime = (date: Date): string => {
  return format(date, "HH:mm:ss") // HH for hours in 24h format
}

export const TEN_MINUTES = 10 * 60 * 1000
export const TEN_SECONDS = 10 * 1000
export const ONE_HOUR = 60 * 60 * 1000
export const ONE_DAY = 24 * ONE_HOUR
export const ONE_WEEK = 7 * ONE_DAY
export const ONE_MONTH = 30 * ONE_DAY
export const ONE_YEAR = 365 * ONE_DAY
export const ONE_MINUTE = 60 * 1000
export const ONE_SECOND = 1000
