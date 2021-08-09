import { combineReducers } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  fetchWordListAction,
  fetchWordListActionOK,
  fetchWordListActionError,
  fetchWordListActionReset,
  addWordToWordListAction,
  updateWordInWordListAction,
  removeWordInWordListAction
} from 'src/actions/wordList'

const wordListData = (state = [], action) => {
  switch (action.type) {
    case fetchWordListAction().type:
    case fetchWordListActionError().type:
    case fetchWordListActionReset().type:
      return []

    case fetchWordListActionOK().type:
      return action.payload

    case addWordToWordListAction().type:
      return [...state, action.payload]

    case updateWordInWordListAction().type:
      return state.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      )

    case removeWordInWordListAction().type:
      return state.filter(t => t.id !== action.payload.id)

    default:
      return state
  }
}

const wordListStatus = (state = requestStatus.INITIAL, action) => {
  switch (action.type) {
    case fetchWordListAction().type:
      return requestStatus.PROGRESS

    case fetchWordListActionOK().type:
      return requestStatus.OK

    case fetchWordListActionError().type:
      return requestStatus.ERROR

    case fetchWordListActionReset().type:
      return requestStatus.INITIAL

    default:
      return state
  }
}

export default combineReducers({ data: wordListData, status: wordListStatus })
