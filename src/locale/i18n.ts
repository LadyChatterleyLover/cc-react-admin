import i18n from "i18next"
import { initReactI18next } from "react-i18next"


const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Analysis": "Analysis",
      "Workplace": "Workplace",
      "Components": "Components",
      "ChooseIcon": "ChooseIcon",
      "ChooseArea": "ChooseArea",
      "ChooseTime": "ChooseTime",
      "ChooseCity": "ChooseCity",
      "Timeline": "Timeline",
      "Trend": "Trend",
      "Notification": "Notification",
      "Progress": "Progress",
      "Calendar": "Calendar",
      "Form": "Form",
      "Desc": "Desc",
      "Feat": "Feat",
      "Copy": "Copy",
      "Watermark": "Watermark",
      "Fullscreen": "Fullscreen",
      "ClickOutside": "ClickOutside",
      "Ripple": "Ripple",
      "Countup": "Countup",
      "RotateVerify": "RotateVerify",
      "SlideVerify": "SlideVerify",
      "PasswordStrength": "PasswordStrength",
      "Debounce": "Debounce",
      "Throttle": "Throttle",
      "ButtonAuth": "ButtonAuth",
      "Senior": "Senior",
      "SeniorTable": "SeniorTable",
      "SeniorForm": "SeniorForm",
      "StepForm": "StepForm",
      "BaseTable": "Base Table",
      "HooksTable": "Hooks Table",
      "List": "List",
      "StandardList": "StandardList",
      "SearchArticle": "SearchArticle",
      "SearchProject": "SearchProject",
      "SearchApplication": "SearchApplication",
      "CardList": "CardList",
      "Detail": "Detail",
      "BaseDetail": "BaseDetail",
      "SeniorDetail": "SeniorDetail",
      "Result": "Result",
      "Success": "Success",
      "Fail": "Fail",
      "Exception": "Exception",
      "403": "403",
      "404": "404",
      "500": "500",
      "Account": "Account",
      "AccountCenter": "AccountCenter",
      "AccountSetting": "AccountSetting",
    }
  },
  zh_CN: {
    translation: {
      "Dashboard": "Dashboard",
      "Analysis": "分析页",
      "Workplace": "工作台",
      "Components": "组件",
      "ChooseIcon": "图标选择器",
      "ChooseArea": "省市区选择器",
      "ChooseTime": "时间选择器",
      "ChooseCity": "城市选择器",
      "Timeline": "时间轴",
      "Trend": "趋势标记",
      "Notification": "通知菜单",
      "Progress": "进度条",
      "Calendar": "日历",
      "Form": "表单",
      "Desc": "描述",
      "Feat": "功能",
      "Copy": "复制",
      "Watermark": "水印",
      "Fullscreen": "全屏",
      "ClickOutside": "ClickOutside",
      "Ripple": "水波纹",
      "Countup": "数字自增长",
      "RotateVerify": "旋转验证码",
      "SlideVerify": "滑动验证码",
      "PasswordStrength": "密码强度",
      "Debounce": "防抖",
      "Throttle": "节流",
      "ButtonAuth": "按钮权限",
      "Senior": "高级组件",
      "SeniorForm": "高级表单",
      "StepForm": "分步表单",
      "SeniorTable": "高级表格",
      "BaseTable": "基础表格",
      "HooksTable": "Hooks表格",
      "List": "列表",
      "StandardList": "标准列表",
      "SearchArticle": "搜索文章",
      "SearchProject": "搜索项目",
      "SearchApplication": "搜索应用",
      "CardList": "卡片列表",
      "Detail": "详情页",
      "BaseDetail": "基础详情页",
      "SeniorDetail": "高级详情页",
      "Result": "结果页",
      "Success": "成功页",
      "Fail": "失败页",
      "Exception": "异常",
      "403": "403",
      "404": "404",
      "500": "500",
      "Account": "个人页",
      "AccountCenter": "个人中心",
      "AccountSetting": "个人设置",
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('locale') || "zh_CN", //设置当前语言
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })


export default i18n
