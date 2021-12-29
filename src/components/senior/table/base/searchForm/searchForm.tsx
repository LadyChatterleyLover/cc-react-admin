import { Form, Row, Col, Input, Button, Select, DatePicker, FormInstance } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import './index.scss'
import { useState } from 'react'

const { Option } = Select

export interface SearchFormProps {
  onSearch?: (form: FormInstance) => void
}

const SearchForm = (props: SearchFormProps) => {
  const {onSearch} = props
  const [flag, setFlag] = useState<boolean>(false)
  const [form] = Form.useForm()
  const reset = () => {
    form.resetFields()
  }

  const search = () => {
    onSearch && onSearch(form)
  }

  return (
    <Form form={form}>
      <Row gutter={12}>
        <Col span={6}>
          <Form.Item name='name' label='规则名称'>
            <Input placeholder='请输入规则名称' allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='desc' label='描述'>
            <Input placeholder='请输入描述' allowClear />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name='callNo' label='服务调用次数'>
            <Input placeholder='请输入服务调用次数' allowClear />
          </Form.Item>
        </Col>
        {flag ? <Col span={6}>
          <Form.Item name='callNo' label='状态'>
            <Select placeholder='请选择状态'>
              <Option value="0">关闭</Option>
              <Option value="1">运行中</Option>
              <Option value="2">已上线</Option>
              <Option value="3">异常</Option>
            </Select>
          </Form.Item>
        </Col> : null}
        {
          flag ? <Col span={6}>
            <Form.Item label='上次调度时间' name='updatedAt'>
              <DatePicker showTime placeholder='请选择上次调度时间' format='YYYY-MM-DD HH:mm:ss' />
            </Form.Item>
          </Col> : null
        }
        <Col span={6} offset={flag ? 12 : 0}>
          <Form.Item name='name'>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div><Button onClick={reset}>重置</Button></div>
              <div><Button type='primary' style={{ marginLeft: 12 }} onClick={search}>查询</Button></div>
              <div style={{ cursor: 'pointer' }} onClick={() => setFlag(!flag)}>
                <Button type="link">{flag ? '收起' : '展开'}</Button>
                <DownOutlined
                  className={`cc-base-table-search-form-down-icon ${flag ? 'cc-base-table-search-form-rotate' : ''}`} />
              </div>
            </div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
