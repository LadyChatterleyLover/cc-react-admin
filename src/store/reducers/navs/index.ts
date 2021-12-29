const initState: any = {
  navs: JSON.parse(localStorage.getItem('navs')!) || []
}

interface Action {
  type: string,
  data: any
}

export default function NavReducers(state = initState, action: Action) {
  switch(action.type) {
    case 'setNav':
      state.navs = action.data
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