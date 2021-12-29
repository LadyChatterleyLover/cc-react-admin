import { Card } from "antd"
import CcChooseTime from "../../components/components/chooseTime"

const index = () => {
  const onChange = (val: any) => {
    console.log(val)
  }
  return (
    <Card>
      <CcChooseTime onChange={onChange}></CcChooseTime>
    </Card>
  )
}

export default index
