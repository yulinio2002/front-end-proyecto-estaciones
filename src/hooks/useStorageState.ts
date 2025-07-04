import { useState, useEffect } from 'react'

function useStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    if (stored != null) {
      try {
        return JSON.parse(stored) as T
      } catch {
        return initialValue
      }
    }
    return initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write errors
    }
  }, [key, value])

  return [value, setValue] as const
}

export default useStorageState
