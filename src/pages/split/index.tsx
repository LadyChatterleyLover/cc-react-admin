import { Card } from "antd"
import CcSplit from "../../components/components/split"

const Split = () => {
  let size1 = 0.5
  let size2 = 0.5
  let size3 = 0.5
  let size4 = 0.5
  return (
    <Card>
      <h3>基础使用</h3>
      <br />
      <div style={{ height: 200, width: 500, background: "#f0f0f0" }}>
        <CcSplit size={size1} leftNode="left" rightNode="right"></CcSplit>
      </div>
      <br />
      <br />
      <h3>垂直方向</h3>
      <br />
      <div style={{ height: 200, width: 500, background: "#f0f0f0" }}>
        <CcSplit size={size2} direction="vertical" leftNode="top" rightNode="bottom"></CcSplit>
      </div>
      <br />
      <br />
      <h3>组合使用</h3>
      <br />
      <div style={{ height: 200, width: 500, background: "#f0f0f0" }}>
        <CcSplit
          size={size3}
          leftNode="left"
          rightNode={<CcSplit direction="vertical" size={size4} leftNode="top" rightNode="bottom"></CcSplit>}></CcSplit>
      </div>
    </Card>
  )
}

export default Split
