import React from 'react'

export default function useDebounce(value: unknown, delay: number = 1000) {
  const [cacheValue, setCacheValue] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCacheValue(value)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return cacheValue
}
