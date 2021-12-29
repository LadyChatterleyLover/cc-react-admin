import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CloseOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons'
import { Drawer, Divider, Switch } from 'antd'
import './index.scss'


const Setting = () => {
  const dispatch = useDispatch()

  const theme = ['light', 'dark']
  const colors = [
    'rgb(24, 144, 255)',
    'rgb(245, 34, 45)',
    'rgb(250, 84, 28)',
    'rgb(250, 173, 20)',
    'rgb(19, 194, 194)',
    'rgb(82, 196, 26)',
    'rgb(47, 84, 235)',
    'rgb(114, 46, 209)'
  ]
  const mode = ['side', 'top', 'mix']


  const sideTheme = useSelector((state: any) => state.base.sideTheme)
  const primaryColor = useSelector((state: any) => state.base.primaryColor)
  const navMode = useSelector((state: any) => state.base.navMode)

  const [visible, setVisible] = useState<boolean>(false)
  const [currentThemeIndex, setCurrentThemeIndex] = useState<number>(theme.indexOf(sideTheme))
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(colors.indexOf(primaryColor))
  const [currentModeIndex, setCurrentModeIndex] = useState<number>(mode.indexOf(navMode))


  const clickThemeItem = (item: string, index: number) => {
    setCurrentThemeIndex(index)
    let theme = ''
    if (item === 'light') {
      theme = 'light'
      dispatch({
        type: 'setSideTheme',
        data: 'light'
      })
    } else if (item === 'dark') {
      theme = 'dark'
      dispatch({
        type: 'setSideTheme',
        data: 'dark'
      })
    }
    localStorage.setItem('sideTheme', theme)
  }

  const clickColorItem = (item: string, index: number) => {
    setCurrentColorIndex(index)
    dispatch({
      type: 'setPrimaryColor',
      data: item
    })
    localStorage.setItem('primaryColor', item)
  }
  const clickModeItem = (item: string, index: number) => {
    setCurrentModeIndex(index)
    dispatch({
      type: 'setNavMode',
      data: item
    })
    localStorage.setItem('navMode', item)
  }

  const changeFixedHeader = (e: boolean) => {
    let flag = e ? '1' : '0'
    dispatch({
      type: 'setFixedHeader',
      data: flag
    })
    localStorage.setItem('fixedHeader', flag)
  }

  const changeFixedSide = (e: boolean) => {
    let flag = e ? '1' : '0'
    dispatch({
      type: 'setFixedSide',
      data: flag
    })
    localStorage.setItem('fixedSide', flag)
  }

  return (
    <div>
      <div
        className={`cc-setting-drawer-handler ${visible ? 'cc-setting-drawer-handler-open' : ''}`}
        onClick={() => setVisible(!visible)}
      >
        {
          !visible ?
            <SettingOutlined style={{ fontSize: 18, color: '#fff' }} />
            : <CloseOutlined style={{ fontSize: 18, color: '#fff' }} />
        }
      </div>
      <Drawer
        visible={visible}
        width={300}
        closable={false}
        placement="right">
        <div className='cc-setting-title'>整体风格设置</div>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: 42 }}>
          {
            theme.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`cc-setting-theme cc-setting-theme-${item}`}
                  onClick={() => clickThemeItem(item, index)}>
                  {
                    currentThemeIndex === index ? <CheckOutlined className='cc-setting-theme-check' /> : null
                  }
                </div>
              )
            })
          }
        </div>
        <br />
        <div className='cc-setting-title'>主题色</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {colors.map((item, index) => {
            return (
              <div
                key={index}
                style={{ background: item }}
                className='cc-setting-color-item' onClick={() => clickColorItem(item, index)}>
                {
                  currentColorIndex === index ? <CheckOutlined style={{ color: '#fff' }} /> : null
                }
              </div>
            )
          })}
        </div>
        <Divider />
        <div className='cc-setting-title'>导航风格</div>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: 42 }}>
          {
            mode.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`cc-setting-mode cc-setting-mode-${item}`}
                  onClick={() => clickModeItem(item, index)}>
                  {
                    currentModeIndex === index ? <CheckOutlined className='cc-setting-theme-check' /> : null
                  }
                </div>
              )
            })
          }
        </div>
      </Drawer>
    </div>
  )
}

export default Setting
