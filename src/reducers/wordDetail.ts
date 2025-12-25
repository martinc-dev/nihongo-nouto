import { combineReducers, Reducer, AnyAction } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  WORD_DETAIL_ACTION_TYPES,
  FetchWordDetailActionOK,
  WordDetailState,
  FetchWordDetailState,
  SaveWordDetailState,
  DeleteWordDetailState,
} from 'src/types/redux'
import { WordDetail } from 'src/types/words'

const fetchWordDetailData: Reducer<WordDetail, AnyAction> = (
  state: WordDetail = null,
  action: AnyAction
): WordDetail => {
  switch (action.type) {
    case WORD_DETAIL_ACTION_TYPES.FETCH:
    case WORD_DETAIL_ACTION_TYPES.FETCH_ERROR:
    case WORD_DETAIL_ACTION_TYPES.FETCH_RESET:
      return null

    case WORD_DETAIL_ACTION_TYPES.FETCH_OK:
      return (action as FetchWordDetailActionOK).payload

    default:
      return state
  }
}

const fetchWordDetailStatus: Reducer<string, AnyAction> = (
  state: string = requestStatus.INITIAL,
  action: AnyAction
): string => {
  switch (action.type) {
    case WORD_DETAIL_ACTION_TYPES.FETCH:
      return requestStatus.PROGRESS

    case WORD_DETAIL_ACTION_TYPES.FETCH_OK:
      return requestStatus.OK

    case WORD_DETAIL_ACTION_TYPES.FETCH_ERROR:
      return requestStatus.ERROR

    case WORD_DETAIL_ACTION_TYPES.FETCH_RESET:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const saveWordDetailStatus: Reducer<string, AnyAction> = (
  state: string = requestStatus.INITIAL,
  action: AnyAction
): string => {
  switch (action.type) {
    case WORD_DETAIL_ACTION_TYPES.SAVE:
      return requestStatus.PROGRESS

    case WORD_DETAIL_ACTION_TYPES.SAVE_OK:
      return requestStatus.OK

    case WORD_DETAIL_ACTION_TYPES.SAVE_ERROR:
      return requestStatus.ERROR

    case WORD_DETAIL_ACTION_TYPES.SAVE_RESET:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const deleteWordDetailStatus: Reducer<string, AnyAction> = (
  state: string = requestStatus.INITIAL,
  action: AnyAction
): string => {
  switch (action.type) {
    case WORD_DETAIL_ACTION_TYPES.DELETE:
      return requestStatus.PROGRESS

    case WORD_DETAIL_ACTION_TYPES.DELETE_OK:
      return requestStatus.OK

    case WORD_DETAIL_ACTION_TYPES.DELETE_ERROR:
      return requestStatus.ERROR

    case WORD_DETAIL_ACTION_TYPES.DELETE_RESET:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const wordDetailReducer = combineReducers({
  fetchWordDetail: combineReducers({
    data: fetchWordDetailData,
    status: fetchWordDetailStatus,
  }),
  saveWordDetail: combineReducers({
    status: saveWordDetailStatus,
  }),
  deleteWordDetail: combineReducers({
    status: deleteWordDetailStatus,
  }),
})

export default wordDetailReducer as Reducer<WordDetailState, AnyAction>
