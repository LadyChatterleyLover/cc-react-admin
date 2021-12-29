import { useEffect, useRef } from 'react'
import { CountUpOptions, CountUp } from 'countup.js'

export interface Options {
  autoplay?: boolean,
  endValue: number,
  options?: CountUpOptions
}

export const useCountup = (opts: Options) => {
  const { endValue, options, autoplay = true } = opts
  const ref = useRef<any>()
  const countUp = useRef<CountUp>()

  const start = (callback?: (args?: any) => any) => {
    countUp.current!.start(callback)
  }

  const pauseResume = () => {
    countUp.current!.pauseResume()
  }
  const reset = () => {
    countUp.current!.reset()
  }
  const update = (val: number) => {
    countUp.current!.update(val)
  }

  useEffect(() => {
    countUp.current = new CountUp(ref.current!, endValue, options)
    if (autoplay) {
      if (!countUp.current.error) {
        countUp.current.start()
      }
    }
  }, [])
  return {
    ref,
    start,
    pauseResume,
    reset,
    update
  }
}