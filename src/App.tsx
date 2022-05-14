import {
  useRoutes,
  BrowserRouter
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'


import Layouts from './pages/layouts/layouts'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound'
import ChooseIcon from './pages/chooseIcon'
import ChooseCity from './pages/chooseCity'
import ChooseArea from './pages/chooseArea'
import ChooseTime from './pages/chooseTime'
import Notification from './pages/notification'
import Progress from './pages/progress'
import Form from './pages/form'
import Timeline from './pages/timeline'
import Trend from './pages/trend'
import Calendar from './pages/calendar'
import Workplace from './pages/workplace/workplace'
import Copy from './pages/copy'
import Watermark from './pages/watermark/index'
import Fullscreen from './pages/fullscreen'
import ClickOutside from './pages/clickOutside'
import Ripple from './pages/ripple/index'
import Countup from './pages/countup/index'
import RotateVerify from './pages/rotateVerify'
import SlideVerify from './pages/slideVerify'
import PasswordStrength from './pages/passwordStrength'
import Debounce from './pages/debounce'
import Throttle from './pages/throttle'
import HooksTable from './pages/senior/table/hooksTable'
import BaseTable from './pages/senior/table/baseTable'
import StandardList from './pages/senior/list/standardList'
import CardList from './pages/senior/list/cardList'
import StepForm from './pages/senior/form/step'
import SeniorForm from './pages/senior/form/senior'
import BaseDetail from './pages/senior/detail/base'
import SeniorDetail from './pages/senior/detail/senior'
import SuccessResult from './pages/senior/result/success'
import FailResult from './pages/senior/result/fail'
import Exception403 from './pages/senior/exception/403'
import Exception404 from './pages/senior/exception/404'
import Exception500 from './pages/senior/exception/500'
import AccountCenter from './pages/senior/account/center'
import AccountSetting from './pages/senior/account/setting'
import SearchArticle from './pages/senior/list/searchArticle'
import SearchProject from './pages/senior/list/searchProject'
import SearchApplication from './pages/senior/list/searchApplication'
import Draggable from './pages/draggable'
import DataList from './pages/dataList'
import Analysis from './pages/analysis/analysis';
import Grid from './pages/grid';

const Routes = () => {
  let routes = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Layouts />,
      children: [
        {
          path: '/dashboard/analysis',
          element: <Analysis />,
        },
        {
          path: '/dashboard/workplace',
          element: <Workplace />,
        },
        {
          path: '/components/chooseIcon',
          element: <ChooseIcon />,
        },
        {
          path: '/components/chooseCity',
          element: <ChooseCity />,
        },
        {
          path: '/components/chooseArea',
          element: <ChooseArea />,
        },
        {
          path: '/components/chooseTime',
          element: <ChooseTime />,
        },
        {
          path: '/components/notification',
          element: <Notification />,
        },
        {
          path: '/components/rotateVerify',
          element: <RotateVerify />,
        },
        {
          path: '/components/dataList',
          element: <DataList />,
        },
        {
          path: '/components/grid',
          element: <Grid />,
        },
        {
          path: '/components/slideVerify',
          element: <SlideVerify />,
        },
        {
          path: '/components/passwordStrength',
          element: <PasswordStrength />,
        },
        {
          path: '/components/progress',
          element: <Progress />,
        },
        {
          path: '/components/form',
          element: <Form />,
        },
        {
          path: '/components/timeline',
          element: <Timeline />,
        },
        {
          path: '/components/trend',
          element: <Trend />,
        },
        {
          path: '/components/calendar',
          element: <Calendar />,
        },
        {
          path: '/feat/copy',
          element: <Copy />,
        },
        {
          path: '/feat/watermark',
          element: <Watermark />,
        },
        {
          path: '/feat/fullscreen',
          element: <Fullscreen />,
        },
        {
          path: '/feat/clickOutside',
          element: <ClickOutside />,
        },
        {
          path: '/feat/ripple',
          element: <Ripple />,
        },
        {
          path: '/feat/countup',
          element: <Countup />,
        },
        {
          path: '/feat/draggable',
          element: <Draggable />,
        },
        {
          path: '/feat/debounce',
          element: <Debounce />,
        },
        {
          path: '/feat/throttle',
          element: <Throttle />,
        },
        {
          path: '/feat/throttle',
          element: <Throttle />,
        },
        {
          path: '/senior/form/step',
          element: <StepForm />
        },
        {
          path: '/senior/form/senior',
          element: <SeniorForm />
        },
        {
          path: '/senior/table/base',
          element: <BaseTable />
        },
        {
          path: '/senior/table/hooks',
          element: <HooksTable />
        },
        {
          path: '/senior/list/standard',
          element: <StandardList />
        },
        {
          path: '/senior/list/card',
          element: <CardList />
        },
        {
          path: '/senior/list/searchArticle',
          element: <SearchArticle />
        },
        {
          path: '/senior/list/searchProject',
          element: <SearchProject />
        },
        {
          path: '/senior/list/searchApplication',
          element: <SearchApplication />
        },
        {
          path: '/senior/detail/base',
          element: <BaseDetail />
        },
        {
          path: '/senior/detail/senior',
          element: <SeniorDetail />
        },
        {
          path: '/senior/result/success',
          element: <SuccessResult />
        },
        {
          path: '/senior/result/fail',
          element: <FailResult />
        },
        {
          path: '/senior/exception/403',
          element: <Exception403 />
        },
        {
          path: '/senior/exception/404',
          element: <Exception404 />
        },
        {
          path: '/senior/exception/500',
          element: <Exception500 />
        },
        {
          path: '/senior/account/center',
          element: <AccountCenter />
        },
        {
          path: '/senior/account/setting',
          element: <AccountSetting />
        },
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return routes
}

const App = () => {
  const locale = useSelector((state: any) => state.base.locale)
  const primaryColor = useSelector((state: any) => state.base.primaryColor)

  ConfigProvider.config({
    theme: {
      primaryColor: primaryColor,
    },
  })
  return (
    <ConfigProvider 
    locale={locale === 'zh_CN' ? zh_CN : en_US}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
