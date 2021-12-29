import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Select } from 'antd'
import './index.scss'
import { useState } from 'react'

const { Option } = Select


const types = [{ label: '全部' }]
for (let i = 1; i <= 12; i++) {
  types.push({ label: `类目${i}` })
}

interface SearchContainerProps {
  showOwner?: boolean,
  changeUser?: (val: string) => void,
  changeRate?: (val: string) => void,
}

const SearchContainer = (props: SearchContainerProps) => {
  const { showOwner = false, changeUser, changeRate } = props
  const [flag, setFlag] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<string[]>(['2', '3'])

  const handleChange = (val: string[]) => {
    setSelectValue(val)
  }


  return (
    <Card>
      <div className='cc-search-container-item'>
        <div>所属类目: </div>
        <div className='cc-search-container-item-tag'>
          {types.map((item: { label: string }, index: number) => {
            return (
              <div key={index}>{item.label}</div>
            )
          })}
        </div>
        <a onClick={() => setFlag(!flag)} className='cc-search-container-item-icon'
        > {flag ? '收起' : '展开'}
          <DownOutlined
            style={{ transition: 'all .25s', marginLeft: 4 }}
            className={`${flag ? 'cc-search-container-item-icon-rotate' : ''}`} /></a>
      </div>
      <Divider />
      {
        showOwner ?
          <div>
            <div className='cc-search-container-item'>
              <div style={{ marginRight: 24 }}>owner:</div>
              <div>
                <Select
                  placeholder='请选择'
                  mode="tags"
                  value={selectValue}
                  onChange={handleChange}>
                  <Option value="1">我自己</Option>
                  <Option value="2">吴家豪</Option>
                  <Option value="3">周星星</Option>
                  <Option value="4">赵丽颖</Option>
                  <Option value="5">姚明</Option>
                </Select>
              </div>
              <div>
                <Button type='link' onClick={() => setSelectValue(['1'])}>只看我自己</Button>
              </div>
            </div>
            <Divider />
          </div>
          : null
      }
      <div className='cc-search-container-item'>
        <div style={{ marginRight: 24 }}>其他选项:</div>
        <div style={{ marginRight: 6 }}>活跃用户: </div>
        <div style={{ marginRight: 200 }}>
          <Select
            placeholder='不限'
            style={{ width: 150 }}
            onChange={(val: string) => changeUser && changeUser(val)}
          >
            <Option value="1">张三</Option>
          </Select>
        </div>
        <div style={{ marginRight: 6 }}>好评度: </div>
        <div>
          <Select 
          placeholder='不限' 
          style={{ width: 150 }}
          onChange={(val: string) => changeRate && changeRate(val)}
          >
            <Option value="1">优秀</Option>
          </Select>
        </div>
      </div>
    </Card>
  )
}

export default SearchContainer
