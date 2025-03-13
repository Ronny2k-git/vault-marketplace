export const add = (a: number, b: number) => a + b

export const defaultSmallFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  unitDisplay: "narrow",
  maximumSignificantDigits: 3,
})

const defaultFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  unitDisplay: "narrow",
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 4,
})

const extremelyCompactFormatter = new Intl.NumberFormat("en", {
  notation: "engineering",
  compactDisplay: "short",
  unitDisplay: "narrow",
  maximumFractionDigits: 2,
})

export const noDecimalsFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  unitDisplay: "narrow",
  maximumFractionDigits: 0,
})

export const formatNumber = (value: number, formatter: Intl.NumberFormat = defaultFormatter) => {
  if (value < 10 && formatter === defaultFormatter) {
    return defaultSmallFormatter.format(value)
  } else {
    if (value > 1e20) return extremelyCompactFormatter.format(value)
    return formatter.format(value)
  }
}
