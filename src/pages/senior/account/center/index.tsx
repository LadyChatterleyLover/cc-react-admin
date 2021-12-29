import axios from 'axios'
import { Row, Col, Card, Avatar, Divider, Tag, Input, Tabs, Skeleton, List, Space } from 'antd'
import { useState, useEffect } from 'react'
import './index.scss'
import { ClusterOutlined, ContactsOutlined, HomeOutlined, LikeOutlined, MessageOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { TabPane } = Tabs

const AccountCenter = () => {
  const [user, setUser] = useState<any>(null)
  const [tagValue, setTagValue] = useState<string>('')
  const [inputVisible, setInputVisible] = useState<boolean>(false)
  const [list, setList] = useState<any[]>([])

  const getUser = () => {
    axios.get('https://proapi.azurewebsites.net//api/currentUserDetail').then((res: any) => {
      setUser(res.data.data)
    })
  }
  const getList = () => {
    axios.get('https://proapi.azurewebsites.net//api/fake_list_Detail?count=30').then((res: any) => {
      setList(res.data.data.list)
    })
  }

  useEffect(() => {
    getUser()
    getList()
  }, [])

  const changeTagValue = (e: any) => {
    setTagValue(e.target.value)
  }
  const tagValueBlur = () => {
    user.tags.push({
      key: String(user.tags.length),
      label: tagValue
    })
    setUser({ ...user })
    setInputVisible(false)
  }
  return (
    <Row gutter={20}>
      <Col span={7}>
        <Card>
          {
            user ?
              <>
                <div className='cc-account-center-info'>
                  <div>
                    <Avatar src={user.avatar} style={{ width: 104, height: 104 }} />
                  </div>
                  <div className='cc-account-center-info-name'>{user.name}</div>
                  <div>{user.signature}</div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ marginRight: 8 }}><ContactsOutlined /></span>
                  {user.title}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ marginRight: 8 }}><ClusterOutlined /></span>
                  {user.group}
                </div>
                <div>
                  <span style={{ marginRight: 8 }}><HomeOutlined /></span>
                  {user.geographic.province.label}{user.geographic.city.label}
                </div>
                <Divider />
                <h4>标签</h4>
                <div>
                  {user.tags.map((item: any) => {
                    return (
                      <Tag key={item.key} style={{ marginBottom: 8 }}>{item.label}</Tag>
                    )
                  })}
                  {!inputVisible ?
                    <Tag
                      style={{ borderStyle: 'dashed' }}
                      onClick={() => setInputVisible(true)}>
                      <PlusOutlined />
                    </Tag>
                    : <Input
                      size='small'
                      style={{ width: 100 }}
                      onChange={(e) => changeTagValue(e)}
                      onBlur={tagValueBlur}
                    />}
                </div>
                <Divider />
                <h4>团队</h4>
                <Row gutter={8}>
                  {user.notice.map((item: any) => {
                    return (
                      <Col key={item.id} lg={24} xl={12}>
                        <div style={{ display: 'flex' }}>
                          <div style={{ marginRight: 12 }}><Avatar size='small' src={item.logo} /></div>
                          <div className='cc-account-center-info-team-item-member'>{item.member}</div>
                        </div>

                      </Col>
                    )
                  })}
                </Row>
              </> : <Skeleton />
          }
        </Card>
      </Col>
      <Col span={17}>
        <Card>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='文章(8)' key='1'>
              {
                list.length ?
                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={list}
                    renderItem={(item) => {
                      return (
                        <List.Item
                          key={item.id}
                          actions={[
                            <Space>
                              <span><StarOutlined style={{color: '#1890ff', marginRight: 3}} />{item.star}</span>
                              <span><LikeOutlined style={{ marginRight: 3}} /> {item.like}</span>
                              <span><MessageOutlined style={{ marginRight: 3}} /> {item.message}</span>
                             
                            </Space>,
                          ]}
                        >
                          <List.Item.Meta
                            title={item.title}
                            description={
                              <Space>
                                <Tag>Ant Design</Tag>
                                <Tag>设计语言</Tag>
                                <Tag>蚂蚁金服</Tag>
                              </Space>
                            }
                          />
                          {item.content}
                          <div style={{ marginTop: 12, color: 'rgba(0,0,0,.45)' }}>
                            <span><Avatar src={item.avatar} style={{ width: 20, height: 20 }} /></span>
                            <a style={{ margin: '0 8px' }}>{item.owner}</a>发布在&nbsp;
                            <a href={item.href}>{item.href}</a>
                            <span style={{ marginLeft: 16, color: 'rgba(0,0,0,.25)' }}>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                          </div>
                        </List.Item>
                      )
                    }}>

                  </List>
                  : <Skeleton />
              }
            </TabPane>
            <TabPane tab='应用(8)' key='2'></TabPane>
            <TabPane tab='项目(8)' key='3'></TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

export default AccountCenter
