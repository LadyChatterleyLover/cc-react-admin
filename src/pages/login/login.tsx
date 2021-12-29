import { Form, Input, Button, Checkbox, Tabs, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined, AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import './index.scss'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const { TabPane } = Tabs


const Login = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState<string>('account')
  const [btnText, setBtnText] = useState<string>('获取验证码')
  const [flag, setFlag] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [accountForm] = Form.useForm()
  const [mobileForm] = Form.useForm()

  const login = () => {
    if (activeKey === 'account') {
      accountForm.validateFields().then(() => {
        setLoading(true)
        const values = accountForm.getFieldsValue()
        axios.post('https://proapi.azurewebsites.net//api/login/account', {
          autoLogin: true,
          password: values.password,
          type: "account",
          username: values.username,
        }).then((res: any) => {
          if (res.data.status === 'ok') {
            setLoading(false)
            message.success('登录成功')
            navigate('/')
          } else {
            message.error('登录失败')
          }
        })
      }).catch(() => {
        message.error('表单填写有误,请检查')
      })
    } else {
      mobileForm.validateFields().then(() => {
        const values = mobileForm.getFieldsValue()
        axios.post('https://proapi.azurewebsites.net//api/login/account', {
          autoLogin: true,
          captcha: values.captcha,
          type: "mobile",
          mobile: values.mobile,
        }).then((res: any) => {
          if (res.data.status === 'ok') {
            setLoading(false)
            message.success('登录成功')
            navigate('/')
          } else {
            message.error('登录失败')
          }
        })
      }).catch(() => {
        message.error('表单填写有误,请检查')
      })
    }
  }
  const getCode = () => {
    mobileForm.validateFields(['mobile']).then(() => {
      setFlag(true)
      let time = 60
      setBtnText(`${time}秒之后重新获取`)
      let timer = setInterval(() => {
        time--
        setBtnText(`${time}秒之后重新获取`)
        if (time === 0) {
          clearTimeout(timer)
          setBtnText('重新获取')
          setFlag(false)
        }
      }, 1000)
      setTimeout(() => {
        message.success('获取验证码成功！验证码为：1234')
      }, 2000)
    }).catch(() => {
      message.error('请先输入手机号')
    })
  }

  return (
    <div className='cc-admin-login-container'>
      <div className='cc-admin-login-container-content'>
        <div className='cc-admin-login-container-content-title'>
          Cc Admin
        </div>
        <div className='cc-admin-login-container-content-desc'>
          Cc Design 是西湖区最具影响力的 Web 设计规范
        </div>
        <div className='cc-admin-login-container-main'>
          <Tabs activeKey={activeKey} onChange={(key: string) => setActiveKey(key)} centered>
            <TabPane key='account' tab='账户密码登录'>
              <Form
                size='large'
                form={accountForm}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="用户名: admin or user" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="密码: ant.design"
                  />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>自动登录</Checkbox>
                  </Form.Item>
                  <div>
                    <a>忘记密码</a>
                  </div>
                </div>
                <Form.Item>
                  <Button loading={loading} onClick={login} style={{ marginTop: 12 }} type="primary" htmlType="submit" block>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane key='mobile' tab='手机号登录'>
              <Form
                size='large'
                form={mobileForm}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="mobile"
                  rules={[{ required: true, message: '请输入手机号' }]}
                >
                  <Input prefix={<MobileOutlined />} placeholder="请输入手机号" />
                </Form.Item>
                <Row>
                  <Col span={!flag ? 15 : 11}>
                    <Form.Item
                      name="captcha"
                      rules={[{ required: true, message: '请输入验证码' }]}
                    >
                      <Input
                        prefix={<LockOutlined />}
                        placeholder="请输入验证码"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={!flag ? 8 : 12} offset={1}>
                    <Button onClick={getCode} block disabled={flag}>{btnText}</Button>
                  </Col>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>自动登录</Checkbox>
                  </Form.Item>
                  <div>
                    <a>忘记密码</a>
                  </div>
                </div>
                <Form.Item>
                  <Button loading={loading} onClick={login} style={{ marginTop: 12 }} type="primary" block>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
        <div className='cc-admin-login-container-footer'>
          <div>其他登录方式:</div>
          <div>
            <AlipayCircleOutlined
              style={{ color: 'rgba(0,0,0,.2)', fontSize: 24, marginLeft: 8, marginTop: 6 }} />
          </div>
          <div>
            <TaobaoCircleOutlined
              style={{ color: 'rgba(0,0,0,.2)', fontSize: 24, marginLeft: 8, marginTop: 6 }} />
          </div>
          <div>
            <WeiboCircleOutlined
              style={{ color: 'rgba(0,0,0,.2)', fontSize: 24, marginLeft: 8, marginTop: 6 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
