import SearchHeader from "../../../../components/search/header"
import SearchContainer from "../../../../components/search/container"
import axios from "axios"
import { Avatar, Button, Card, Divider, List, Space, Tag } from "antd"
import {  LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'

import { useState, useEffect } from 'react'
import dayjs from "dayjs"

const SearchArticle = () => {
  const [list, setList] = useState<any[]>([])

  const getList = () => {
    axios.get('https://proapi.azurewebsites.net//api/fake_list?count=5').then((res: any) => {
      setList([...list, ...res.data.data.list])
    })
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <div>
      <SearchHeader title="搜索列表（文章）"></SearchHeader>
      <SearchContainer showOwner></SearchContainer>
      <br />
      <Card>
        <List
          loading={!list || !list.length}
          itemLayout="vertical"
          size="large"
          dataSource={list}
          renderItem={(item) => {
            return (
              <List.Item
                key={item.id}
                actions={[
                  <Space>
                    <span><StarOutlined style={{ color: '#1890ff', marginRight: 3 }} />{item.star}</span>
                    <span><LikeOutlined style={{ marginRight: 3 }} /> {item.like}</span>
                    <span><MessageOutlined style={{ marginRight: 3 }} /> {item.message}</span>
                  </Space>,
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={
                    <Space>
                      <Tag>Ant Design</Tag>
                      <Tag>设计语言</Tag>
                      <Tag>蚂蚁金服</Tag>
                    </Space>
                  }
                />
                {item.content}
                <div style={{ marginTop: 12, color: 'rgba(0,0,0,.45)' }}>
                  <span><Avatar src={item.avatar} style={{ width: 20, height: 20 }} /></span>
                  <a style={{ margin: '0 8px' }}>{item.owner}</a>发布在&nbsp;
                  <a href={item.href}>{item.href}</a>
                  <span style={{ marginLeft: 16, color: 'rgba(0,0,0,.25)' }}>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                </div>
              </List.Item>
            )
          }}>

        </List>
        <Divider />
        <div style={{textAlign: 'center'}}>
          <Button onClick={getList}>加载更多</Button>
        </div>
      </Card>
    </div>
  )
}

export default SearchArticle
