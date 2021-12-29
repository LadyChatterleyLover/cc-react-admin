import { useRef, useState, useEffect } from 'react'
import screenfull from 'screenfull'

export interface Options {
  onExit?: () => void
  onEnter?: () => void
}

export const useFullscreen = (target: HTMLElement = document.body, options?: Options) => {
  const { onExit, onEnter } = options || {}

  const onExitRef = useRef(onExit)
  const onEnterRef = useRef(onEnter)

  const [state, setState] = useState(false)

  const onChange = () => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull
      if (isFullscreen) {
        onEnterRef.current?.()
      } else {
        screenfull.off('change', onChange)
        onExitRef.current?.()
      }
      setState(isFullscreen)
    }
  }

  const enterFullscreen = () => {
    const el = target
    if (!el) {
      return
    }
    if (screenfull.isEnabled) {
      try {
        screenfull.request(el)
        screenfull.on('change', onChange)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const exitFullscreen = () => {
    if (!state) {
      return
    }
    if (screenfull.isEnabled) {
      screenfull.exit()
    }
  }

  const toggleFullscreen = () => {
    if (state) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }
  useEffect(() => {
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', onChange)
      }
    }
  }, [])
  return {
    isFullscreen: state,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isEnabled: screenfull.isEnabled
  }
}