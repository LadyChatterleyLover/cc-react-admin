import { PageHeader, Card, Steps, Form, Select, Input, Row, Col, InputNumber, Button, message, Alert, Result, Divider } from 'antd'
import { useState } from 'react'
import './index.scss'

const { Step } = Steps
const { Option } = Select

const StepForm = () => {
  let [current, setCurrent] = useState<number>(0)
  const [form] = Form.useForm()
  const [payForm] = Form.useForm()
  const [values, setValues] = useState<any>({})

  const next = () => {
    if (current === 0) {
      form.validateFields().then(() => {
        const formValues = form.getFieldsValue()
        setValues({ ...formValues })
        setCurrent(current + 1)
      }).catch(() => {
        message.error('表单填写有误,请检查')
      })
    }
    if (current === 1) {
      payForm.validateFields().then(() => {
        setCurrent(current + 1)
      }).catch(() => {
        message.error('表单填写有误,请检查')
      })
    }
  }
  const pre = () => {
    setCurrent(current - 1)
  }
  const again = () => {
    setCurrent(0)
  }

  const FormContainer = (
    <Form form={form} layout='vertical' wrapperCol={{ span: 15 }}>
      <Form.Item
        label='付款账户'
        name="payment"
        initialValue='cc-design@alipay.com'
        rules={[{ required: true, message: '请选择付款账户' }]}>
        <Select allowClear placeholder='请选择付款账户'>
          <Option value='cc'>cc-design@alipay.com</Option>
        </Select>
      </Form.Item>
      <Row>
        <Col span={5}>
          <Form.Item
            wrapperCol={{ span: 24 }}
            initialValue='alipay'
            name='mode'
            rules={[{ required: true, message: '请选择支付方式' }]}
          >
            <Select style={{ width: '100%' }} allowClear placeholder='请选择'>
              <Option value="alipay">支付宝</Option>
              <Option value="bank">银行</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={17} offset={1} >
          <Form.Item
            initialValue='text@example.com'
            wrapperCol={{ span: 13 }}
            name='account'
            rules={[{ required: true, message: '请输入收款人账户' }]}>
            <Input allowClear placeholder="text@example.com" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label='收款人姓名'
        name='username'
        rules={[{ required: true, message: '请输入收款人姓名' }]}
        initialValue='cc'
      >
        <Input allowClear placeholder="请输入收款人姓名" />
      </Form.Item>
      <Form.Item
        label='转账金额'
        name='money'
        rules={[{ required: true, message: '请输入转账金额' }]}
        initialValue='500'
      >
        <InputNumber style={{ width: '100%' }} placeholder="请输入转账金额" />
      </Form.Item>
    </Form>
  )
  const Info = (
    <div>
      <Alert closable message="确认转账后，资金将直接打入对方账户，无法退回。" type="info" showIcon />
      <br />
      <div className='cc-form-step-info'>
        <Row className='cc-form-step-info-item'>
          <Col span={10} className='cc-form-step-info-item-label'>付款账户</Col>
          <Col span={14} className='cc-form-step-info-item-value'>{values.payment}</Col>
        </Row>
        <Row className='cc-form-step-info-item'>
          <Col span={10} className='cc-form-step-info-item-label'>收款账户</Col>
          <Col span={14} className='cc-form-step-info-item-value'>{values.account}</Col>
        </Row>
        <Row className='cc-form-step-info-item'>
          <Col span={10} className='cc-form-step-info-item-label'>收款人姓名</Col>
          <Col span={14} className='cc-form-step-info-item-value'>{values.username}</Col>
        </Row>
        <Row className='cc-form-step-info-item'>
          <Col span={10} className='cc-form-step-info-item-label'>转账金额</Col>
          <Col span={14} className='cc-form-step-info-item-value'>
            <span style={{ fontSize: 20 }}>{Number(values.money).toFixed(2)}</span> 元
          </Col>
        </Row>
      </div>
      <Divider />
      <br />
      <Form form={payForm} layout='vertical' wrapperCol={{ span: 15 }}>
        <Form.Item label='支付密码' name='password' rules={[{ required: true, message: '支付密码不能为空' }]}>
          <Input.Password placeholder='请输入支付密码' allowClear />
        </Form.Item>
      </Form>
    </div>
  )

  const Success = (
    <div>
      <Result
        status="success"
        title="操作成功"
        subTitle="预计两小时内到账"
        extra={[
          <Button type="primary" key="again" onClick={again}>再转一笔</Button>,
          <Button key="check">查看账单</Button>,
        ]}
      >
        <div className='cc-form-step-result'>
          <div style={{ paddingBottom: 16 }}>
            <span>付款账户: </span>
            <span style={{ marginLeft: 6 }}>{values.payment}</span>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <span >收款账户: </span>
            <span>{values.account}</span>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <span>收款人姓名: </span>
            <span style={{ marginLeft: 6 }}>{values.username}</span>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <span>转账金额: </span>
            <span style={{ fontSize: 20, marginLeft: 6 }}>{Number(values.money).toFixed(2)}</span> 元
          </div>
        </div>
      </Result>
    </div>
  )

  return (
    <div>
      <PageHeader title='分步表单' ghost={false}>
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成
      </PageHeader>
      <br />
      <Card>
        <div style={{ maxWidth: 960, margin: 'auto' }}>
          <Steps current={current}>
            <Step title='填写转账信息'></Step>
            <Step title='确认转账信息'></Step>
            <Step title='完成'></Step>
          </Steps>
        </div>
        <br />
        <div className='cc-form-step-container'>
          {current === 0 ?
            FormContainer : current === 1 ? Info : Success

          }
          {
            current > 0 && current <= 1 ? <Button style={{ marginRight: 10 }} onClick={pre}>上一步</Button> : null
          }
          {
            current <= 1 ? <Button type="primary" onClick={next}>下一步</Button> : null
          }
        </div>
        <Divider />
        <div>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
          <h4>转账到银行卡</h4>
          <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        </div>
      </Card>
    </div>
  )
}

export default StepForm
