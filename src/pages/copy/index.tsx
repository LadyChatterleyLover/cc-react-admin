import { Button, Card, Input, message } from 'antd'
import { useState } from 'react'
import { useCopy } from '../../hooks/useCopy'

const Copy = () => {
  const [value, setValue] = useState<string>('')
  const {copy} = useCopy(value, () => message.success(`${value}复制成功`))
  return (
    <Card>
      <Input.Group compact>
        <Input 
        style={{ width: 'calc(100% - 200px)' }} 
        value={value}
        allowClear
        onChange={(e) => setValue(e.target.value)}
         />
        <Button type="primary" onClick={copy}>复制</Button>
      </Input.Group>
    </Card>
  )
}

export default Copy
