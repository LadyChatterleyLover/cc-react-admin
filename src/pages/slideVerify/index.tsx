import {Card, message } from 'antd'
import CcSlideVerify from '../../components/components/slideVerify'

const SlideVerify = () => {
  return (
    <Card style={{ background: '#f8f8f8' }}>
      <div style={{display: 'flex'}}>
        <CcSlideVerify onSuccess={() => message.success('验证成功')}></CcSlideVerify>
      </div>

    </Card>
  )
}

export default SlideVerify
