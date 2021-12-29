import { Col } from "antd"
import { ReactNode, useContext } from "react"
import Context from "../context"
import './index.scss'

export interface StandardListDescItemProps {
  title: ReactNode,
  desc: ReactNode
}


const StandardListDescItem = (props: StandardListDescItemProps) => {
  const { title, desc } = props
  const length = useContext(Context)
  return (
    <Col span={24 / length} className="cc-standard-list-desc-item cc-standard-list-desc-item-border">
      <div className="cc-standard-list-desc-item-title">{title}</div>
      <div className="cc-standard-list-desc-item-desc">{desc}</div>
    </Col>
  )
}

export default StandardListDescItem
