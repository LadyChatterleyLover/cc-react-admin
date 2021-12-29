import { useState, useEffect, CSSProperties } from 'react'
import { Avatar, Select, Dropdown, Menu } from 'antd'
import { SearchOutlined, FontColorsOutlined, UserOutlined, SettingOutlined, FieldTimeOutlined, DownOutlined } from '@ant-design/icons'
import './index.scss'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import CcList, { ActionOptions, ListOptions } from '../components/list'
import CcNotification from '../components/notification'
import i18n from 'i18next'
import { menuData } from '../../config'
import debounce from 'lodash/debounce'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'



interface Props {
  collapsed?: boolean,
  toggle?: () => void,
  style?: CSSProperties
}

interface OptionItem {
  value: string,
  label: string
}

const NavHeader = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const navMode = useSelector((state: any) => state.base.navMode)
  const { collapsed, toggle, style } = props
  const [selectCollapsed, setSelectCollapsed] = useState<boolean>(false)
  const [options, setOptions] = useState<OptionItem[]>([])
  const [current, setCurrent] = useState<any>({})
  const [parent, setParent] = useState<any>({})

  const list: ListOptions[] = [
    {
      title: '通知',
      content: [
        {
          title: '蒂姆·库克回复了你的邮件',
          time: '2019-05-08 14:33:18',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
        },
        {
          title: '乔纳森·伊夫邀请你参加会议',
          time: '2019-05-08 14:33:18',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png'
        },
        {
          title: '斯蒂夫·沃兹尼亚克已批准了你的休假申请',
          time: '2019-05-08 14:33:18',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png'
        }

      ],
    },
    {
      title: '关注',
      content: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '曲丽丽 评论了你',
          desc: '描述信息描述信息描述信息',
          time: '3小时前'
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '曲丽丽 评论了你',
          desc: '描述信息描述信息描述信息',
          time: '3小时前'
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
          title: '曲丽丽 评论了你',
          desc: '描述信息描述信息描述信息',
          time: '3小时前'
        }
      ]
    },
    {
      title: '代办',
      content: [
        {
          title: '任务名称',
          desc: '任务需要在 2017-01-12 20:00 前启动',
          tag: '未开始',
          tagColor: '#2db7f5'
        },
        {
          title: '第三方紧急代码变更',
          desc: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
          tag: '马上到期',
          tagColor: '#f50'
        },
        {
          title: '信息安全考试',
          desc: '指派竹尔于 2017-01-09 前完成更新并发布',
          tag: '已耗时8天',
          tagColor: '#87d068'
        }
      ]
    },
  ]
  const actions: ActionOptions[] = [
    {
      text: '清空代办',
      icon: 'DeleteOutlined'
    },
    {
      text: '查看更多',
      icon: 'EditOutlined'
    },
  ]

  const toggleLocale = ({ key }: { key: string }) => {
    i18n.changeLanguage(key)
    localStorage.setItem('locale', key)
    dispatch({
      type: 'setLocale',
      data: key
    })
  }

  const localeMenu = (
    <Menu onClick={toggleLocale}>
      <Menu.Item key="zh_CN">
        🇨🇳 简体中文
      </Menu.Item>
      <Menu.Item key="en">
        🇺🇸 English
      </Menu.Item>
    </Menu>
  )
  
  const clickUserMenu = ({ key }: { key: string }) => {
    console.log(key)
    const current = find(menuData, key)
    if (key.includes('center') || key.includes('setting')) {
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
    } else {
      localStorage.clear()
      navigate('/login')
    }
  }
  const userMenu = (
    <Menu onClick={clickUserMenu}>
      <Menu.Item key="/senior/account/center" icon={<UserOutlined />}>个人中心</Menu.Item>
      <Menu.Item key="/senior/account/setting" icon={<SettingOutlined />}>个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<FieldTimeOutlined />}>退出登录</Menu.Item>
    </Menu>
  )

  const onSearch = debounce((val: string) => {
    if (val === '') setOptions([])
    else {
      let options: OptionItem[] = []
      let arr = menuData.filter(item => {
        return item.title.includes(val)
      })
      arr.map(item => {
        options.push({
          label: item.title,
          value: item.key
        })
        if (item.children && item.children.length) {
          item.children.map(child => {
            options.push({
              label: item.title + ' > ' + child.title,
              value: child.key
            })
          })
        }
      })
      if (options.length) setOptions([...options])
      else setOptions([])
    }
  }, 500)

  const onChange = (value: string) => {
    let item = menuData.find(item => item.key === value)
    if (item && item.children.length) {
      navigate(item.children[0].key)
    } else {
      navigate(value)
    }
    setSelectCollapsed(!selectCollapsed)
  }

  const findParent = (data: any[], key: string) => {
    let current: any = null
    data.map(item => {
      if (item.key === key) current = item
    })
    return current
  }
  const findItem = (data: any[], key: string) => {
    let current: any = null
    data.map(item => {
      if (item.key === key) current = item
      else {
        if (item.children && item.children) {
          if (findItem(item.children, key)) current = findItem(item.children, key)
        }
      }
    })
    return current
  }
  useEffect(() => {
    let currentParent = findParent(menuData, '/' + location.pathname.split('/')[1])
    let currentItem = findItem(menuData, location.pathname)
    setParent(currentParent || { title: 'Dashboard', children: [{ title: '分析页' }] })
    setCurrent(currentItem || { title: '分析页' })
  }, [location.pathname])


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


  return (
    <div className='cc-admin-header' style={style}>
      {
        navMode === 'side' ?
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={toggle}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div>
              <span style={{ margin: '0 5px 0 10px', color: '#000000a6' }}>
                {parent.title}
              </span>
              <span style={{ marginRight: 5, color: '#999' }}>/</span>
              <span style={{ color: '#999' }}>{current.title}</span>
            </div>
          </div> : null
      }
      <div className='cc-admin-header-right'>
        <div className='cc-admin-header-right-item'>
          <SearchOutlined style={{ fontSize: 18 }} onClick={() => setSelectCollapsed(!selectCollapsed)} />
          <Select
            className={`cc-admin-header-right-item-select
             ${selectCollapsed ? 'cc-admin-header-right-item-select-collapsed' : ''}`}
            placeholder='请搜索'
            size='small'
            showArrow={false}
            showSearch
            optionFilterProp="children"
            filterOption={false}
            onSearch={onSearch}
            onChange={onChange}
          >
            {
              options.map(item => {
                return (
                  <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                )
              })
            }
          </Select>
        </div>
        <div className='cc-admin-header-right-item'>
          <CcNotification count={5} iconSize={18} color={navMode === 'mix' ? '#fff' : '#000'}>
            <CcList list={list} actions={actions}></CcList>
          </CcNotification>
        </div>
        <Dropdown overlay={userMenu}>
          <div className='cc-admin-header-right-item'>
            <div style={{ position: 'relative', top: -4, marginLeft: 10 }}>
              <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'></Avatar>
            </div>
            <div style={{ margin: '0 10px' }}>admin</div>
          </div>
        </Dropdown>
        <div className='cc-admin-header-right-item'>
          <Dropdown overlay={localeMenu}>
            <FontColorsOutlined style={{ fontSize: 18 }} />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default NavHeader
