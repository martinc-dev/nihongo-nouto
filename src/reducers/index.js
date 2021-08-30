import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import nav from 'src/reducers/nav'
import wordList from 'src/reducers/wordList'
import wordDetail from 'src/reducers/wordDetail'
import search from 'src/reducers/search'

const createRootReducer = history =>
  combineReducers({
    nav,
    wordList,
    wordDetail,
    search,
    router: connectRouter(history),
  })

export default createRootReducer
