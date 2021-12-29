import { Card, Row, Col, List, Avatar, Button } from 'antd'
import CcCard from '../../components/components/card'

const Workplace = () => {
  const list = [
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: 'Alipay',
      desc: '那是一种内在的东西，他们到达不了，也无法触及的',
      author: '科学搬砖组',
      time: '几秒前'
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: 'Angular',
      desc: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      author: '吴彦祖',
      time: '2年前'
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: 'Ant Design',
      desc: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      author: '中二少女团',
      time: '几秒前'
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      title: 'Ant Design Pro',
      desc: '那时候我只会想自己想要什么，从不想自己拥有什么',
      author: '程序员日常',
      time: '2年前'
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      title: 'Bootstrap',
      desc: '凛冬将至',
      author: '高逼格设计天团',
      time: '几秒前'
    },
    {
      src: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      title: 'React',
      desc: '生命就像一盒巧克力，结果往往出人意料',
      author: '前端程序员',
      time: '几秒前'
    }
  ]
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]
  const navs = [{}, {}, {}, {}, {}, {}]
  return (
    <Row>
      <Col span={16} >
        <Card
          title='进行中的项目'
          extra={<a href="#">全部项目</a>}
          bodyStyle={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            list.map((item, index) => {
              return (
                <CcCard
                  style={{ width: '33.33%' }}
                  key={index}
                  src={item.src}
                  title={item.title}
                  desc={item.desc}
                  author={item.author}
                  time={item.time}
                ></CcCard>
              )
            })
          }
        </Card>
        <div style={{ marginTop: 20 }}>
          <Card title="最新动态" extra={<a href="#">全部项目</a>}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />}
                    title={<a href="#">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Col>
      <Col span={7} offset={1}>
        <Card title='快速开始 / 便捷导航'>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {
              navs.map((_, index) => {
                if (index !== navs.length - 1) {
                  return (
                    <div style={{ width: '25%', marginBottom: 20 }} key={index}>操作{index + 1}</div>
                  )
                } else {
                  return (
                    <div key={index} style={{ width: '25%', marginBottom: 20 }}><Button type='primary' size='small'>添加</Button></div>
                  )
                }
              })
            }

          </div>
        </Card>
        <div style={{ marginTop: 20 }}>
          <Card>
          <img  src="https://vvbin.cn/next/assets/illustration.8e82152d.svg" />
          </Card>
        </div>
        <div style={{ marginTop: 20 }}>
          <Card title='团队'>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              {
                list.map((item, index) => {
                  return (
                    <div key={index} style={{ width: '50%', marginBottom: 15, display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: 15 }}><Avatar size='small' src={item.src}></Avatar></div>
                      <div>{item.author}</div>
                    </div>
                  )
                })
              }
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  )
}

export default Workplace
