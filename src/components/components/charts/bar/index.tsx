import { useEffect, useRef } from 'react'
import { useUuid } from '../../../../hooks/useUuid'
import * as echarts from 'echarts'

interface CcBarProps {
  title?: string,
  height?: number | string,
  xAxisData: any,
  seriesData: any,
  showXAxis?: boolean,
  showYAxis?: boolean,
  [key: string]: any
}

const CcBar = (props: CcBarProps) => {
  const { title, xAxisData, seriesData, height = 100, showXAxis = true, showYAxis = true } = props
  const { id } = useUuid(10)
  const myChart = useRef<any>()
  const dom = useRef<HTMLDivElement | null>(null)

  const option = useRef({
    title: {
      text: title
    },
    tooltip: {},
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
        type: 'bar',
        data: seriesData.map((i: any) => i.data),
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

export default CcBar
