import { DingdingOutlined } from '@ant-design/icons'
import { Button, Card, Result, Descriptions, Steps } from 'antd'

const { Step } = Steps


const SuccessResult = () => {
  return (
    <Card>
      <Result
        status="success"
        title="提交成功"
        subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
        extra={[
          <Button type="primary" key='back'>返回列表</Button>,
          <Button key='check'>查看项目</Button>,
          <Button key='print'>打印</Button>,
        ]}
      >
        <div>
          <Descriptions title="项目名称">
            <Descriptions.Item label="项目 ID">23421</Descriptions.Item>
            <Descriptions.Item label="负责人">曲丽丽</Descriptions.Item>
            <Descriptions.Item label="生效时间">2016-12-12 ~ 2017-12-12</Descriptions.Item>
          </Descriptions>
          <Steps current={1} progressDot>
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
        </div>
      </Result>
    </Card>
  )
}

export default SuccessResult
