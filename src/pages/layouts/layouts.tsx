import { useState, useEffect, CSSProperties } from 'react'
import { Layout } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NavHeader from '../../components/navHeader/navHeader'
import NavSider from '../../components/navSider/navSider'
import Navs from '../../components/navs'
import Setting from '../../components/setting'
import { menuData } from '../../config/index';

const { Header, Sider, Content } = Layout

const Layouts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const navMode = useSelector((state: any) => state.base.navMode)
  const fixedSide = useSelector((state: any) => state.base.fixedSide)
  const fixedHeader = useSelector((state: any) => state.base.fixedHeader)

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const fixedSideStyle: CSSProperties = fixedSide === '1' ? {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
  } : {}

  const fixedHeaderStyle: CSSProperties = fixedHeader === '1' ? {
    position: 'fixed',
    zIndex: 999,
    width: navMode === 'top' ? '320px' : 'calc(100% - 200px)',
    right: navMode === 'top' ? '0' : ''
  } : {}

  const fixedNavStyle: CSSProperties = fixedHeader === '1' ? {
    position: 'fixed',
    zIndex: 999,
    width: navMode === 'top' ? '100%' : 'calc(100% - 200px)',
    top: '64px',
    padding: navMode === 'top' ? '0' : '0 20px'
  } : {}

  const toggle = () => {
    setCollapsed(!collapsed)
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
  
  useEffect(() => {
    if (location.pathname === '/') navigate('/dashboard/analysis')
    const navs = localStorage.getItem('navs')
    if (!navs) {
      const item = find(menuData, location.pathname)
      const arr = [item]
      dispatch({
        type: 'setNav',
        data: arr
      })
      localStorage.setItem('navs', JSON.stringify(arr))
    }


  }, [location.pathname])
  return (
    <Layout>
      {
        navMode === 'side' ?
          <>
            <Sider
              trigger={null} collapsible collapsed={collapsed}
              style={{ ...fixedSideStyle }}
            >
              <NavSider></NavSider>
            </Sider>
            <Layout style={{ marginLeft: fixedSide === '1' ? '200px' : '0' }}>
              <Header
                style={{
                  padding: '0 20px',
                  background: '#fff',
                  ...fixedHeaderStyle
                }}>
                <NavHeader collapsed={collapsed} toggle={toggle}></NavHeader>
              </Header>
              <Navs style={{...fixedNavStyle}}></Navs>
              <Content
                style={{
                  margin: fixedHeader === '0' ? '24px 16px' : '122px 16px 24px 16px',
                  background: '#f0f2f5',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </> : navMode === 'top' ?
            <>
              <Layout>
                <Layout>
                  <Sider width='calc(100% - 300px)'>
                    <NavSider></NavSider>
                  </Sider>
                  <Header
                    style={{ background: '#fff', width: 300, ...fixedHeaderStyle }}>
                    <NavHeader></NavHeader>
                  </Header>
                </Layout>
                <Content
                  style={{
                    margin: '24px 16px',
                    background: '#f0f2f5',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  <Outlet />
                </Content>
              </Layout>
            </> :
            <>
              <Header
                style={{
                  padding: '0 20px',
                  background: '#001529',
                  display: 'flex', justifyContent: 'flex-end'
                }}>
                <NavHeader style={{ background: '#001529', color: '#fff' }}></NavHeader>
              </Header>
              <Layout style={{ marginLeft: fixedSide === '1' ? '200px' : '0' }}>
                <Sider
                  style={{ ...fixedSideStyle }}>
                  <NavSider></NavSider>
                </Sider>
                <Content
                  style={{
                    margin: '24px 16px',
                    background: '#f0f2f5',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                  <Outlet />
                </Content>
              </Layout>
            </>
      }
      <Setting></Setting>
    </Layout>
  )
}

export default Layouts
