import { Button, Card } from "antd"
import { useState } from "react"
import { useDebounce } from '../../hooks/useDebonce'


const Debounce = () => {
  const [value, setValue] = useState(0)

  const handleClick = useDebounce(() => {
    setValue(value + 1)
  })
  return (
    <Card>
      <div style={{ marginTop: 16 }}> Clicked count: {value} </div>
      <Button type="primary" onClick={handleClick}>
        Click fast!
      </Button>
    </Card>
  )
}

export default Debounce
