import { Card, Table, Tooltip, Dropdown, Menu, Popover, Checkbox } from 'antd'
import { ColumnType, ColumnGroupType } from 'antd/lib/table'
import cloneDeep from 'lodash/cloneDeep'
import { ReactNode, useEffect, useState } from 'react'
import { RedoOutlined, SettingOutlined, ColumnHeightOutlined, VerticalAlignMiddleOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import './index.scss'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import Sortable from 'sortablejs'


export interface BaseTableProps {
  dataSource: any[],
  columns: (ColumnType<any> | ColumnGroupType<any>)[],
  rowKey?: string,
  title?: string,
  children?: ReactNode,
  [key: string]: any,
  onRefresh?: () => void
}

const BaseTable = (props: BaseTableProps) => {
  const { dataSource, columns, rowKey, title = '基础表格', children, onRefresh, ...rest } = props
  const [data, setData] = useState<any[]>([])
  const [tableColumns, setTableColumns] = useState<any[]>([])
  const [showTableColumns, setShowTableColumns] = useState<any[]>([])
  const [size, setSize] = useState<SizeType>('large')
  const [checkAll, setCheckAll] = useState<boolean>(true)
  const [showIndex, setShowIndex] = useState<boolean>(false)
  const [showSelected, setShowSelected] = useState<boolean>(false)
  const [settingVisible, setSettingVisible] = useState<boolean>(false)
  const [fixedStartList, setFixedStartList] = useState<any[]>([])
  const [fixedEndList, setFixedEndList] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [rowSelection, setRowSelection] = useState<any>(null)



  const onSelectChange = (rowKeys: any) => {
    setSelectedRowKeys([...rowKeys])
  }

  


  useEffect(() => {
    setData(cloneDeep(dataSource))
  }, [dataSource])

  useEffect(() => {
    const cloneColumns = cloneDeep(columns)
    cloneColumns.map((item: any) => {
      item.checked = true
      item.fixedStart = false
      item.fixedEnd = false
    })
    setTableColumns(cloneDeep(cloneColumns))
    setShowTableColumns(cloneDeep(cloneColumns))
  }, [columns])

  useEffect(() => {
    if (settingVisible) {
      const el = document.getElementById('baseTableSettingContent')
      Sortable.create(el!, {
        onEnd(e) {
          const currentRow = tableColumns.splice(e.oldIndex!, 1)[0]
          //将截取掉的当前行  放到新的索引位置
          tableColumns.splice(e.newIndex!, 0, currentRow)
          setTableColumns([...tableColumns])
        }
      })
    }
  }, [settingVisible])


  const sizeMenu = (
    <Menu selectedKeys={[size!]} onClick={({ key }: { key: any }) => setSize(key)}>
      <Menu.Item key='large'>默认</Menu.Item>
      <Menu.Item key='middle'>中等</Menu.Item>
      <Menu.Item key='small'>紧凑</Menu.Item>
    </Menu>
  )


  // 单选显示列
  const changeItemChecked = (e: CheckboxChangeEvent, item: any, index: number) => {
    item.checked = e.target.checked
    if (!item.checked) {
      tableColumns.splice(index, 1)
    } else {
      tableColumns.splice(index, 0, item)
    }
    setTableColumns([...tableColumns])
  }
  // 列全选
  const changeCheckAll = (e: CheckboxChangeEvent) => {
    showTableColumns.map(item => {
      item.checked = e.target.checked
    })
    setCheckAll(e.target.checked)
    setShowTableColumns([...showTableColumns])
    const arr = showTableColumns.filter(item => item.checked)
    setTableColumns([...arr])
  }
  // 显示序列号
  const changeShowIndex = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      tableColumns.unshift({
        title: '#',
        key: 'index',
        dataIndex: 'index',
        align: 'center',
        render: (text: string, _: any, index: number) => {
          return (
            <span>{index + 1}</span>
          )
        }
      })
    } else {
      tableColumns.shift()
    }
    setTableColumns([...tableColumns])
    setShowIndex(e.target.checked)
  }
  // 显示勾选列
  const changeShowSelected = (e: CheckboxChangeEvent) => {
    const selection = {
      selectedRowKeys,
      onChange: onSelectChange
    }
    if (e.target.checked) {
      setRowSelection({...selection})
    } else {
      setRowSelection(null)
    }
    setShowSelected(e.target.checked)
  }

  const settingTitle = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <Checkbox
          indeterminate={showTableColumns.some(item => !item.checked)}
          checked={checkAll}
          onChange={(e: CheckboxChangeEvent) => changeCheckAll(e)}>列展示</Checkbox>
      </div>
      <div style={{ marginLeft: 6 }}>
        <Checkbox
          checked={showIndex}
          onChange={(e: CheckboxChangeEvent) => changeShowIndex(e)}>序列号</Checkbox>
      </div>
      <div style={{ marginLeft: 6 }}>
        <Checkbox
          checked={showSelected}
          onChange={(e: CheckboxChangeEvent) => changeShowSelected(e)}>勾选行</Checkbox>
      </div>
    </div>
  )
  const onVisibleChange = (visible: boolean) => {
    setSettingVisible(visible)
  }
  // 固定在列首
  const fixedStart = (item: any, index: number) => {
    if (!item.fixedStart && !item.fixedEnd) setCurrentIndex(index)
    item.fixedStart = !item.fixedStart
    fixedStartList.push(item)
    setFixedStartList([...fixedStartList])
    if (item.fixedEnd) {
      item.fixedEnd = !item.fixedEnd
      fixedEndList.splice(index, 1)
      setFixedEndList([...fixedEndList])
    } else {
      showTableColumns.splice(index, 1)
      setShowTableColumns([...showTableColumns])
    }
    setTableColumns([...fixedStartList, ...showTableColumns, ...fixedEndList])
  }
  // 固定在列尾
  const fixedEnd = (item: any, index: number) => {
    if (!item.fixedStart && !item.fixedEnd) setCurrentIndex(index)
    item.fixedEnd = !item.fixedEnd
    fixedEndList.push(item)
    setFixedEndList([...fixedEndList])
    if (item.fixedStart) {
      item.fixedStart = !item.fixedStart
      fixedStartList.splice(index, 1)
      setFixedStartList([...fixedStartList])
    } else {
      showTableColumns.splice(index, 1)
      setShowTableColumns([...showTableColumns])
    }
    setTableColumns([...fixedStartList, ...showTableColumns, ...fixedEndList])
  }
  // 不固定
  const noFixed = (item: any, index: number) => {
    if (item.fixedStart) {
      item.fixedStart = !item.fixedStart
      fixedStartList.splice(index, 1)
      setFixedStartList([...fixedStartList])
    }
    if (item.fixedEnd) {
      item.fixedEnd = !item.fixedEnd
      fixedEndList.splice(index, 1)
      setFixedEndList([...fixedEndList])
    }
    showTableColumns.splice(currentIndex, 0, item)
    setShowTableColumns([...showTableColumns])
    setTableColumns([...fixedStartList, ...showTableColumns, ...fixedEndList])
  }

  const settingContent = (
    <div id="baseTableSettingContent">
      {
        fixedStartList.length ?
          <div>
            <div className='cc-base-table-setting-title'>固定在左侧</div>
            {
              fixedStartList.map((item: any, index: number) => {
                return (
                  <div key={item.key}>
                    <div className='cc-base-table-setting-item' style={{ marginBottom: 6 }}>
                      <div style={{ flex: 1 }}>
                        <Checkbox
                          checked={item.checked}
                          onChange={(e: CheckboxChangeEvent) => changeItemChecked(e, item, index)}>
                          {item.title}
                        </Checkbox>
                      </div>
                      <div className='cc-base-table-setting-item-action'>
                        <Tooltip title='固定在列尾'>
                          <VerticalAlignBottomOutlined style={{ margin: '0 6px' }} onClick={() => fixedEnd(item, index)} />
                        </Tooltip>
                        <Tooltip title='不固定'>
                          <VerticalAlignMiddleOutlined onClick={() => noFixed(item, index)} />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div> : null
      }
      {fixedStartList.length || fixedEndList.length
        ? <div className='cc-base-table-setting-title'>不固定</div> : null}
      {
        showTableColumns.map((item: any, index: number) => {
          return (
            <div key={item.key}>
              <div className='cc-base-table-setting-item' style={{ marginBottom: 6 }}>
                <div style={{ flex: 1 }}>
                  <Checkbox
                    checked={item.checked}
                    onChange={(e: CheckboxChangeEvent) => changeItemChecked(e, item, index)}>
                    {item.title}
                  </Checkbox>
                </div>
                <div className='cc-base-table-setting-item-action'>
                  <Tooltip title='固定在列首'>
                    <VerticalAlignTopOutlined onClick={() => fixedStart(item, index)} />
                  </Tooltip>
                  <Tooltip title='固定在列尾'>
                    <VerticalAlignBottomOutlined style={{ margin: '0 6px' }} onClick={() => fixedEnd(item, index)} />
                  </Tooltip>
                </div>
              </div>
            </div>
          )
        })
      }
      {
        fixedEndList.length ?
          <div>
            <div className='cc-base-table-setting-title'>固定在右侧</div>
            {
              fixedEndList.map((item: any, index: number) => {
                return (
                  <div key={item.key}>
                    <div className='cc-base-table-setting-item' style={{ marginBottom: 6 }}>
                      <div style={{ flex: 1 }}>
                        <Checkbox
                          checked={item.checked}
                          onChange={(e: CheckboxChangeEvent) => changeItemChecked(e, item, index)}>
                          {item.title}
                        </Checkbox>
                      </div>
                      <div className='cc-base-table-setting-item-action'>
                        <Tooltip title='固定在列首'>
                          <VerticalAlignTopOutlined style={{ margin: '0 6px' }} onClick={() => fixedStart(item, index)} />
                        </Tooltip>
                        <Tooltip title='不固定'>
                          <VerticalAlignMiddleOutlined onClick={() => noFixed(item, index)} />
                        </Tooltip>

                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div> : null
      }
    </div>
  )

  const extra = (
    <div className='cc-base-table-extra'>
      <div className='cc-base-table-extra-icon'>{children}</div>
      <Tooltip title='刷新'>
        <div className='cc-base-table-extra-icon'><RedoOutlined onClick={() => onRefresh && onRefresh()} /></div>
      </Tooltip>
      <Tooltip title='密度'>
        <Dropdown overlay={sizeMenu} trigger={['click']}>
          <div className='cc-base-table-extra-icon'><ColumnHeightOutlined /></div>
        </Dropdown>
      </Tooltip>
      <Tooltip title='设置'>
        <Popover
          title={settingTitle}
          content={settingContent}
          trigger="click"
          placement='bottom'
          onVisibleChange={onVisibleChange}
          overlayClassName='cc-base-table-popover-content-padding'
        >
          <div className='cc-base-table-extra-icon'><SettingOutlined /></div>
        </Popover>
      </Tooltip>
    </div>
  )

  return (
    <Card
      title={data && data.length ? title : null}
      extra={data && data.length ? extra : null}
    >
      <Table
        {...rest}
        loading={!data || !data.length}
        rowKey={rowKey}
        dataSource={data}
        columns={tableColumns}
        size={size}
        rowSelection={rowSelection}
        >
      </Table>
    </Card>
  )
}

export default BaseTable
