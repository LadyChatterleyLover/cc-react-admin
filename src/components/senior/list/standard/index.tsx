import { Row } from 'antd'
import { ReactNode } from 'react'
import Context from './context'
import Item from './item/item'

export interface StandardListDescProps {
  children: ReactNode | ReactNode[]
}


const StandardListDesc = (props: StandardListDescProps) => {
  const { children } = props
  const length = (children as ReactNode[])!.length
  
  return (
    <Row>
      <Context.Provider value={length}>
        {children}
      </Context.Provider>
    </Row>
  )
}
StandardListDesc.Item = Item


export {
  Item
}

export default StandardListDesc
