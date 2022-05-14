import { List } from "antd"
import type { ListProps } from "antd"
import { ReactNode, useEffect, useRef } from "react"

type Props = {
  loader?: ReactNode
  loadMoreData: () => void
}
export type CcListProps = Props & ListProps<any>

const CcList = (props: CcListProps) => {
  const { loader, loadMoreData, dataSource, children, ...rest } = props
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = new IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio > 0) {
        // intersectionRatio大于0，代表监听的元素由不可见变成可见，进行数据请求
        loadMoreData()
      }
    })
    // 监听Loading div的可见性
    intersectionObserver.observe(loadingRef.current!)
    return () => {
      intersectionObserver!.unobserve(loadingRef.current!)
      intersectionObserver!.disconnect()
      intersectionObserver = null
    }
  }, [])

  return (
    <List {...rest} dataSource={dataSource}>
      {children}
      <div ref={loadingRef}>
        {loader}
      </div>
    </List>
  )
}

export default CcList
