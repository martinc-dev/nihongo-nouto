import { combineReducers, Reducer, AnyAction } from 'redux'

import { NAV_ACTION_TYPES, NavState, NavAction } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'

const currentContentType: Reducer<ResourceTypeKey | null, AnyAction> = (
  state: ResourceTypeKey | null = null,
  action: AnyAction,
): ResourceTypeKey | null => {
  switch (action.type) {
    case NAV_ACTION_TYPES.SET_CURRENT_CONTENT_TYPE:
      return (action as NavAction).payload

    default:
      return state
  }
}

const navReducer = combineReducers({ currentContentType })

export default navReducer as Reducer<NavState, AnyAction>
