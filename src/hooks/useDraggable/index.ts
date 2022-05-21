import { useRef, useEffect } from 'react'
export interface Position {
  x: number
  y: number
}

export interface UseDraggableOptions {
  initValue?: Position
  onStart?: (position: Position, event: PointerEvent) => void | false
  onMove?: (position: Position, event: PointerEvent) => void
  onEnd?: (position: Position, event: PointerEvent) => void
}

export const useDraggable = (options?: UseDraggableOptions) => {
  const position = useRef<Position>(options?.initValue || { x: 0, y: 0 })
  const pressedDelta = useRef<Position>()
  const target = useRef<any>()
  const targetPosition = useRef<string>('')
  const targetCursor = useRef<string>('')

  const start = (e: PointerEvent) => {
    e.preventDefault()
    const rect = target.current!.getBoundingClientRect()
    const pos = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    }
    target.current!.style.position = (target.current!.style.position && target.current!.style.position !== 'relative') ||  'absolute'
    target.current!.style.cursor = 'move'
    pressedDelta.current = pos
    options?.onStart?.(position.current, e)
  }
  const move = (e: PointerEvent) => {
    e.preventDefault()
    if (!pressedDelta.current) return
    position.current = {
      x: e.pageX - pressedDelta.current.x,
      y: e.pageY - pressedDelta.current.y,
    }
    target.current.style.left = position.current.x + 'px'
    target.current.style.top = position.current.y + 'px'
    options?.onMove?.(position.current, e)
  }
  const end = (e: PointerEvent) => {
    pressedDelta.current = undefined
    options?.onEnd?.(position.current, e)
    target.current!.style.cursor = targetCursor.current
    e.preventDefault()
  }
  useEffect(() => {
    targetPosition.current = target.current!.style.position
    targetCursor.current = target.current!.style.cursor
    target.current!.addEventListener('pointerdown', start)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
    }
  }, [])
  return [target]
}