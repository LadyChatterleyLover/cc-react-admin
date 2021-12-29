import { Result, Button } from 'antd'
import {useNavigate} from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
    />
  )
}

export default Index
