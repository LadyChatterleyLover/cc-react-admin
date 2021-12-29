import { Modal, Button, Card, message } from 'antd'
import { useState } from 'react'
import CcRotateVerify from '../../components/components/rotateVerify'
import img from '../../favicon.svg'

const RotateVerify = () => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <Card>
      <Button type='primary' onClick={() => setVisible(true)}>点击验证</Button>
      <Modal 
      visible={visible} 
      footer={null} 
      title='安全验证' 
      onCancel={() => setVisible(false)}>
        <CcRotateVerify 
        src={img} 
        onSuccess={()=> message.success('验证成功')}
        onFail={()=> message.error('验证失败')}
        ></CcRotateVerify>
      </Modal>
    </Card>
  )
}

export default RotateVerify
