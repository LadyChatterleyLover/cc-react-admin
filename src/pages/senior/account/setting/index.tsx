import { Card, Row, Col, Tabs, Form, Input, Skeleton, Select, Button, message, Avatar, Upload, List, Switch } from 'antd';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AlipayOutlined, DingdingOutlined, TaobaoOutlined, UploadOutlined } from '@ant-design/icons'

const { TabPane } = Tabs

interface Province {
  id: number,
  name: string
}
interface City {
  id: number,
  name: string,
  province: string,
}

const AccountSetting = () => {
  const [user, setUser] = useState<any>(null)
  const [province, setProvince] = useState<Province[]>([])
  const [city, setCity] = useState<City[]>([])


  const [form] = Form.useForm()

  const getUser = () => {
    axios.get('https://proapi.azurewebsites.net//api/accountSettingCurrentUser').then((res: any) => {
      res.data.data.country = '中国'
      res.data.data.province = undefined
      res.data.data.city = undefined
      setUser(res.data.data)
    })
  }
  const getProvince = () => {
    axios.get('https://proapi.azurewebsites.net//api/geographic/province').then((res: any) => {
      setProvince(res.data.data)
    })
  }

  useEffect(() => {
    getUser()
    getProvince()
  }, [])

  const changeProvince = (val: number) => {
    axios.get(`https://proapi.azurewebsites.net//api/geographic/city/${val}`).then((res: any) => {
      setCity(res.data.data)
    })
    if (val) user.province = province.find((item => item.id === val))!.name
    else {
      user.province = undefined
      form.resetFields(['city'])
    }
    setUser({ ...user })
  }
  const submit = () => {
    form.validateFields().then(() => {
      message.success('更新成功')
    }).catch(() => {
      message.error('表单填写有误,请检查')
    })
  }
  const safeData = [
    {
      title: '账户密码',
      description: '当前密码强度：强'
    },
    {
      title: '密保手机',
      description: '已绑定手机：138****8293'
    },
    {
      title: '密保问题',
      description: '未设置密保问题，密保问题可有效保护账户安全'
    },
    {
      title: '备用邮箱',
      description: '已绑定邮箱：ant***sign.com'
    },
    {
      title: 'MFA 设备',
      description: '未绑定 MFA 设备，绑定后，可以进行二次确认'
    }
  ]
  const menuData = [
    {
      title: '绑定淘宝',
      description: '当前未绑定淘宝账号',
      avatar: <TaobaoOutlined style={{ color: '#ff4000', fontSize: 48 }} />
    },
    {
      title: '绑定支付宝',
      description: '当前未绑定支付宝账号',
      avatar: <AlipayOutlined style={{ color: '#2eabff', fontSize: 48 }} />
    },
    {
      title: '绑定钉钉',
      description: '当前未绑定钉钉账号',
      avatar: <DingdingOutlined style={{ color: '#2eabff', fontSize: 48 }} />
    }
  ]
  const messageData = [
    {
      title: '账户密码',
      description: '其他用户的消息将以站内信的形式通知'
    },
    {
      title: '系统消息',
      description: '系统消息将以站内信的形式通知'
    },
    {
      title: '待办任务',
      description: '待办任务将以站内信的形式通知'
    }
  ]
  return (
    <Card>
      <Tabs tabPosition='left' defaultActiveKey='1'>
        <TabPane tab='基本设置' key='1'>
          <Row>
            <Col span={14}>
              {
                user ?
                  <div>
                    <h2>基本设置</h2>
                    <Form
                      form={form}
                      initialValues={user}
                      layout='vertical'
                      wrapperCol={{ span: 15 }}>
                      <Form.Item
                        label='邮箱'
                        name='email'
                        rules={[{ required: true, message: '请输入您的邮箱' }]}>
                        <Input allowClear placeholder='请输入您的邮箱' />
                      </Form.Item>
                      <Form.Item
                        label='昵称'
                        name='name'
                        rules={[{ required: true, message: '请输入您的昵称' }]}>
                        <Input allowClear placeholder='请输入您的昵称' />
                      </Form.Item>
                      <Form.Item
                        label='简介'
                        name='signature'
                        rules={[{ required: true, message: '请输入您的简介' }]}>
                        <Input.TextArea rows={4} allowClear
                          placeholder='请输入您的简介' />
                      </Form.Item>
                      <Form.Item
                        label='国家/地区'
                        name='country'
                        rules={[{ required: true, message: '请选择您的国家/地区' }]}>
                        <Select placeholder='请选择您的国家/地区' allowClear>
                          <Select.Option value='china'>中国</Select.Option>
                        </Select>
                      </Form.Item>
                      <div style={{ marginBottom: 10 }}><span style={{ color: 'red' }}>*</span> 所在省市</div>
                      <Row gutter={15}>
                        <Col span={8}>
                          <Form.Item
                            wrapperCol={{ span: 24 }}
                            name='province'
                            rules={[{ required: true, message: '请选择您的省份' }]}>
                            <Select
                              placeholder='请选择您的省份'
                              allowClear
                              onChange={changeProvince}>
                              {
                                province.map(item => {
                                  return (
                                    <Select.Option
                                      key={item.id}
                                      value={item.id}>
                                      {item.name}
                                    </Select.Option>
                                  )
                                })
                              }
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            wrapperCol={{ span: 24 }}
                            name='city'
                            rules={[{ required: true, message: '请选择您的城市' }]}>
                            <Select
                              placeholder='请选择您的城市'
                              allowClear
                              disabled={!user.province}
                            >
                              {
                                city && city.map(item => {
                                  return (
                                    <Select.Option
                                      key={item.id}
                                      value={item.id}>
                                      {item.name}
                                    </Select.Option>
                                  )
                                })
                              }
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label='街道地址'
                        name='address'
                        rules={[{ required: true, message: '请输入您的街道地址' }]}>
                        <Input allowClear placeholder='请输入您的街道地址' />
                      </Form.Item>
                      <Form.Item
                        label='联系电话'
                        name='phone'
                        rules={[{ required: true, message: '请输入您的联系电话' }]}>
                        <Input allowClear placeholder='请输入您的联系电话' />
                      </Form.Item>
                      <Form.Item>
                        <Button type='primary' onClick={submit}>提交</Button>
                      </Form.Item>
                    </Form>
                  </div> : <Skeleton />
              }
            </Col>
            <Col span={10}>
              {
                user ?
                  <div style={{ margin: 40 }}>
                    <div>头像</div>
                    <Avatar style={{ width: 144, height: 144 }} src={user.avatar} />
                    <div style={{ marginTop: 15, marginLeft: 18 }}>
                      <Upload>
                        <Button icon={<UploadOutlined />}>更换头像</Button>
                      </Upload>
                    </div>
                  </div> : null
              }
            </Col>
          </Row>
        </TabPane>
        <TabPane tab='安全设置' key='2'>
          <List
            itemLayout="horizontal"
            dataSource={safeData}
            renderItem={item => (
              <List.Item extra={<Button type='link'>修改</Button>}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )} />
        </TabPane>
        <TabPane tab='账号绑定' key='3'>
          <List
            itemLayout="horizontal"
            dataSource={menuData}
            renderItem={item => (
              <List.Item extra={<Button type='link'>绑定</Button>}>
                <List.Item.Meta
                  avatar={
                    item.avatar
                  }
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )} />
        </TabPane>
        <TabPane tab='新消息通知' key='4'>
        <List
            itemLayout="horizontal"
            dataSource={messageData}
            renderItem={item => (
              <List.Item extra={<Switch defaultChecked checkedChildren='开' unCheckedChildren='关' />}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )} />
        </TabPane>
      </Tabs>
    </Card >
  )
}

export default AccountSetting
