import PageHeader from '../../pageHeader'
import { Input, Tabs } from 'antd'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './index.scss'

const { TabPane } = Tabs

interface SearchHeaderProps {
  title: string
}

const SearchHeader = (props: SearchHeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeKey, setActiveKey] = useState<string>(location.pathname)

  const changeTab = (key: string) => {
    setActiveKey(key)
    navigate(key)
  }
  const content = (
    <div style={{ textAlign: 'center' }}>
      <Input.Search
        style={{ maxWidth: 512, }}
        placeholder="请输入"
        allowClear
        enterButton="搜索"
        size="large" />
    </div>
  )
  return (
    <div className="cc-search-header">
      <PageHeader title={props.title} content={content}>
        <Tabs activeKey={activeKey} onChange={changeTab}>
          <TabPane key='/senior/list/searchArticle' tab='文章'></TabPane>
          <TabPane key='/senior/list/searchProject' tab='项目'></TabPane>
          <TabPane key='/senior/list/searchApplication' tab='应用'></TabPane>
        </Tabs>
      </PageHeader>
    </div>
  )
}

export default SearchHeader
