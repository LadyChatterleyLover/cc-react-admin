import { RightOutlined } from '@ant-design/icons'
import { useState, MouseEvent } from 'react'
import './index.scss'


export interface CcRotateVerifyProps {
  src: string,
  title?: string,
  titleSize?: number,
  titleColor?: string,
  desc?: string,
  descSize?: number,
  descColor?: string,
  bgColor?: string,
  barWidth?: number,
  barHeight?: number,
  barBgColor?: string,
  barColor?: string,
  // 图片默认旋转角度
  // 取值范围： -330deg<angle <-30deg 或 30deg<angle<330deg
  angle?: number,
  // 误差范围
  errorRange?: number,
  onSuccess?: () => void
  onFail?: () => void
}


const CcRotateVerify = (props: CcRotateVerifyProps) => {
  const {
    src,
    title = '安全验证',
    titleSize = 14,
    titleColor = '#999',
    desc = '拖动滑块使图片角度为正',
    descSize = 16,
    descColor = '#333',
    barHeight = 45,
    barWidth = 270,
    barBgColor = 'rgba(86,119,252,.1)',
    barColor = '#5677fc',
    angle = 30,
    errorRange = 5,
    onSuccess,
    onFail
  } = props

  const [moving, setMoving] = useState<boolean>(false)
  const [rotate, setRotate] = useState(angle)
  const [startX, setStartX] = useState<number>(0)
  const [translateX, setTranslateX] = useState<number>(0)
  const [transitionDuration, setTransitionDuration] = useState<string>('0s')

  const handleMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setStartX(e.clientX)
    setTransitionDuration('0s')
    setMoving(true)
  }
  const handleMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (moving) {
      let move = e.clientX
      if (startX - move > 0) return
      let dis = barWidth - barHeight
      let x = -Math.floor(startX - move) >= dis ? dis : -Math.floor(startX - move)
      setTranslateX(x)
      let r = Math.floor(360 * (translateX / (barWidth - barHeight))) + angle
      setRotate(r)
    }
  }
  const handleMouseUp = () => {
    setMoving(false)
    let dis = barWidth - barHeight
    if (translateX < dis) {
      setTransitionDuration('0.6s')
      setTranslateX(0)
    } else {
      setTranslateX(dis)
    }
    if (rotate >= (360 - errorRange) && rotate <= (360 + errorRange)) {
      setRotate(angle)
      onSuccess && onSuccess()
    } else {
      setTransitionDuration('0.6s')
      setRotate(angle)
      onFail && onFail()
    }
  }

  return (
    <div className="cc-rotate-verify">
      <div className="cc-rotate-verify-title"
        style={{ color: titleColor, fontSize: titleSize }}>{title}</div>
      <div className="cc-rotate-verify-desc"
        style={{ color: descColor, fontSize: descSize }}>{desc}</div>
      <div className="cc-rotate-verify-img"
        style={{ transform: `rotate(${rotate}deg)`, transitionDuration }}>
        <img src={src} className="cc-rotate-verify-img-image" />
      </div>
      <div className="cc-rotate-verify-bar"
        style={{ width: barWidth + 'px', height: barHeight + 'px', background: barBgColor }}>
        <div
          className="cc-rotate-verify-bar-wrap"
          style={{ background: barColor, width: barHeight + 'px', height: barHeight + 'px', transitionDuration, transform: `translateX(${translateX}px)` }}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={handleMouseUp}
        >
          <div className="cc-rotate-verify-bar-wrap-arrow">
            <RightOutlined style={{ fontSize: 14, color: '#fff' }} />
          </div>
          <div className="cc-rotate-verify-bar-wrap-arrow">
            <RightOutlined style={{ fontSize: 14, color: '#fff' }} />
          </div>
        </div>
      </div >
    </div >
  )
}

export default CcRotateVerify
