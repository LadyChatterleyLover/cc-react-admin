import { useRef, useEffect, useCallback } from "react"

export const useDebounce = (cb: (...args: any) => void, wait: number = 500) => {
  const { current } = useRef<{ cb: (...args: any) => void, timer: number | null }>({ cb, timer: null })
  useEffect(() => {
    current.cb = cb
  }, [cb])

  return useCallback((...args) => {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.cb.call(this, ...args)
    }, wait)
  }, [])
}