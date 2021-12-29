import CcTrend from "../components/trend"
import DescCard from "../descCard"
import './index.scss'
import { Statistic } from 'antd'
import CcBar from "../components/charts/bar"
import CcLine from "../components/charts/line"
import CcProgress from "../components/progress"

const Index = () => {
  const xAxisData = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: '10' },
    { name: '11' },
    { name: '12' },
    { name: '13' },
    { name: '14' },
    { name: '15' },
    { name: '16' },
    { name: '17' },
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
    { data: 1330 },
    { data: 1320 },
    { data: 3290 },
    { data: 2330 },
    { data: 4320 },
  ]


  return (
    <div style={{ display: 'flex' }}>
      <div className="cc-desc-card-item">
        <div style={{ paddingRight: 10 }}>
          <DescCard
            title="总销售额"
            tip="提示说明"
            value={126560}
            prefix='¥'
            footer={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 15 }}>日销售额</div>
                <div >
                  <Statistic valueStyle={{ fontSize: 14 }} prefix='￥' value={12423}></Statistic>
                </div>
              </div>
            }
          >
            <div className="cc-desc-card-item-content">
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 10 }}>周同比</div>
                <div><CcTrend text='12%' upIcon='CaretUpOutlined' iconSize={12}></CcTrend></div>
              </div>
              <div style={{ display: 'flex', marginLeft: 15 }}>
                <div style={{ marginRight: 10 }}>日同比</div>
                <div><CcTrend text='11%' type="down" downIcon='CaretDownOutlined' iconSize={12}></CcTrend></div>
              </div>
            </div>
          </DescCard>
        </div>
      </div>
      <div className="cc-desc-card-item">
        <div style={{ paddingRight: 10 }}>
          <DescCard
            title="访问量"
            tip="提示说明"
            value={8848}
            footer={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 15 }}>日访问量</div>
                <div >
                  <Statistic valueStyle={{ fontSize: 14 }} value={1234}></Statistic>
                </div>
              </div>
            }
          >
            <CcLine showXAxis={false} showYAxis={false} symbol={false} areaStyle height='46' xAxisData={xAxisData} seriesData={seriesData}></CcLine>
          </DescCard>
        </div>
      </div>
      <div className="cc-desc-card-item">
        <div style={{ paddingRight: 10 }}>
          <DescCard
            title="支付笔数"
            tip="提示说明"
            value={6560}
            footer={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 15 }}>转化率</div>
                <div >
                  60%
                </div>
              </div>
            }
          >
            <CcBar showXAxis={false} showYAxis={false} height='46' xAxisData={xAxisData} seriesData={seriesData}></CcBar>
          </DescCard>
        </div>
      </div>
      <div className="cc-desc-card-item" style={{ marginRight: 0 }}>
        <div>
          <DescCard
            title="运营活动效果"
            tip="提示说明"
            value={78}
            suffix='%'
            footer={
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: 10 }}>周同比</div>
                  <div><CcTrend text='12%' upIcon='CaretUpOutlined' iconSize={12}></CcTrend></div>
                </div>
                <div style={{ display: 'flex', marginLeft: 15 }}>
                  <div style={{ marginRight: 10 }}>日同比</div>
                  <div><CcTrend text='11%' type="down" downIcon='CaretDownOutlined' iconSize={12}></CcTrend></div>
                </div>
              </div>
            }
          >
            <div className="cc-desc-card-item-content">
              <CcProgress
                isAnimate
                time={1000}
                percent={60}
                showInfo={false}
                strokeColor='rgb(19, 194, 194)'
              />
            </div>
          </DescCard>
        </div>
      </div>
    </div>
  )
}

export default Index
