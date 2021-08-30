import { combineReducers } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  fetchWordDetailAction,
  fetchWordDetailActionOK,
  fetchWordDetailActionError,
  fetchWordDetailActionReset,
} from 'src/actions/wordDetail'

const wordDetailData = (state = null, action) => {
  switch (action.type) {
    case fetchWordDetailAction().type:
    case fetchWordDetailActionError().type:
    case fetchWordDetailActionReset().type:
      return null

    case fetchWordDetailActionOK().type:
      return action.payload

    default:
      return state
  }
}

const wordDetailStatus = (state = requestStatus.INITIAL, action) => {
  switch (action.type) {
    case fetchWordDetailAction().type:
      return requestStatus.PROGRESS

    case fetchWordDetailActionOK().type:
      return requestStatus.OK

    case fetchWordDetailActionError().type:
      return requestStatus.ERROR

    case fetchWordDetailActionReset().type:
      return requestStatus.INITIAL

    default:
      return state
  }
}

export default combineReducers({ data: wordDetailData, status: wordDetailStatus })
