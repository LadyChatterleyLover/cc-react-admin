import { Card } from 'antd'
import CcTimeline from '../../components/components/timeline'

const Index = () => {
  const desc = (
    <>
      <p>Technical testing 1</p>
      <p>Technical testing 2</p>
      <p>Technical testing 3</p>
    </>
  )
  const data: any = [
    {
      title: 'Create a services site 2015-09-01',
      desc,
      color: 'green',
      label: "2015-09-01"
    },
    {
      title: 'Solve initial network problems 2015-09-01',
      desc,
    },
    {
      title: 'Technical testing 2015-09-01',
    },
    {
      title: 'Network problems being solved 2015-09-01',
    },
  ]

  return (
    <Card>
      <CcTimeline toggle  data={data}></CcTimeline>
    </Card>
  )
}

export default Index
