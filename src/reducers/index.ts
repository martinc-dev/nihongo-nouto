import { combineReducers, Reducer, AnyAction } from 'redux'

import nav from 'src/reducers/nav'
import { RootState } from 'src/types/redux'

const createRootReducer = (routerReducer: Reducer): Reducer<RootState, AnyAction> =>
  combineReducers({
    nav,
    router: routerReducer,
  }) as Reducer<RootState, AnyAction>

export default createRootReducer

