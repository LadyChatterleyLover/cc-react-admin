import { createElement } from 'react'
import * as Icons from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {  useDispatch, useSelector } from 'react-redux'


const { SubMenu } = Menu

interface Props {
  data: any[],
  key?: string,
  title?: string,
  icon?: string,
  t?: string,
  children?: string,
  [key: string]: any
}


const CcMenus = (props: Props) => {
  const { data, key, title, icon, children, ...rest } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const navMode = useSelector((state: any) => state.base.navMode)

  const renderMenu = (data: any[]) => {
    return data.map(item => {
      if (item[children!] && item[children!].length) {

        return (
          <SubMenu
            key={item[key!]}
            title={t(item.t)}
            icon={createElement((Icons as any)[item[icon!]])}>
            {renderMenu(item[children!])}
          </SubMenu>
        )
      }
      return (
        <Menu.Item
          key={item[key!]}
          icon={createElement((Icons as any)[item[icon!]])}>
          {t(item.t)}
        </Menu.Item>
      )
    })
  }

  const find = (data: any[], key: string) => {
    let current: any = null
    data.map(item => {
      if (item.key === key) current = item
      else {
        if (item.children && item.children) {
          if (find(item.children, key)) current = find(item.children, key)
        }
      }
    })
    return current
  }

  const clickItem = ({ key }: { key: string }) => {
    const current = find(data, key)
    if (localStorage.getItem('navs')) {
      let navs = JSON.parse(localStorage.getItem('navs')!)
      let item = navs.find((i: any) => i.key === key)
      if (!item) {
        navs.push(current)
        localStorage.setItem('navs', JSON.stringify(navs))
        dispatch({
          type: 'setNav',
          data: navs
        })
      }
    } else {
      let arr = []
      arr.push(current)
      localStorage.setItem('navs', JSON.stringify(arr))
      dispatch({
        type: 'setNav',
        data: arr
      })
    }
    navigate(key)
  }


  return (
    <Menu
      defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
      selectedKeys={[location.pathname]}
      {...rest}
      onClick={clickItem}
      style={{lineHeight: navMode === 'top' ? '64px' : '46px',borderBottom:navMode === 'top' ? 'none' : '1px solid #f0f0f0' }}
    >
      {renderMenu(data)}
    </Menu>
  )
}

CcMenus.defaultProps = {
  key: 'key',
  title: 'title',
  icon: 'icon',
  children: 'children',
}

export default CcMenus
