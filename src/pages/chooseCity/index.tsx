import { Card } from "antd"
import CcChooseCity from "../../components/components/chooseCity"

const Index = () => {
  const onChange = (val: any) => {
    console.log(val)
  }
  return (
    <Card>
      <CcChooseCity onChange={onChange}></CcChooseCity>
    </Card>
  )
}

export default Index
