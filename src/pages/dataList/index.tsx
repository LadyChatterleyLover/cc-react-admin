import { useEffect, useState } from "react"
import CcList from "../../components/components/dataList/index"
import { List, Avatar, Skeleton, Card } from "antd"

const DataList = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
      .then((res) => res.json())
      .then((body) => {
        data.push(...body.results)
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  const renderItem = (item: any) => (
    <div>
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.picture.large} />}
          title={<a href="https://ant.design">{item.name.last}</a>}
          description={item.email}
        />
        <div>Content</div>
      </List.Item>
    </div>
  )

  return (
    <Card>
      <h3>利用IntersectionObserver特性，性能更好</h3>
      <br />
      <div
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}>
        <CcList
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          loadMoreData={loadMoreData}
          dataSource={data}
          renderItem={renderItem}></CcList>
      </div>
    </Card>
  )
}

export default DataList
