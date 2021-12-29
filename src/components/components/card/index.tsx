import { Card, Avatar } from 'antd'
import { CSSProperties, ReactNode } from 'react'

export interface CcCardProps {
  src: string,
  title: ReactNode,
  desc: ReactNode,
  author: ReactNode,
  time: ReactNode,
  style?: CSSProperties
}


const CcCard = (props: CcCardProps) => {
  const { src, title, desc, author, time, style } = props
  return (
    <Card hoverable style={style}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{marginRight: 15}}><Avatar src={src}></Avatar></div>
        <div>{title}</div>
      </div>
      <div style={{color: '#00000073',  marginTop: 6}}>{desc}</div>
      <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        color: '#00000073',
        fontSize: 14,
        marginTop: 6
        }}>
        <div>{author}</div>
        <div>{time}</div>
      </div>
    </Card>
  )
}

export default CcCard
