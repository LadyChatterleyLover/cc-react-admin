import { Button, Card } from 'antd'
import { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside'

const ClickOutside = () => {
  const [counter, setCounter] = useState(0)

  const { ref } = useClickOutside(() => {
    setCounter((s) => s + 1)
  })
  return (
    <Card>
      <Button ref={ref}>box</Button>
      <p>counter: {counter}</p>
    </Card>
  )
}

export default ClickOutside
