import * as Icons from '@ant-design/icons'
import { RightOutlined } from '@ant-design/icons'
import { useState, createElement, MouseEvent, forwardRef, useImperativeHandle } from 'react'
import './index.scss'


export interface CcSlideVerifyProps {
  tip?: string,
  // 滑块条宽度
  slideWidth?: number,
  // 滑块条高度
  slideHeight?: number,
  // 滑块背景颜色
  bgColor?: string,
  // 验证之后的滑块背景颜色
  activeBgColor?: string,
  // 图标颜色
  iconColor?: string,
  // 验证成功之后图标颜色
  activeIconColor?: string,
  // 图标大小
  iconSize?: number,
  // 字体大小
  fontSize?: number,
  // 成功图标
  successIcon?: string,
  onSuccess?: () => void,
  reset?: () => void
}


const CcSlideVerify = forwardRef((props: CcSlideVerifyProps, _ref: any) => {
  const {
    tip = '拖动滑块验证',
    slideWidth = 300,
    slideHeight = 30,
    bgColor = '#E9E9E9',
    activeBgColor = '#19be6b',
    iconColor = '#cbcbcb',
    activeIconColor = '#19be6b',
    iconSize = 14,
    fontSize = 14,
    successIcon = 'CheckCircleOutlined',
    onSuccess
  } = props

  const [moving, setMoving] = useState<boolean>(false)
  // 验证之后滑块宽度
  const [activeBarWidth, setActiveBarWidth] = useState<number>(0)
  const [transitionDuration, setTransitionDuration] = useState<string>('0.6s')
  const [startX, setStartX] = useState<number>(0)
  const [status, setStatus] = useState<string>('none')

  const handleMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setStartX(e.clientX)
    setTransitionDuration('0s')
    setMoving(true)
  }
  const handleMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (moving) {
      let move = e.clientX
      if (startX - move > 0) return
      let dis = slideWidth - 40
      let w = -Math.floor(startX - move) >= dis ? dis : -Math.floor(startX - move)
      setActiveBarWidth(w)
    }
  }
  const handleMouseUp = () => {
    setMoving(false)
    setTransitionDuration('0.6s')
    let dis = slideWidth - 40
    if (activeBarWidth < dis) {
      setActiveBarWidth(0)
    } else {
      setActiveBarWidth(dis)
      setStatus('done')
      onSuccess && onSuccess()
      return
    }
  }

  return (
    <div className="cc-slide-verify"
      style={{
        width: slideWidth + 'px',
        height: slideHeight + 'px',
        fontSize, background: bgColor
      }}
    >
      <div className="cc-slide-verify-content"
        style={{ background: activeBgColor, width: activeBarWidth + 'px', transitionDuration }}>
        <div className="cc-slide-verify-content"
          style={{ width: slideWidth + 'px', height: slideHeight + 'px', fontSize }}>{tip}</div>
      </div>
      <div
        className="cc-slide-verify-drag"
        style={{ transitionDuration, transform: `translateX(${activeBarWidth}px)` }}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={handleMouseUp}
      >
        {
          status === 'none' ?
            <>
              <div className="cc-rotate-verify-bar-wrap-arrow">
                <RightOutlined style={{ fontSize: 14, color: iconColor }} />
              </div>
              <div className="cc-rotate-verify-bar-wrap-arrow">
                <RightOutlined style={{ fontSize: 14, color: iconColor }} />
              </div>
            </> :
            <div className="cc-slide-verify-drag-check">
              {createElement((Icons as any)[successIcon], {
                style: {
                  color: activeIconColor,
                  size: iconSize
                }
              })}
            </div >
        }
      </div>
      <div>{tip}</div>
    </div>
  )
})

export default CcSlideVerify
