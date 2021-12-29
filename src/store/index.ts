import {createStore, combineReducers} from 'redux'
import navReducers from './reducers/navs'
import localeReducers from './reducers/base'


const store = createStore(combineReducers({
  nav: navReducers,
  base: localeReducers
}))

export default store