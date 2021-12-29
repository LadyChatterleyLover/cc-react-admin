import { createElement, ReactNode } from 'react'
import { Tooltip } from 'antd'
import './index.scss'
import * as Icons from '@ant-design/icons'

export interface CcProps {
  title: string,
  tip: ReactNode,
  color?: string,
  titleColor?: string,
  titleSize?: string | number,
  icon?: ReactNode | string,
  iconColor?: string,
  iconSize?: string | number,
}

const CcDesc = (props: CcProps) => {
  const {
    title,
    tip,
    color = '',
    icon = 'ExclamationCircleOutlined',
    titleSize = 14,
    titleColor = 'rgba(0,0,0,.25)',
    iconSize = 14,
    iconColor = 'rgba(0,0,0,.25)'
  } = props

  return (
    <div className='cc-desc'>
      <div
        className='cc-desc-title'
        style={{ fontSize: titleSize + 'px', color: titleColor }}
      >{title}</div>
      <Tooltip title={tip} color={color}>
        {createElement((Icons as any)[icon as any], {
          style: {
            fontSize: iconSize + 'px', color: iconColor
          }
        })}
      </Tooltip>
    </div>
  )
}

export default CcDesc
