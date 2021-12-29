import { Card } from 'antd'
import CcChooseArea from '../../components/components/chooseArea'

const Index = () => {
  const handleChange = (val: any) => {
    console.log(val)
  }
  return (
    <Card>
      <CcChooseArea onChange={handleChange}></CcChooseArea>
    </Card>
  )
}

export default Index
