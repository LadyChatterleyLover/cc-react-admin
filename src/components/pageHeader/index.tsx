import { ReactNode } from 'react'
import './index.scss'

export interface SearchHeaderProps {
  title: string,
  content?: ReactNode
  children?: ReactNode
}


const PageHeader = (props: SearchHeaderProps) => {
  const { title, content, children } = props

  return (
    <div className='cc-page-header'>
      <div className='cc-page-header-title'>{title}</div>
      {content}
      {children}
      
    </div>
  )
}

export default PageHeader
