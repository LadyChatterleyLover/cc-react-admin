import { Badge, Card, Descriptions, Divider, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

const BaseDetail = () => {
  const [basicGoods, setBasicGoods] = useState<any[]>([])
  const [basicProgress, setBasicProgress] = useState<any[]>([])

  const getDetailData = () => {
    let num = 0
    let amount = 0
    axios.get('https://proapi.azurewebsites.net//api/profile/basic').then((res: any) => {
      res.data.data.basicGoods.map((item: any) => {
        num += Number(item.num)
        amount += Number(item.amount)
      })
      res.data.data.basicGoods.push({
        id: '总计',
        name: '',
        barcode: '',
        price: '',
        num,
        amount
      })
      setBasicGoods(res.data.data.basicGoods)
      setBasicProgress(res.data.data.basicProgress)
    })
  }

  useEffect(() => {
    getDetailData()
  }, [])

  const basicGoodsColumns: any[] = [
    {
      title: '商品编号',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: '商品名称',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: '商品条码',
      key: 'barcode',
      dataIndex: 'barcode'
    },
    {
      title: '单价',
      key: 'price',
      dataIndex: 'price'
    },
    {
      title: '数量（件）',
      key: 'num',
      dataIndex: 'num',
      render: (text: string, record: any, index: number) => {
        if (index === basicGoods.length - 1) {
          return (
            <span style={{ fontWeight: 700 }}>{text}</span>
          )
        } else {
          return (
            <span>{text}</span>
          )
        }
      }
    },
    {
      title: '金额',
      key: 'amount',
      dataIndex: 'amount',
      render: (text: string, _: any, index: number) => {
        if (index === basicGoods.length - 1) {
          return (
            <span style={{ fontWeight: 700 }}>{text}</span>
          )
        } else {
          return (
            <span>{text}</span>
          )
        }
      }
    }
  ]

  const basicProgressColumns: any[] = [
    {
      title: '时间',
      key: 'time',
      dataIndex: 'time'
    },
    {
      title: '当前进度',
      key: 'rate',
      dataIndex: 'rate'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string) => {
        if (text === 'processing') {
          return (
            <Badge color="#1890ff" text="进行中" />
          )
        } else {
          return (
            <Badge color="#52c41a" text="成功" />
          )
        }
      }
    },
    {
      title: '操作员ID',
      key: 'operator',
      dataIndex: 'operator'
    },
    {
      title: '耗时',
      key: 'cost',
      dataIndex: 'cost'
    },
  ]


  return (
    <Card>
      <Descriptions title="退款申请">
        <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
        <Descriptions.Item label="状态">已取货</Descriptions.Item>
        <Descriptions.Item label="销售单号">1234123421</Descriptions.Item>
        <Descriptions.Item label="子订单">3214321432</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="用户信息">
        <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
        <Descriptions.Item label="联系电话">18100000000</Descriptions.Item>
        <Descriptions.Item label="常用快递">菜鸟仓储</Descriptions.Item>
        <Descriptions.Item label="取货地址">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
        <Descriptions.Item label="备注">无</Descriptions.Item>
      </Descriptions>
      <Divider />
      <h3>退货商品</h3>
      <br />
      <Table pagination={false} rowKey='id' dataSource={basicGoods} columns={basicGoodsColumns}></Table>
      <br />
      <h3>退货进度</h3>
      <br />
      <Table pagination={false} rowKey='key' dataSource={basicProgress} columns={basicProgressColumns}></Table>
    </Card>
  )
}

export default BaseDetail
