import { Badge, Card, Input, Table } from 'antd'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { useTable } from '../../../../hooks/useTable'

interface Item {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,

}

interface Result {
  total: number,
  list: Item[]
}

const HooksTable = () => {
  const value = useRef<string>('')
  const getTableData = ({ current, pageSize }: { current: number, pageSize: number }): Promise<Result> => {
    let query = `page=${current}&size=${pageSize}$name=${value.current}`

    return fetch(`https://proapi.azurewebsites.net//api/rule?${query}`)
      .then((res) => res.json())
      .then((res) => {
        return {
          total: res.total,
          list: res.data,
        }
      })
  }

  const { tableProps, refresh } = useTable(getTableData)

  const columns: any[] = [
    {
      title: '规则名称',
      key: 'name',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '描述',
      key: 'desc',
      dataIndex: 'desc',
      align: 'center'
    },
    {
      title: '服务调用次数',
      key: 'callNo',
      dataIndex: 'callNo',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.callNo - b.callNo,
      render: (text: string) => {
        return (
          <span>{text}万</span>
        )
      }
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (text: string) => {
        const status = [
          { color: '#d9d9d9', text: '关闭' },
          { color: '#1890ff', text: '运行中' },
          { color: '#52c41a', text: '已上线' },
          { color: '#ff4d4f', text: '异常' }]
        const index = Number(text)
        return (
          <Badge text={status[index].text} color={status[index].color}></Badge>
        )
      }
    },
    {
      title: '上次调用时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (text: string) => {
        return (
          <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
      }
    }
  ]

  const onSearch = (val: string) => {
    value.current = val
    refresh()
  }

  return (
    <Card>
      <div style={{ marginBottom: 15, width: 500 }}>
        <Input.Search placeholder='请输入规则名称' allowClear onSearch={onSearch}></Input.Search>
      </div>
      <Table columns={columns} rowKey="key" {...tableProps} />
    </Card>
  )
}

export default HooksTable
