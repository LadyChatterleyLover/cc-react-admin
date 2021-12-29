import { useEffect, useRef } from 'react'
import { useUuid } from '../../../../hooks/useUuid'
import * as echarts from 'echarts'

interface CcLineProps {
  title?: string,
  height?: number | string,
  xAxisData: any,
  seriesData: any,
  areaStyle?: boolean,
  showXAxis?: boolean,
  showYAxis?: boolean,
  symbol?: boolean,
  [key: string]: any
}

const CcLine = (props: CcLineProps) => {
  const { title, xAxisData, seriesData, areaStyle = false, symbol = true, showXAxis = true, showYAxis = true, height = 100 } = props
  const { id } = useUuid(10)
  const myChart = useRef<any>()
  const dom = useRef<HTMLDivElement | null>(null)

  const option = useRef({
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: xAxisData.map((i: any) => i.name),
      show: showXAxis
    },
    yAxis: {
      type: 'value',
      show: showYAxis
    },
    series: [
      {
        type: 'line',
        data: seriesData.map((i: any) => i.data),
        areaStyle: areaStyle ? {} : null,
        symbol: !symbol ? 'none' : '',
        smooth: true
      }
    ]
  })


  useEffect(() => {
    if (dom.current) {
      myChart.current = echarts.init(dom.current!)
      myChart.current.setOption(option.current)
      window.addEventListener('resize', () => {
        setTimeout(() => {
          myChart.current.resize()
        }, 200)
      })
    }
    setTimeout(() => {
      myChart.current.resize()
    }, 200)
  }, [dom.current])

  return (
    <div style={{
      width: '100%',
      height: height + 'px'
    }}
      id={`cc-charts-bar-${id}`}
      ref={dom}></div>
  )
}

export default CcLine
