import {
  SEARCH_ACTION_TYPES,
  FetchWordDupeAction,
  FetchWordDupeActionOK,
  FetchWordDupeActionError,
  FetchWordDupeActionReset,
  FetchWordSearchAction,
  FetchWordSearchActionOK,
  FetchWordSearchActionError,
  FetchWordSearchActionReset,
} from 'src/types/redux'
import { WordDupeResult, SearchData, ApiError } from 'src/types/words'

export { SEARCH_ACTION_TYPES }

export const fetchWordDupeAction = (payload: { word: string }): FetchWordDupeAction => ({
  type: SEARCH_ACTION_TYPES.FETCH_DUPE,
  payload,
})

export const fetchWordDupeActionOK = (payload: WordDupeResult): FetchWordDupeActionOK => ({
  type: SEARCH_ACTION_TYPES.FETCH_DUPE_OK,
  payload,
})

export const fetchWordDupeActionError = (payload: ApiError): FetchWordDupeActionError => ({
  type: SEARCH_ACTION_TYPES.FETCH_DUPE_ERROR,
  payload,
})

export const fetchWordDupeActionReset = (): FetchWordDupeActionReset => ({
  type: SEARCH_ACTION_TYPES.FETCH_DUPE_RESET,
})

export const fetchWordSearchAction = (payload: string): FetchWordSearchAction => ({
  type: SEARCH_ACTION_TYPES.FETCH_SEARCH,
  payload,
})

export const fetchWordSearchActionOK = (payload: SearchData): FetchWordSearchActionOK => ({
  type: SEARCH_ACTION_TYPES.FETCH_SEARCH_OK,
  payload,
})

export const fetchWordSearchActionError = (payload: ApiError): FetchWordSearchActionError => ({
  type: SEARCH_ACTION_TYPES.FETCH_SEARCH_ERROR,
  payload,
})

export const fetchWordSearchActionReset = (): FetchWordSearchActionReset => ({
  type: SEARCH_ACTION_TYPES.FETCH_SEARCH_RESET,
})
