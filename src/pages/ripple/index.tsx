import { Card } from "antd"
import { useRipple } from "../../hooks/useRipple"

const Ripple = () => {
  const {ref} = useRipple()
  return (
    <Card>
      <div ref={ref} style={{ width: 100, height: 100, border: '1px solid #eee', background: 'skyblue' }}></div>
    </Card>
  )
}

export default Ripple
