import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import nav from 'src/reducers/nav'

const createRootReducer = history =>
  combineReducers({
    nav,
    router: connectRouter(history)
  })

export default createRootReducer
