import { combineReducers } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  fetchWordDupeAction,
  fetchWordDupeActionOK,
  fetchWordDupeActionError,
  fetchWordDupeActionReset,
  fetchWordSearchAction,
  fetchWordSearchActionOK,
  fetchWordSearchActionError,
  fetchWordSearchActionReset
} from 'src/actions/search'

const wordDupeData = (state = [], action) => {
  switch (action.type) {
    case fetchWordDupeAction().type:
    case fetchWordDupeActionError().type:
    case fetchWordDupeActionReset().type:
      return []

    case fetchWordDupeActionOK().type:
      return action.payload

    default:
      return state
  }
}

const wordDupeStatus = (state = requestStatus.INITIAL, action) => {
  switch (action.type) {
    case fetchWordDupeAction().type:
      return requestStatus.PROGRESS

    case fetchWordDupeActionOK().type:
      return requestStatus.OK

    case fetchWordDupeActionError().type:
      return requestStatus.ERROR

    case fetchWordDupeActionReset().type:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const wordSearchData = (state = {}, action) => {
  switch (action.type) {
    case fetchWordSearchAction().type:
    case fetchWordSearchActionError().type:
    case fetchWordSearchActionReset().type:
      return {}

    case fetchWordSearchActionOK().type:
      return action.payload

    default:
      return state
  }
}

const wordSearchStatus = (state = requestStatus.INITIAL, action) => {
  switch (action.type) {
    case fetchWordSearchAction().type:
      return requestStatus.PROGRESS

    case fetchWordSearchActionOK().type:
      return requestStatus.OK

    case fetchWordSearchActionError().type:
      return requestStatus.ERROR

    case fetchWordSearchActionReset().type:
      return requestStatus.INITIAL

    default:
      return state
  }
}

export default combineReducers({
  dupe: combineReducers({
    data: wordDupeData,
    status: wordDupeStatus
  }),
  search: combineReducers({
    data: wordSearchData,
    status: wordSearchStatus
  })
})
