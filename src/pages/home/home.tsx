import { Card, Tabs } from 'antd'
import CcBar from '../../components/components/charts/bar'
import CcLine from '../../components/components/charts/line'
import CcPie from '../../components/components/charts/pie'
import Desc from '../../components/desc'

const { TabPane } = Tabs

const xAxisData = [
  { name: '1月' },
  { name: '2月' },
  { name: '3月' },
  { name: '4月' },
  { name: '5月' },
  { name: '6月' },
  { name: '7月' },
  { name: '8月' },
  { name: '9月' },
  { name: '10月' },
  { name: '11月' },
  { name: '12月' },
]
const seriesData = [
  { data: 1820 },
  { data: 1932 },
  { data: 1901 },
  { data: 1934 },
  { data: 2290 },
  { data: 2330 },
  { data: 2320 },
  { data: 820 },
  { data: 932 },
  { data: 901 },
  { data: 934 },
  { data: 1290 },
]
const pieSeriesData = [
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' }
]

const Home = () => {
  return (
    <div>
      <Desc></Desc>
      <Card style={{ marginTop: 20 }}>
        <Tabs defaultActiveKey='1'>
          <TabPane key='1' tab='流量趋势'>
            <CcLine areaStyle height='300' xAxisData={xAxisData} seriesData={seriesData}></CcLine>
          </TabPane>
          <TabPane key='2' tab='访问量'>
            <CcBar height={300} xAxisData={xAxisData} seriesData={seriesData}></CcBar>
          </TabPane>
        </Tabs>
      </Card>
      <div style={{ marginTop: 20, display: 'flex' }}>
        <div style={{ width: '33.33%' }}>
          <div style={{ paddingRight: 10 }}>
            <Card>
              <CcPie height={300} xAxisData={xAxisData} seriesData={pieSeriesData}></CcPie>
            </Card>
          </div>
        </div>
        <div style={{ width: '33.33%' }}>
          <div style={{ paddingRight: 10 }}>
            <Card>
              <CcLine height='300' xAxisData={xAxisData} seriesData={seriesData}></CcLine>
            </Card>
          </div>
        </div>
        <div style={{ width: '33.33%' }}>
          <div>
            <Card>
              <CcPie radius={['40%', '70%']} height={300} xAxisData={xAxisData} seriesData={pieSeriesData}></CcPie>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
