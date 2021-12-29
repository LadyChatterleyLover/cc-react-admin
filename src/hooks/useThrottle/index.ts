import { useCallback, useEffect, useRef } from "react"

export const useThrottle = (cb: (args: any) => void, wait: number = 500) => {
  const { current } = useRef<{ cb: (...args: any) => void, timer: number | null }>({ cb, timer: null })
  let previous = 0

  useEffect(() => {
    current.cb = cb
  }, [cb])
  return useCallback((...args) => {
    let now = Date.now()
    if (now - previous > wait) {
      current.cb.call(this, ...args)
      previous = now
    }
  }, [])
}