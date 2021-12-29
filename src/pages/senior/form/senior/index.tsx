import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, PageHeader, Form, Input, Row, Col, Select, DatePicker, TimePicker, Popover, message, Table, Typography, Popconfirm } from 'antd'
import { ChangeEventHandler, useState } from 'react'
import './index.scss'


const { Option } = Select
const { RangePicker } = DatePicker

export interface FormError {
  name: string,
  label: string,
  errors: string,
}

interface Item {
  id: string,
  name: string,
  num: string,
  department: string,
}
const SeniorForm = () => {
  const [warehouseForm] = Form.useForm()
  const [taskForm] = Form.useForm()
  const [formErrors, setFormErrors] = useState<FormError[]>([])
  const [editingKey, setEditingKey] = useState('')
  const [tableData, setTableData] = useState<Item[]>([
    {
      id: '1',
      name: 'John Brown',
      num: '00001',
      department: 'New York No. 1 Lake Park'
    },
    {
      id: '2',
      name: 'Jim Green',
      num: '00002',
      department: 'London No. 1 Lake Park'
    },
    {
      id: '3',
      name: 'Joe Black',
      num: '00003',
      department: 'Sidney No. 1 Lake Park'
    }
  ])
  const [addFlag, setAddFlag] = useState<boolean>(false)

  const reset = () => {
    warehouseForm.resetFields()
    taskForm.resetFields()
    setFormErrors([])
  }

  const labels = [
    {
      name: "warehouseName",
      label: '仓库名'
    },
    {
      name: "warehouseWebsite",
      label: '仓库域名'
    },
    {
      name: "warehouseAdmin",
      label: '仓库管理员'
    },
    {
      name: "warehouseApprove",
      label: '审批人'
    },
    {
      name: "warehouseDate",
      label: '生效日期'
    },
    {
      name: "warehouseType",
      label: '仓库类型'
    },
    {
      name: "taskName",
      label: '任务名'
    },
    {
      name: "taskDesc",
      label: '任务描述'
    },
    {
      name: "taskImplement",
      label: '执行人'
    },
    {
      name: "taskLiable",
      label: '责任人'
    },
    {
      name: "taskDate",
      label: '生效日期'
    },
    {
      name: "taskType",
      label: '任务类型'
    },
  ]

  const submit = () => {
    const warehouseFormSubmit = warehouseForm.validateFields()
    const taskFormSubmit = taskForm.validateFields()
    Promise.all([warehouseFormSubmit, taskFormSubmit]).then(() => {
      message.success('提交成功')
    }).catch(() => {
      const warehouseFormErrs = warehouseForm.getFieldsError().map(item => {
        return {
          name: item.name[0],
          errors: item.errors[0],
          label: labels.find(i => item.name[0] === i.name)!.label
        }
      })
      const taskFormErrs = taskForm.getFieldsError().map(item => {
        return {
          name: item.name[0],
          errors: item.errors[0],
          label: labels.find(i => item.name[0] === i.name)!.label
        }
      })
      const errs: any = [...warehouseFormErrs, ...taskFormErrs]
      console.log(errs)
      setFormErrors([...errs])
      message.error('表单填写有误,请检查')
    })
  }

  const Content = (
    <div>
      {
        formErrors.map((item, index) => {
          return (
            <Row key={index} className='cc-senior-form-error'>
              <Col span={4}>
                <CloseCircleOutlined style={{ color: 'red' }} />
              </Col>
              <Col span={20}>{item.errors}</Col>
              <Col span={20} offset={4} className='cc-senior-form-error-label'>{item.label}</Col>
            </Row>
          )
        })
      }
    </div>
  )
  const isEditing = (record: Item) => record.id === editingKey

  const save = () => {
    setAddFlag(false)
    setEditingKey('')
  }
  const cancel = (record: Item) => {
    if (addFlag) {
      console.log(record)
      let data = tableData.filter(item => item.id !== record.id)
      setTableData([...data])
    }
    setEditingKey('')
  }
  const del = (record: Item) => {
    let data = tableData.filter(item => item.id !== record.id)
    setTableData([...data])
    setEditingKey('')
  }
  const edit = (record: Item) => {
    setEditingKey(record.id)
  }
  const add = () => {
    setAddFlag(true)
    tableData.push({
      id: String(tableData.length + 1),
      name: '',
      num: '',
      department: '',
    })
    setEditingKey(String(tableData.length))
    setTableData([...tableData])
  }

  const onChange = (e: any, record: any, field: string) => {
    record[field] = e.target.value
    setTableData([...tableData])
  }

  const columns: any[] = [
    {
      title: '成员姓名',
      key: 'name',
      dataIndex: 'name',
      render: (_: any, record: Item) => {
        return isEditing(record) ?
          <Input value={record.name} onChange={(e: any) => onChange(e, record, 'name')} />
          : <span>{record.name ? record.name : '-'}</span>
      }
    },
    {
      title: '工号',
      key: 'num',
      dataIndex: 'num',
      render: (_: any, record: Item) => {
        return isEditing(record) ?
          <Input value={record.num} onChange={(e: any) => onChange(e, record, 'num')} />
          : <span>{record.num ? record.num : '-'}</span>
      }
    },
    {
      title: '所属部门',
      key: 'department',
      dataIndex: 'department',
      render: (_: any, record: Item) => {
        return isEditing(record) ?
          <Input value={record.department} onChange={(e: any) => onChange(e, record, 'department')} />
          : <span>{record.department ? record.department : '-'}</span>
      }
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link onClick={save} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm title="删除此行?" onConfirm={() => del(record)} onCancel={() => cancel(record)}>
              <a>删除</a>
            </Popconfirm>
            <Typography.Link onClick={() => cancel(record)} style={{ marginLeft: 8 }}>
              取消
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      }
    }
  ]



  return (
    <div >
      <PageHeader title='高级表单' ghost={false}>
        高级表单常见于一次性输入和提交大批量数据的场景。
      </PageHeader>
      <br />
      <Card title='仓库管理'>
        <Form form={warehouseForm} layout='vertical'>
          <Row>
            <Col span={6}>
              <Form.Item
                label='仓库名'
                name='warehouseName'
                rules={[{ required: true, message: '请输入仓库名' }]}>
                <Input placeholder='请输入仓库名' allowClear />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='仓库域名'
                name='warehouseWebsite'
                rules={[{ required: true, message: '请输入仓库域名' }]}>
                <Input allowClear placeholder='请输入仓库域名' addonBefore="http://" addonAfter=".com" />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='仓库管理员'
                name='warehouseAdmin'
                rules={[{ required: true, message: '请选择仓库管理员' }]}>
                <Select placeholder='请选择仓库管理员' allowClear>
                  <Option value='admin1'>付晓晓</Option>
                  <Option value='admin2'>周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='审批人'
                name='warehouseApprove'
                rules={[{ required: true, message: '请选择仓库审批人' }]}>
                <Select placeholder='请选择仓库审批人' allowClear>
                  <Option value='approve1'>付晓晓</Option>
                  <Option value='approve2'>周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='生效日期'
                name='warehouseDate'
                rules={[{ required: true, message: '请选择生效日期' }]}>
                <RangePicker allowClear style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='仓库类型'
                name='warehouseType'
                rules={[{ required: true, message: '请选择仓库类型' }]}>
                <Select placeholder='请选择仓库类型' allowClear>
                  <Option value='private'>私密</Option>
                  <Option value='public'>公开</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card title='任务管理'>
        <Form form={taskForm} layout='vertical'>
          <Row>
            <Col span={6}>
              <Form.Item
                label='任务名'
                name='taskName'
                rules={[{ required: true, message: '请输入任务名' }]}>
                <Input placeholder='请输入任务名' allowClear />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='任务描述'
                name='taskDesc'
                rules={[{ required: true, message: '请输入任务描述' }]}>
                <Input placeholder='请输入任务描述' allowClear />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='执行人'
                name='taskImplement'
                rules={[{ required: true, message: '请选择执行人' }]}>
                <Select placeholder='请选择执行人' allowClear>
                  <Option value='implement1'>付晓晓</Option>
                  <Option value='implement2'>周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='责任人'
                name='taskLiable'
                rules={[{ required: true, message: '请选择责任人' }]}>
                <Select placeholder='请选择责任人' allowClear>
                  <Option value='liable1'>付晓晓</Option>
                  <Option value='liable2'>周毛毛</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='生效日期'
                name='taskDate'
                rules={[{ required: true, message: '请选择生效日期' }]}>
                <TimePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item
                label='任务类型'
                name='taskType'
                rules={[{ required: true, message: '请选择任务类型' }]}>
                <Select placeholder='请选择任务类型' allowClear>
                  <Option value='private'>私密</Option>
                  <Option value='public'>公开</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card title='成员管理'>
        <Table
          dataSource={tableData}
          columns={columns}
          rowKey='id'
          pagination={false} />
        <Button
          style={{ marginTop: 10 }}
          type='dashed'
          icon={<PlusOutlined />}
          block
          onClick={add}
        >添加一行数据</Button>
      </Card>
      <div className='cc-senior-form-footer'>
        {
          formErrors.length ?
            <Popover
              overlayClassName='senior-form-error-popover'
              title='表单验证信息'
              content={Content}
              trigger='click'>
              <div style={{ color: 'red', marginRight: 15, cursor: 'pointer' }}>
                <CloseCircleOutlined /><span style={{ position: 'relative', top: -1 }}>{formErrors.length}</span></div>
            </Popover>
            : null
        }
        <Button onClick={reset}>重置</Button>
        <Button type='primary' style={{ marginLeft: 10 }} onClick={submit}>提交</Button>
      </div>
    </div>
  )
}

export default SeniorForm
