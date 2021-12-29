import axios from 'axios'
import { useEffect, useState } from "react"
import BaseTable from "../../../../components/senior/table/base"
import dayjs from 'dayjs'
import { Badge, Card, FormInstance } from 'antd';
import SearchForm from '../../../../components/senior/table/base/searchForm/searchForm'

const Index = () => {
  const [query, setQuery] = useState<string>('')
  const [dataSource, setDataSource] = useState<any[]>([])
  const getTableData = () => {
    axios.get(`https://proapi.azurewebsites.net//api/rule?current=1&pageSize=20${query}`).then((res: any) => {
      setDataSource(res.data.data)
    })
  }
  useEffect(() => {
    getTableData()
  }, [query])

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

  const onSearch = (form: FormInstance) => {
    const values = form.getFieldsValue()
    let str = '&'
    for (const i in values) {
      if (values[i]) {
        str += `${i}=${values[i]}`
      }
    }
    setQuery(str)
  }

  return (
    <div>
      <Card>
        <SearchForm onSearch={onSearch}></SearchForm>
      </Card>
      <br />
      <BaseTable
        rowKey='key'
        dataSource={dataSource}
        columns={columns}
        onRefresh={getTableData}
      ></BaseTable>
    </div>
  )
}

export default Index
