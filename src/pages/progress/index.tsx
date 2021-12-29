import { Card } from 'antd'
import CcProgress from '../../components/components/progress'

const Index = () => {
  return (
    <Card style={{width: 600}}>
      <CcProgress percent={60} isAnimate></CcProgress>
      <CcProgress percent={60} isAnimate time={5000}></CcProgress>
      <CcProgress percent={60} isAnimate type="circle"></CcProgress>
    </Card>
  )
}

export default Index
