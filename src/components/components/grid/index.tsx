import { ReactNode, useContext, useMemo } from "react"
import RowsContext from "./context"
import "./index.scss"

export interface Props {
  rows?: number
  children?: ReactNode
}

export interface ItemProps {
  image?: ReactNode
  text?: ReactNode
  children?: ReactNode
}

const CcGrid = (props: Props) => {
  const { rows = 3, children } = props
  return (
    <div className="cc-grid">
      <RowsContext.Provider value={rows}>{children}</RowsContext.Provider>
    </div>
  )
}

const Item = (props: ItemProps) => {
  const { image, text, children } = props
  const rows = useContext(RowsContext)
  const width = useMemo(() => 100 / rows + "%", [rows])
  return (
    <div className="cc-grid-item" style={{ width, padding: children ? 0 : '24px' }}>
      {children ? (
        children
      ) : (
        <>
          <div>{image}</div>
          <div>{text}</div>
        </>
      )}
    </div>
  )
}

CcGrid.Item = Item

export { Item }

export default CcGrid
