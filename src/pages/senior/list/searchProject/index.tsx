import { useState, useEffect } from 'react'
import SearchContainer from "../../../../components/search/container"
import SearchHeader from "../../../../components/search/header"
import axios from 'axios'
import { Avatar, Card, Col, Row, Spin } from 'antd'

const { Meta } = Card


const SearchProject = () => {
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
      <SearchHeader title="搜索列表（项目）"></SearchHeader>
      <SearchContainer showOwner={false}></SearchContainer>
      <br />
      <Row gutter={12}>
        {
          list.length ?
            list.map((item: any) => {
              return (
                <Col key={item.id} span={6} style={{ marginBottom: 20 }}>
                  <Card hoverable
                    cover={
                      <img
                        src={item.cover}
                      />
                    }>
                    <Meta
                      title={item.title}
                      description={
                        <span style={{ fontSize: 12 }}>{item.subDescription}</span>
                      }
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                      <div style={{color: 'rgba(0,0,0,.45)', fontSize: 12}}>1小时前</div>
                      <div>
                        <Avatar.Group>
                          {item.members.map((i: any, idx: number) => {
                            return (
                              <Avatar key='idx' size='small' src={i.avatar} />
                            )
                          })}
                        </Avatar.Group>
                      </div>
                    </div>
                  </Card>
                </Col>
              )
            })
            : <Spin />

        }
      </Row>
    </div>
  )
}

export default SearchProject
