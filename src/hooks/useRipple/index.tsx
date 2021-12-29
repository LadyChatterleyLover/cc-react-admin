import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

export const useRipple = () => {
  const ref = useRef<any>()
  const span = document.createElement('span')
  span.className = styles['cc--ripple--content']

  const handler = (e: MouseEvent) => {
    if (ref.current.contains(e.target)) {
      ref.current.appendChild(span)
      ref.current.classList.add(styles['cc--ripple--wrap'])

      span.classList.add(styles['cc--ripple--animation'])
      span.style.width = ref.current.offsetWidth + 'px'
      span.style.height = ref.current.offsetHeight + 'px'
      span.style.top = -(ref.current.offsetHeight / 2 - e.offsetY) + 'px'
      span.style.left = -(ref.current.offsetWidth / 2 - e.offsetX) + 'px'

      setTimeout(() => {
        span.classList.remove(styles['cc--ripple--content--ripple'])
        ref.current.classList.remove(styles['cc--ripple--wrap'])
        ref.current.removeChild(span)
      }, 500)
    }
  }


  useEffect(() => {
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  return {
    ref
  }
}