export const menuData = [
  {
    title: 'Dashboard',
    key: '/dashboard',
    icon: 'HomeOutlined',
    t: 'Dashboard',
    children: [
      {
        title: '分析页',
        key: '/dashboard/analysis',
        icon: 'PicCenterOutlined',
        t: 'Analysis'
      },
      {
        title: '工作台',
        key: '/dashboard/workplace',
        icon: 'FormOutlined',
        t: 'Workplace'
      }
    ],
  },
  {
    title: '组件',
    icon: 'HomeOutlined',
    key: '/components',
    t: 'Components',
    children: [
      {
        title: '图标选择器',
        key: '/components/chooseIcon',
        icon: 'EditOutlined',
        t: 'ChooseIcon',
        children: [],
      },
      {
        title: '省市区选择器',
        key: '/components/chooseArea',
        icon: 'BulbOutlined',
        t: 'ChooseArea',
        children: [],
      },
      {
        title: '时间选择器',
        key: '/components/chooseTime',
        t: 'ChooseTime',
        icon: 'FieldTimeOutlined',
        children: [],
      },
      {
        title: '城市选择器',
        key: '/components/chooseCity',
        t: 'ChooseCity',
        icon: 'AppstoreOutlined',
        children: [],
      },
      {
        title: '趋势标记',
        key: '/components/trend',
        t: 'Trend',
        icon: 'VerticalAlignMiddleOutlined',
        children: [],
      },
      {
        title: '通知菜案',
        key: '/components/notification',
        t: 'Notification',
        icon: 'BellOutlined',
        children: [],
      },
      {
        title: '进度条',
        key: '/components/progress',
        t: 'Progress',
        icon: 'AlignLeftOutlined',
        children: [],
      },
      {
        title: '数据列表',
        key: '/components/dataList',
        t: 'DataList',
        icon: 'UnorderedListOutlined',
        children: [],
      },
      {
        title: '宫格',
        key: '/components/grid',
        t: 'Grid',
        icon: 'AppstoreOutlined',
        children: [],
      },
      {
        title: '分割面板',
        key: '/components/split',
        t: 'Split',
        icon: 'ExportOutlined',
        children: [],
      },
      {
        title: '滑动验证码',
        key: '/components/slideVerify',
        t: 'SlideVerify',
        icon: 'ArrowRightOutlined',
        children: [],
      },
      {
        title: '旋转验证码',
        key: '/components/rotateVerify',
        t: 'RotateVerify',
        icon: 'RotateRightOutlined',
        children: [],
      },
      {
        title: '密码强度',
        key: '/components/passwordStrength',
        t: 'PasswordStrength',
        icon: 'BulbOutlined',
        children: [],
      },
      {
        title: '时间轴',
        key: '/components/timeline',
        t: 'Timeline',
        icon: 'UnorderedListOutlined',
        children: [],
      },
      {
        title: '日历',
        key: '/components/calendar',
        t: 'Calendar',
        icon: 'CalendarOutlined',
        children: [],
      },
      {
        title: '表单',
        key: '/components/form',
        t: 'Form',
        icon: 'DatabaseOutlined',
        children: [],
      }
    ]
  },
  {
    title: '功能',
    key: '/feat',
    icon: 'SettingOutlined',
    t: 'Feat',
    children: [
      {
        title: '复制',
        key: '/feat/copy',
        icon: 'CopyOutlined',
        t: 'Copy'
      },
      {
        title: '水印',
        key: '/feat/watermark',
        icon: 'BorderTopOutlined',
        t: 'Watermark'
      },
      {
        title: '全屏',
        key: '/feat/fullscreen',
        icon: 'FullscreenOutlined',
        t: 'Fullscreen'
      },
      {
        title: 'clickOutside',
        key: '/feat/clickOutside',
        icon: 'RadiusBottomrightOutlined',
        t: 'ClickOutside'
      },
      {
        title: '水波纹',
        key: '/feat/ripple',
        icon: 'WifiOutlined',
        t: 'Ripple'
      },
      {
        title: '数字自增长',
        key: '/feat/countup',
        icon: 'FieldNumberOutlined',
        t: 'Countup'
      },
      {
        title: '元素拖动',
        key: '/feat/draggable',
        icon: 'DragOutlined',
        t: 'Draggable'
      },
      {
        title: '防抖',
        key: '/feat/debounce',
        icon: 'FilterOutlined',
        t: 'Debounce'
      },
      {
        title: '节流',
        key: '/feat/throttle',
        icon: 'MoreOutlined',
        t: 'Throttle'
      },
    ]
  },
  {
    title: '页面',
    key: '/senior',
    icon: 'PaperClipOutlined',
    t: 'Senior',
    children: [
      {
        title: '高级表格',
        key: '/senior/table',
        icon: 'TableOutlined',
        t: 'SeniorTable',
        children: [
          {
            title: '基础表格',
            key: '/senior/table/base',
            icon: 'TabletOutlined',
            t: 'BaseTable',
          },
          {
            title: 'hooks表格',
            key: '/senior/table/hooks',
            icon: 'TabletOutlined',
            t: 'HooksTable',
          }
        ]
      },
      {
        title: '高级表单',
        key: '/senior/form',
        icon: 'BorderOuterOutlined',
        t: 'SeniorForm',
        children: [
          {
            title: '分步表单',
            key: '/senior/form/step',
            icon: 'BorderVerticleOutlined',
            t: 'StepForm',
          },
          {
            title: '高级表单',
            key: '/senior/form/senior',
            icon: 'BorderVerticleOutlined',
            t: 'SeniorForm',
          }
        ]
      },
      {
        title: '列表页',
        key: '/senior/list',
        icon: 'OrderedListOutlined',
        t: 'List',
        children: [
          {
            title: '搜索文章',
            key: '/senior/list/searchArticle',
            icon: 'UnorderedListOutlined',
            t: 'SearchArticle',
          },
          {
            title: '搜索项目',
            key: '/senior/list/searchProject',
            icon: 'UnorderedListOutlined',
            t: 'SearchProject',
          },
          {
            title: '搜索项目',
            key: '/senior/list/searchApplication',
            icon: 'UnorderedListOutlined',
            t: 'SearchApplication',
          },
          {
            title: '标准列表',
            key: '/senior/list/standard',
            icon: 'UnorderedListOutlined',
            t: 'StandardList',
          },
          {
            title: '卡片列表',
            key: '/senior/list/card',
            icon: 'UnorderedListOutlined',
            t: 'CardList',
          }
        ]
      },
      {
        title: '详情页',
        key: '/senior/detail',
        icon: 'BookOutlined',
        t: 'Detail',
        children: [
          {
            title: '基础详情页',
            key: '/senior/detail/base',
            icon: 'CreditCardOutlined',
            t: 'BaseDetail',
          },
          {
            title: '基础详情页',
            key: '/senior/detail/senior',
            icon: 'CreditCardOutlined',
            t: 'SeniorDetail',
          }
        ]
      },
      {
        title: '结果页',
        key: '/senior/result',
        icon: 'FileTextOutlined',
        t: 'Result',
        children: [
          {
            title: '成功页',
            key: '/senior/result/success',
            icon: 'CheckOutlined',
            t: 'Success',
          },
          {
            title: '失败页',
            key: '/senior/result/fail',
            icon: 'CloseOutlined',
            t: 'Fail',
          }
        ]
      },
      {
        title: '异常页',
        key: '/senior/exception',
        icon: 'WarningOutlined',
        t: 'Exception',
        children: [
          {
            title: '403',
            key: '/senior/exception/403',
            icon: 'ExclamationCircleOutlined',
            t: '403',
          },
          {
            title: '404',
            key: '/senior/exception/404',
            icon: 'ExclamationCircleOutlined',
            t: '404',
          },
          {
            title: '500',
            key: '/senior/exception/500',
            icon: 'ExclamationCircleOutlined',
            t: '500',
          },
        ]
      },
      {
        title: '个人页',
        key: '/senior/account',
        icon: 'UserOutlined',
        t: 'Account',
        children: [
          {
            title: '个人中心',
            key: '/senior/account/center',
            icon: 'UserSwitchOutlined',
            t: 'AccountCenter',
          },
          {
            title: '个人设置',
            key: '/senior/account/setting',
            icon: 'UsergroupAddOutlined',
            t: 'AccountSetting',
          },
        ]
      },
    ]
  }
]