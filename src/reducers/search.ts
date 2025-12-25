import { combineReducers, Reducer, AnyAction } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  SEARCH_ACTION_TYPES,
  FetchWordDupeActionOK,
  FetchWordSearchActionOK,
  SearchState,
  WordDupeState,
  WordSearchState,
} from 'src/types/redux'
import { WordDupeResult, SearchData } from 'src/types/words'

const wordDupeData: Reducer<WordDupeResult, AnyAction> = (
  state: WordDupeResult = [],
  action: AnyAction
): WordDupeResult => {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.FETCH_DUPE:
    case SEARCH_ACTION_TYPES.FETCH_DUPE_ERROR:
    case SEARCH_ACTION_TYPES.FETCH_DUPE_RESET:
      return []

    case SEARCH_ACTION_TYPES.FETCH_DUPE_OK:
      return (action as FetchWordDupeActionOK).payload || []

    default:
      return state
  }
}

const wordDupeStatus: Reducer<string, AnyAction> = (
  state: string = requestStatus.INITIAL,
  action: AnyAction
): string => {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.FETCH_DUPE:
      return requestStatus.PROGRESS

    case SEARCH_ACTION_TYPES.FETCH_DUPE_OK:
      return requestStatus.OK

    case SEARCH_ACTION_TYPES.FETCH_DUPE_ERROR:
      return requestStatus.ERROR

    case SEARCH_ACTION_TYPES.FETCH_DUPE_RESET:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const wordSearchData: Reducer<SearchData, AnyAction> = (
  state: SearchData = {},
  action: AnyAction
): SearchData => {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.FETCH_SEARCH:
    case SEARCH_ACTION_TYPES.FETCH_SEARCH_ERROR:
    case SEARCH_ACTION_TYPES.FETCH_SEARCH_RESET:
      return {}

    case SEARCH_ACTION_TYPES.FETCH_SEARCH_OK:
      return (action as FetchWordSearchActionOK).payload || {}

    default:
      return state
  }
}

const wordSearchStatus: Reducer<string, AnyAction> = (
  state: string = requestStatus.INITIAL,
  action: AnyAction
): string => {
  switch (action.type) {
    case SEARCH_ACTION_TYPES.FETCH_SEARCH:
      return requestStatus.PROGRESS

    case SEARCH_ACTION_TYPES.FETCH_SEARCH_OK:
      return requestStatus.OK

    case SEARCH_ACTION_TYPES.FETCH_SEARCH_ERROR:
      return requestStatus.ERROR

    case SEARCH_ACTION_TYPES.FETCH_SEARCH_RESET:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const searchReducer = combineReducers({
  dupe: combineReducers({
    data: wordDupeData,
    status: wordDupeStatus,
  }),
  search: combineReducers({
    data: wordSearchData,
    status: wordSearchStatus,
  }),
})

export default searchReducer as Reducer<SearchState, AnyAction>
