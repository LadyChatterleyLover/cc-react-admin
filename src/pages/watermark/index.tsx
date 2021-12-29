import { Card, Button } from 'antd'
import { useWatermark } from '../../hooks/useWatermark'


const Watermark = () => {
  const {setWatermark, clear} = useWatermark('我是水印')
  return (
    <Card>
      <Button type='primary' onClick={ setWatermark}>添加水印</Button>
      <Button style={{marginLeft: 20}} type='primary' onClick={clear}>清除水印</Button>
    </Card>
  )
}

export default Watermark
