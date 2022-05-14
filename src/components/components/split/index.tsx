import { useState, useRef, useMemo, ReactNode } from "react"
import "./index.scss"

export interface Props {
  direction?: "horizontal" | "vertical"
  size?: number
  min?: number
  max?: number
  onMoveStart?: (e: any) => void
  onMoving?: (e: any) => void
  onMoveEnd?: (e: any) => void
  leftNode?: ReactNode
  rightNode?: ReactNode
}

const CcSplit = (props: Props) => {
  const {
    direction = "horizontal",
    size = 0,
    min = 0,
    max = 1,
    onMoveStart,
    onMoving,
    onMoveEnd,
    leftNode,
    rightNode,
  } = props

  const [value, setValue] = useState<number>(size)
  const moving = useRef<boolean>(false)
  const container = useRef<HTMLDivElement | null>(null)

  const triggerStyle = useMemo(() => {
    if (direction === "horizontal") {
      return {
        width: "6px",
        height: "100%",
      }
    } else {
      return {
        width: "100%",
        height: "6px",
      }
    }
  }, [direction])

  const triggerBarStyle = useMemo(() => {
    if (direction === "horizontal") {
      return {
        width: "4px",
        height: "1px",
        marginTop: "3px",
      }
    } else {
      return {
        height: "6px",
        width: "1px",
        marginRight: "3px",
      }
    }
  }, [direction])

  const flexBasis = useMemo(() => `calc(${value * 100}% - 3px)`, [value])

  const mousedown = (e: any) => {
    moving.current = true
    document.addEventListener("mousemove", mousemove)
    document.addEventListener("mouseup", mouseup)
    onMoveStart?.(e)
  }
  const mousemove = (e: any) => {
    if (!moving.current) return
    if (direction === "horizontal") {
      const width = container.current!.getBoundingClientRect().width
      const left = container.current!.getBoundingClientRect().left
      setValue((e.pageX - left) / width)
      if (value <= min!) {
        setValue(min)
      }
      if (value >= max!) {
        setValue(max)
      }
    } else {
      const height = container.current!.getBoundingClientRect().height
      const top = container.current!.getBoundingClientRect().top
      setValue((e.pageY - top) / height)
      if (value <= min!) {
        setValue(min)
      }
      if (value >= max) {
        setValue(max)
      }
    }
    onMoving?.(e)
  }

  const mouseup = (e: any) => {
    moving.current = false
    document.removeEventListener("mousemove", mousemove)
    document.removeEventListener("mouseup", mouseup)
    onMoveEnd?.(e)
  }

  return (
    <div
      className="cc-split-container"
      ref={container}
      style={{ flexDirection: direction === "horizontal" ? "row" : "column" }}>
      <div className="cc-split-container-left" style={{ flexBasis }}>
        {leftNode}
      </div>
      <div className="cc-split-container-trigger" style={{ ...triggerStyle }} onMouseDown={(e) => mousedown(e)}>
        <div
          className="cc-split-container-trigger-wrapper"
          style={{ ...triggerStyle, flexDirection: direction === "horizontal" ? "column" : "row" }}>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
          <div className="cc-split-container-trigger-wrapper-bar" style={triggerBarStyle}></div>
        </div>
      </div>
      <div className="cc-split-container-right">{rightNode}</div>
    </div>
  )
}

export default CcSplit
