import { EditOutlined, EllipsisOutlined, SettingOutlined, DownloadOutlined } from "@ant-design/icons"
import { Avatar, Card, Col, Row, Spin, Statistic } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import SearchContainer from "../../../../components/search/container"
import SearchHeader from "../../../../components/search/header"

const { Meta } = Card


const SearchApplication = () => {
  const [list, setList] = useState<any[]>([])

  const getList = () => {
    axios.get('https://proapi.azurewebsites.net//api/fake_list?count=8').then((res: any) => {
      setList(res.data.data.list)
    })
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      <SearchHeader title="搜索列表（应用）"></SearchHeader>
      <SearchContainer showOwner={false}></SearchContainer>
      <br />
      {
        list.length ?
          <Row gutter={12}>
            {list.map((item: any) => {
              return (
                <Col key={item.id} span={6} style={{ marginBottom: 12 }}>
                  <Card
                    hoverable
                    actions={[
                      <DownloadOutlined key="download" />,
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}>
                    <Meta
                      avatar={<Avatar size='small' src={item.avatar} />}
                      title={item.title}
                    />
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1}}>
                        <Statistic title="活跃用户" suffix='万' value={Math.ceil(item.activeUser / 10000)} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1}}>
                        <Statistic title="新增用户" value={item.newUser} />
                      </div>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row> : <Spin />
      }
    </div>
  )
}

export default SearchApplication
