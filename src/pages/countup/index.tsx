import { Card, Button } from 'antd'
import { useCountup } from '../../hooks/useCountup'

const Countup = () => {
  const {ref, start, update, pauseResume, reset} = useCountup({
    endValue: 20000
  })
  return (
    <Card>
      <div ref={ref} style={{height: 100, width: 100, border: '1px solid #eee'}}></div>
      <br />
      <Button type='primary' style={{marginRight: 10}} onClick={() =>start()}>开始</Button>
      <Button type='primary' style={{marginRight: 10}} onClick={pauseResume}>暂停</Button>
      <Button type='primary' style={{marginRight: 10}} onClick={reset}>重置</Button>
      <Button type='primary' onClick={() => update(50000)}>修改</Button>
    </Card>
  )
}

export default Countup
