import { Button, Card } from "antd"
import { useState } from "react"
import { useThrottle } from '../../hooks/useThrottle'

const Throttle = () => {
  const [value, setValue] = useState(0)

  const handleClick = useThrottle(() => {
    setValue(value + 1)
  }, 3000)
  return (
    <Card>
      <div style={{ marginTop: 16 }}> Clicked count: {value} </div>
      <Button type="primary" onClick={handleClick}>
        Click fast!
      </Button>
    </Card>
  )
}

export default Throttle
