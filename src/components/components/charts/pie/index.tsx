import { useEffect, useRef } from 'react'
import { useUuid } from '../../../../hooks/useUuid'
import * as echarts from 'echarts'

interface CcPieProps {
  title?: object,
  legend?: object,
  radius?: string | string[],
  height?: number | string,
  xAxisData: any,
  seriesData: any,
  roseType?: string,
  [key: string]: any
}

const CcPie = (props: CcPieProps) => {
  const { title, legend, xAxisData, radius = '50%', roseType, seriesData, height = 100 } = props
  const { id } = useUuid(10)
  const myChart = useRef<any>()
  const dom = useRef<HTMLDivElement | null>(null)

  const option = useRef({
    title: title,
    legend: legend,
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius,
        roseType,
        data: seriesData,
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

export default CcPie
