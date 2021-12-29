import { useState } from 'react'
import {Button, Card} from 'antd'
import CcChooseIcon from '../../components/components/chooseIcon/chooseIcon'

const Index = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const onClose = () => {
    setVisible(false)
  }
  return (
    <Card>
      <Button type='primary' onClick={() => setVisible(true)}>选择图标</Button>
      <CcChooseIcon
      clickItem={(item: string) => console.log(item)}
      visible={visible}
      onClose={onClose}
      ></CcChooseIcon>
    </Card>
  )
}

export default Index
