import { Card, Statistic, Divider } from 'antd'
import { ReactNode } from 'react'
import CcBar from '../components/charts/bar'
import CcDesc from '../components/desc'

export interface DescCardProps {
  title: string,
  tip: string,
  value: number | string,
  prefix?: ReactNode,
  suffix?: ReactNode,
  children?: ReactNode,
  footer?: ReactNode,
}

const DescCard = (props: DescCardProps) => {
  const { title, tip, value, prefix, suffix, children, footer } = props


  return (
    <>
      <Card bodyStyle={{ padding: '20px 24px 8px' }}>
        <CcDesc title={title} tip={tip}></CcDesc>
        <div>
          <Statistic
            value={value}
            prefix={prefix}
            suffix={suffix}>
          </Statistic>
        </div>
        <div>{children}</div>
        <Divider style={{ margin: '10px 0' }} />
        <div>{footer}</div>
      </Card>
    </>

  )
}

export default DescCard
