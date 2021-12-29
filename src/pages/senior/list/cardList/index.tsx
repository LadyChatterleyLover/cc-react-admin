import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col, Card, Avatar, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Meta } = Card

const CardList = () => {
  const [list, setList] = useState<any[]>([])

  const getList = () => {
    axios.get('https://proapi.azurewebsites.net//api/card_fake_list?count=8').then((res: any) => {
      console.log(res.data)
      setList(res.data.data.list)
    })
  }

  useEffect(() => {
    getList()
  }, [])
  return (
    <Row gutter={8}>
      <Col span={6} >
        <div >
          <Button
           icon={<PlusOutlined />} 
           type="dashed" 
           style={{height: 209, width: '100%', color: 'rgba(0,0,0,.45)'}}>新增产品</Button>
        </div>
      </Col>
      {
        list.length ? list.map(item => {
          return (
            <Col 
            key={item.id} 
            span={6} 
            style={{marginBottom: 16}}>
              <Card
                hoverable
                actions={[
                  '操作一',
                  '操作二'
                ]}
              >
                <Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </Col>
          )
        }) : null
      }
    </Row>
  )
}

export default CardList
