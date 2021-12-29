import { Avatar, Card, List, Button, Row, Col, Progress, Pagination } from 'antd'
import StandardListDesc from '../../../../components/senior/list/standard'
import axios from 'axios'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

const { Item } = StandardListDesc

const StandardList = () => {
  const [list, setList] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)

  const getList = () => {
    axios.get('https://proapi.azurewebsites.net//api/get_list?count=50').then((res: any) => {
      setList(res.data.data.list)
    })
  }
  useEffect(() => {
    getList()
  }, [])

  const onChange = (page: number, size: number) => {
    setCurrent(page)
    setPageSize(size)
  }
  const onShowSizeChange = (page: number, size: number) => {
    setCurrent(page)
    setPageSize(size)
  }

  return (
    <>
      <Card>
        <StandardListDesc>
          <Item title='我的待办' desc='8个任务'></Item>
          <Item title='本周任务平均处理时间' desc='32分钟'></Item>
          <Item title='本周完成任务数' desc='24个任务'></Item>
        </StandardListDesc>
      </Card>
      <br />
      <Card>
        <List
          itemLayout="horizontal"
          loading={!list || !list.length}
          dataSource={list.slice((current - 1) * pageSize, current * pageSize)}
          renderItem={(item) => (
            <List.Item
              actions={
                [
                  <Button type='link'>编辑</Button>,
                  <Button type='link'>更多</Button>
                ]
              }>
              <List.Item.Meta
                avatar={<Avatar shape='square' size='large' src={item.avatar} />}
                title={item.title}
                description={item.subDescription}
              />
              <Row gutter={40} style={{ width: 500 }}>
                <Col span={4} style={{ color: 'rgba(0,0,0,.45)', fontSize: 14 }}>
                  <div>owner</div>
                  <div>{item.owner}</div>
                </Col>
                <Col span={10} style={{ color: 'rgba(0,0,0,.45)', fontSize: 14 }}>
                  <div>创建时间</div>
                  <div>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                </Col>
                <Col span={10} style={{ display: 'flex', alignItems: 'center' }}>
                  <Progress status={item.status} percent={item.percent}></Progress>
                </Col>
              </Row>
            </List.Item>
          )}
        />
        {
          list.length ? 
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <Pagination
              showQuickJumper
              current={current}
              pageSize={pageSize}
              total={list.length}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
            />
          </div> : null
        }
      </Card>
    </>
  )
}

export default StandardList
