const initState: any = {
  locale: localStorage.getItem('locale') || 'zh_CN',
  primaryColor: localStorage.getItem('primaryColor') || '#1890ff',
  sideTheme: localStorage.getItem('sideTheme') || 'light',
  navMode: localStorage.getItem('navMode') || 'side',
  fixedSide: localStorage.getItem('fixedSide') || '0',
  fixedHeader: localStorage.getItem('fixedHeader') || '0',
}

interface Action {
  type: string,
  data: any
}

export default function BaseReducers(state = initState, action: Action) {
  switch (action.type) {
    case 'setLocale':
      state.locale = action.data
      return {
        ...state,
      }
    case 'setSideTheme':
      state.sideTheme = action.data
      return {
        ...state
      }
    case 'setNavMode':
      state.navMode = action.data
      return {
        ...state
      }
    case 'setFixedSide':
      state.fixedSide = action.data
      return {
        ...state
      }
    case 'setFixedHeader':
      state.fixedHeader = action.data
      return {
        ...state
      }
    case 'setPrimaryColor':
      state.primaryColor = action.data
      return {
        ...state,
      }
    default: {
      return {
        ...state
      }
    }
  }
}