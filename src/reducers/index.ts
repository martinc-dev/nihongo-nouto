import { combineReducers, Reducer, AnyAction } from 'redux'

import nav from 'src/reducers/nav'
import wordList from 'src/reducers/wordList'
import wordDetail from 'src/reducers/wordDetail'
import search from 'src/reducers/search'
import { RootState } from 'src/types/redux'

const createRootReducer = (routerReducer: Reducer): Reducer<RootState, AnyAction> =>
  combineReducers({
    nav,
    wordList,
    wordDetail,
    search,
    router: routerReducer,
  }) as Reducer<RootState, AnyAction>

export default createRootReducer

