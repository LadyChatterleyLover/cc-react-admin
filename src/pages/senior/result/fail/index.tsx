import { Card, Result, Button, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

const { Paragraph, Text } = Typography

const FailResult = () => {
  return (
    <Card>
      <Result
        status="error"
        title="提交失败"
        subTitle="请核对并修改以下信息后，再重新提交。"
        extra={[
          <Button type="primary" key="back">返回修改</Button>, ,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              您提交的内容有如下错误:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined style={{color: '#ff4d4f'}} /> 您的账户已被冻结 &nbsp;
            <a>立即解冻 &gt;</a>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined style={{color: '#ff4d4f'}} /> 您的账户还不具备申请资格 &nbsp;
            <a>立即升级 &gt;</a>
          </Paragraph>
        </div>
      </Result>
    </Card>
  )
}

export default FailResult
