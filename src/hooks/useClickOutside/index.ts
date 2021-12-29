import { useEffect, useRef } from 'react'

export const useClickOutside = (
  onClickAway: (event: any) => void,
  eventName: keyof DocumentEventMap = 'click') => {
  
  const onClickAwayRef = useRef(onClickAway)
  const ref = useRef<any>()

  const handler = (e: any) => {
    e.preventDefault()
    if (!ref.current || ref.current.contains(e.target)) return
    onClickAwayRef.current(e)
  }

  useEffect(() => {
    document.addEventListener(eventName, handler)
    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [])
  return {
    ref
  }
}