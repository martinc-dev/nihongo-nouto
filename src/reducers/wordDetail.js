import { combineReducers } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  fetchWordDetailAction,
  fetchWordDetailActionOK,
  fetchWordDetailActionError,
  fetchWordDetailActionReset,
  saveWordDetailAction,
  saveWordDetailActionOK,
  saveWordDetailActionError,
  saveWordDetailActionReset,
  deleteWordDetailAction,
  deleteWordDetailActionOK,
  deleteWordDetailActionError,
  deleteWordDetailActionReset,
} from 'src/actions/wordDetail'

const fetchWordDetailData = (state = null, action) => {
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

const fetchWordDetailStatus = (state = requestStatus.INITIAL, action) => {
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

const saveWordDetailStatus = (state = requestStatus.INITIAL, action) => {
  switch (action.type) {
    case saveWordDetailAction().type:
      return requestStatus.PROGRESS

    case saveWordDetailActionOK().type:
      return requestStatus.OK

    case saveWordDetailActionError().type:
      return requestStatus.ERROR

    case saveWordDetailActionReset().type:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const deleteWordDetailStatus = (state = requestStatus.INITIAL, action) => {
  switch (action.type) {
    case deleteWordDetailAction().type:
      return requestStatus.PROGRESS

    case deleteWordDetailActionOK().type:
      return requestStatus.OK

    case deleteWordDetailActionError().type:
      return requestStatus.ERROR

    case deleteWordDetailActionReset().type:
      return requestStatus.INITIAL

    default:
      return state
  }
}

export default combineReducers({
  fetchWordDetail: combineReducers({
    data: fetchWordDetailData,
    status: fetchWordDetailStatus,
  }),
  saveWordDetail: combineReducers({ status: saveWordDetailStatus }),
  deleteWordDetail: combineReducers({ status: deleteWordDetailStatus }),
})
