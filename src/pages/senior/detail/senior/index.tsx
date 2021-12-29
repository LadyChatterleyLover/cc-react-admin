import { Card, Button, Dropdown, Menu, Descriptions, Statistic, Tabs, Steps, Popover, Badge, Divider, Empty, Table } from 'antd'
import axios from 'axios'
import './index.scss'
import { ReactNode, useState, useEffect } from 'react';
import { DingdingOutlined } from '@ant-design/icons'


const { TabPane } = Tabs
const { Step } = Steps

const SeniorDetail = () => {
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [data, setData] = useState<any>({})
  const customDot = (dot: ReactNode, { index }: any) => {
    if (index === 1) {
      return (
        <Popover
          content={
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>吴加号</div>
                <div>
                  <Badge color='#ccc' text={<span style={{ color: '#ccc' }}>未响应</span>}></Badge>
                </div>
              </div>
              <div>耗时：2小时25分钟</div>
            </div>
          }
        >
          {dot}
        </Popover>
      )
    }
    return (
      <span>{dot}</span>
    )
  }
  const tabList = [
    {
      tab: '操作日志一',
      key: '1',
    },
    {
      tab: '操作日志二',
      key: '2',
    },
    {
      tab: '操作日志三',
      key: '3',
    },
  ]

  const getData = () => {
    axios.get('https://proapi.azurewebsites.net//api/profile/advanced').then((res: any) => {
      setData(res.data.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns: any[] = [
    {
      title: '操作类型',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: '操作人',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '执行结果',
      key: 'status',
      dataIndex: 'status',
      render: (text: string) => {
        if (text === 'agree') {
          return (
            <Badge text={text} color='#52c41a' />
          )
        } else {
          return (
            <Badge text={text} color='#ff4d4f' />
          )
        }
      }
    },
    {
      title: '操作时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
    },
    {
      title: '备注',
      key: 'memo',
      dataIndex: 'memo',
    },
  ]

  return (
    <div>
      <Card>
        <div className='cc-senior-detail-header'>
          <div className='cc-senior-detail-header-title'>单号：234231029431</div>
          <div>
            <Button>操作一</Button>
            <Button>操作二</Button>
            <Dropdown overlay={(
              <Menu>
                <Menu.Item key="1">选项一</Menu.Item>
                <Menu.Item key="2">选项二</Menu.Item>
                <Menu.Item key="3">选项三</Menu.Item>
              </Menu>
            )}>
              <Button>...</Button>
            </Dropdown>
            <Button type='primary' style={{ marginLeft: 8 }}>主操作</Button>
          </div>
        </div>
        <br />
        <div className='cc-senior-detail-container'>
          <div className='cc-senior-detail-container-content'>
            <Descriptions column={2}>
              <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
              <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
              <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
              <Descriptions.Item label="关联单据"><a>12421</a></Descriptions.Item>
              <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
              <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
            </Descriptions>
          </div>
          <div className='cc-senior-detail-container-extra'>
            <Statistic title="状态" value='待审批' style={{ marginRight: 10 }} />
            <Statistic title="订单金额" value={568.08} prefix='￥' />
          </div>
        </div>
        <Tabs>
          <TabPane tab='详情' key={1}></TabPane>
          <TabPane tab='规则' key={2}></TabPane>
        </Tabs>
      </Card>
      <br />
      <Card>
        <Steps current={1} progressDot={customDot}>
          <Step title="创建项目" description={(
            <div style={{ color: 'rgba(0,0,0,.45)', fontSize: 14 }}>
              <div>曲丽丽 <DingdingOutlined /> </div>
              <div>2016-12-12 12:32</div>
            </div>
          )} />
          <Step title="部门初审" description={(
            <div >
              <div style={{ color: 'rgba(0,0,0,.45)', fontSize: 13 }}>
                周毛毛
                <DingdingOutlined style={{ color: '#1890ff' }} /> </div>
              <div style={{ color: '#1890ff' }}>2016-12-12 12:32</div>
            </div>
          )} />
          <Step title="财务复核" />
          <Step title="完成" />
        </Steps>
      </Card>
      <br />
      <Card title='用户信息'>
        <Descriptions>
          <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
          <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
          <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
          <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
          <Descriptions.Item label="联系地址">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Descriptions.Item>
        </Descriptions>
        <br />
        <Descriptions title='信息组'>
          <Descriptions.Item label="某某数据">725</Descriptions.Item>
          <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
          <Descriptions.Item label="某某数据">725</Descriptions.Item>
          <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
        </Descriptions>
        <br />
        <h4>信息组</h4>
        <Card type="inner" title="多层级信息组">
          <Descriptions title='组名称'>
            <Descriptions.Item label="负责人">林东东</Descriptions.Item>
            <Descriptions.Item label="角色码">1234567</Descriptions.Item>
            <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>
            <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
            <Descriptions.Item label="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title='组名称'>
            <Descriptions.Item label="学名">Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title='组名称'>
            <Descriptions.Item label="负责人">付小小</Descriptions.Item>
            <Descriptions.Item label="角色码">1234568</Descriptions.Item>
          </Descriptions>
        </Card>
      </Card>
      <br />
      <Card title='用户近半年来电记录'>
        <Empty />
      </Card>
      <br />
      <Card
        activeTabKey={activeTabKey}
        tabList={tabList}
        onTabChange={(key) => setActiveTabKey(key)}>
        <Table rowKey='key' dataSource={data[`advancedOperation${activeTabKey}`]} columns={columns} />
      </Card>
    </div>
  )
}

export default SeniorDetail
