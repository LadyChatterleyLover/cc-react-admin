import { Card, Image, Avatar } from "antd"
import CcGrid from "../../components/components/grid"

const { Meta } = Card

const Grid = () => {
  const list1 = [{}, {}, {}, {}, {}, {}]
  const list2 = [{}, {}, {}, {}, {}, {}, {}, {}]
  return (
    <Card>
      <h3>基础使用</h3>
      <br />
      <CcGrid>
        {list1.map((_, index) => {
          return (
            <CcGrid.Item
              key={index}
              text="首页"
              image={
                <Image
                  width={20}
                  height={20}
                  preview={false}
                  src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                />
              }></CcGrid.Item>
          )
        })}
      </CcGrid>
      <br />
      <br />
      <h3>设置行数</h3>
      <br />
      <CcGrid rows={4}>
        {list2.map((_, index) => {
          return (
            <CcGrid.Item
              key={index}
              text="首页"
              image={
                <Image
                  width={20}
                  height={20}
                  preview={false}
                  src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                />
              }></CcGrid.Item>
          )
        })}
      </CcGrid>
      <br />
      <br />
      <h3>自定义内容</h3>
      <br />
      <CcGrid>
        {list1.map((_, index) => {
          return (
            <CcGrid.Item key={index}>
              <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </CcGrid.Item>
          )
        })}
      </CcGrid>
    </Card>
  )
}

export default Grid
