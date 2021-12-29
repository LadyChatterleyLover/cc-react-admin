import { Result, Button } from 'antd'
import {useNavigate} from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
    />
  )
}

export default Index
