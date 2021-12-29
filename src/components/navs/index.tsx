import { Menu, Dropdown, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import { CSSProperties } from 'react';
interface Props {
  style?: CSSProperties
}

const Navs = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navs = useSelector((state: any) => state.nav.navs)

  const clickItem = (item: any) => {
    if (location.pathname !== item.key) {
      navigate(item.key)
    }
  }
  const clickMenu = ({ key }: { key: string }, item: any) => {
    let index = navs.findIndex((i: any) => i.key === item.key)
    if (key === 'refresh') {
      window.location.pathname = location.pathname
    } else if (key === 'closeLeft') {
      if (index === 0) {
        message.warning('已经是第一个啦')
      } else {
        let arr = navs.filter((_: any, idx: number) => {
          return idx >= index
        })
        dispatch({
          type: 'setNav',
          data: arr
        })
        localStorage.setItem('navs', JSON.stringify(arr))
      }
    } else if (key === 'closeRight') {
      if (index === navs.length - 1) {
        message.warning('已经是最后一个啦')
      } else {
        let arr = navs.filter((_: any, idx: number) => {
          return idx <= index
        })
        dispatch({
          type: 'setNav',
          data: arr
        })
        localStorage.setItem('navs', JSON.stringify(arr))
      }
    } else {
      if (navs.length === 1) {
        message.warning('没有其他啦')
      } else {
        let arr = navs.filter((_: any, idx: number) => {
          return idx === index
        })
        dispatch({
          type: 'setNav',
          data: arr
        })
        localStorage.setItem('navs', JSON.stringify(arr))
      }
    }
  }
  const menu = (item: any) => {
    return (
      <Menu onClick={(e) => clickMenu(e, item)}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="closeLeft">关闭左侧</Menu.Item>
        <Menu.Item key="closeRight">关闭右侧</Menu.Item>
        <Menu.Item key="4">关闭其他</Menu.Item>
      </Menu>
    )
  }
  const close = (e: MouseEvent, item: any) => {
    e.stopPropagation()
    let index = navs.findIndex((i: any) => i.key === item.key)
    let current = navs.find(() => location.pathname === item.key)
    if (navs.length === 1) {
      navigate('/dashboard/analysis')
      let arr = [
        {
          title: '分析页',
          key: '/dashboard/analysis'
        }
      ]
      dispatch({
        type: 'setNav',
        data: arr
      })
      localStorage.setItem('navs', JSON.stringify(arr))
    } else {
      let arr = navs.filter((i: any) => {
        return i.key !== item.key
      })
      dispatch({
        type: 'setNav',
        data: arr
      })
      localStorage.setItem('navs', JSON.stringify(arr))
      if (current) {
        if (index !== 0) {
          navigate(navs[index - 1].key)
        } else {
          navigate(navs[index + 1].key)
        }
      }
    }
  }

  return (
    <div className='cc-nav-container' style={props.style!}>
      {
        navs.length ?
          navs.map((item: any) => {
            return (
              <Dropdown key={item.key} overlay={menu(item)} trigger={['contextMenu']}>
                <div
                  className={`cc-nav-container-item 
              ${location.pathname === item.key ? 'cc-nav-container-item-active' : ''}`}
                  onClick={() => clickItem(item)}>
                  {
                    location.pathname === item.key ?
                      <div className='cc-nav-container-item-circle'></div> : null
                  }
                  <div>{item.title}</div>
                  <div>
                    <CloseOutlined onClick={(e: any) => close(e, item)} style={{ marginLeft: 4 }} />
                  </div>
                </div>
              </Dropdown>
            )
          })
          : null
      }
    </div>
  )
}

export default Navs
