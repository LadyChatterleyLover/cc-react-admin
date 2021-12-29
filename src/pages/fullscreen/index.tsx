import { Button, Card } from 'antd'
import { useFullscreen } from '../../hooks/useFullscreen'

const Fullscreen = () => {
  const { enterFullscreen, exitFullscreen, toggleFullscreen } = useFullscreen()
  const { toggleFullscreen: toggle } = useFullscreen(document.getElementById('fullscreen-img')!)

  return (
    <div>
      <Card>
        <Button type='primary' onClick={enterFullscreen}>全屏</Button>
        <Button type='primary' style={{ marginLeft: 20 }} onClick={exitFullscreen}>退出全屏</Button>
        <Button type='primary' style={{ marginLeft: 20 }} onClick={toggleFullscreen}>切换全屏</Button>
      </Card>
      <br />
      <Card>
      <img id="fullscreen-img" src='https://ahooks.gitee.io/static/react-hooks.dd0f9d30.jpg' style={{ width: 320 }} alt="" />
        <Button type='primary' onClick={toggle}>图片全屏</Button>
      </Card>
    </div>
  )
}

export default Fullscreen
