import { Action } from 'redux'
import { RouterState } from 'redux-first-history'
import { ResourceTypeKey } from './index'
import {
  WordListItem,
  WordDetail,
  ApiError,
  WordDupeResult,
  SearchData,
} from './words'
import { RequestStatus } from 'src/constants/requestStatus'

// Action types
export const NAV_ACTION_TYPES = {
  SET_CURRENT_CONTENT_TYPE: 'NAV:CONTENT_TYPE:SET',
} as const

export interface SetCurrentContentTypeAction extends Action<string> {
  type: typeof NAV_ACTION_TYPES.SET_CURRENT_CONTENT_TYPE
  payload: ResourceTypeKey | null
  [key: string]: string | ResourceTypeKey | null | undefined
}

export type NavAction = SetCurrentContentTypeAction

// State types
export interface NavState {
  currentContentType: ResourceTypeKey | null
}

// Word List Actions
export const WORD_LIST_ACTION_TYPES = {
  FETCH: 'WORD_LIST:FETCH',
  FETCH_OK: 'WORD_LIST:FETCH:OK',
  FETCH_ERROR: 'WORD_LIST:FETCH:ERROR',
  FETCH_RESET: 'WORD_LIST:FETCH:RESET',
  ADD: 'WORD_LIST:ADD',
  UPDATE: 'WORD_LIST:UPDATE',
  REMOVE: 'WORD_LIST:REMOVE',
} as const

export interface FetchWordListAction extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.FETCH
  payload?: undefined
  [key: string]: string | undefined
}

export interface FetchWordListActionOK extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.FETCH_OK
  payload: WordListItem[]
}

export interface FetchWordListActionError extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.FETCH_ERROR
  payload: ApiError
}

export interface FetchWordListActionReset extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.FETCH_RESET
  payload?: undefined
}

export interface AddWordToWordListAction extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.ADD
  payload: WordListItem
}

export interface UpdateWordInWordListAction extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.UPDATE
  payload: WordListItem
}

export interface RemoveWordInWordListAction extends Action<string> {
  type: typeof WORD_LIST_ACTION_TYPES.REMOVE
  payload: { id: number | string }
}

// Word Detail Actions
export const WORD_DETAIL_ACTION_TYPES = {
  FETCH: 'WORD_DETAIL:FETCH',
  FETCH_OK: 'WORD_DETAIL:FETCH:OK',
  FETCH_ERROR: 'WORD_DETAIL:FETCH:ERROR',
  FETCH_RESET: 'WORD_DETAIL:FETCH:RESET',
  SAVE: 'WORD_DETAIL:SAVE',
  SAVE_OK: 'WORD_DETAIL:SAVE:OK',
  SAVE_ERROR: 'WORD_DETAIL:SAVE:ERROR',
  SAVE_RESET: 'WORD_DETAIL:SAVE:RESET',
  DELETE: 'WORD_DETAIL:DELETE',
  DELETE_OK: 'WORD_DETAIL:DELETE:OK',
  DELETE_ERROR: 'WORD_DETAIL:DELETE:ERROR',
  DELETE_RESET: 'WORD_DETAIL:DELETE:RESET',
} as const

export interface FetchWordDetailAction extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.FETCH
  payload: { id: string | number }
  [key: string]: string | { id: string | number } | undefined
}

export interface FetchWordDetailActionOK extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.FETCH_OK
  payload: WordDetail
}

export interface FetchWordDetailActionError extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.FETCH_ERROR
  payload: ApiError
}

export interface FetchWordDetailActionReset extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.FETCH_RESET
  payload?: undefined
  [key: string]: string | undefined
}

export interface SaveWordDetailAction extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.SAVE
  payload: Partial<WordDetail> & { id?: number }
}

export interface SaveWordDetailActionOK extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.SAVE_OK
  payload?: undefined
}

export interface SaveWordDetailActionError extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.SAVE_ERROR
  payload: ApiError
}

export interface SaveWordDetailActionReset extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.SAVE_RESET
  payload?: undefined
}

export interface DeleteWordDetailAction extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.DELETE
  payload: { id: string | number }
}

export interface DeleteWordDetailActionOK extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.DELETE_OK
  payload?: undefined
}

export interface DeleteWordDetailActionError extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.DELETE_ERROR
  payload: ApiError
}

export interface DeleteWordDetailActionReset extends Action<string> {
  type: typeof WORD_DETAIL_ACTION_TYPES.DELETE_RESET
  payload?: undefined
}

// Search Actions
export const SEARCH_ACTION_TYPES = {
  FETCH_DUPE: 'WORD_DUPE:FETCH',
  FETCH_DUPE_OK: 'WORD_DUPE:FETCH:OK',
  FETCH_DUPE_ERROR: 'WORD_DUPE:FETCH:ERROR',
  FETCH_DUPE_RESET: 'WORD_DUPE:FETCH:RESET',
  FETCH_SEARCH: 'WORD_SEARCH:FETCH',
  FETCH_SEARCH_OK: 'WORD_SEARCH:FETCH:OK',
  FETCH_SEARCH_ERROR: 'WORD_SEARCH:FETCH:ERROR',
  FETCH_SEARCH_RESET: 'WORD_SEARCH:FETCH:RESET',
} as const

export interface FetchWordDupeAction extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_DUPE
  payload: { word: string }
}

export interface FetchWordDupeActionOK extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_DUPE_OK
  payload: WordDupeResult
}

export interface FetchWordDupeActionError extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_DUPE_ERROR
  payload: ApiError
}

export interface FetchWordDupeActionReset extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_DUPE_RESET
  payload?: undefined
}

export interface FetchWordSearchAction extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_SEARCH
  payload: string
  [key: string]: string | undefined
}

export interface FetchWordSearchActionOK extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_SEARCH_OK
  payload: SearchData
}

export interface FetchWordSearchActionError extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_SEARCH_ERROR
  payload: ApiError
}

export interface FetchWordSearchActionReset extends Action<string> {
  type: typeof SEARCH_ACTION_TYPES.FETCH_SEARCH_RESET
  payload?: undefined
  [key: string]: string | undefined
}

// Word List State
export interface WordListState {
  data: WordListItem[]
  status: RequestStatus
}

// Word Detail State
export interface FetchWordDetailState {
  data: WordDetail
  status: RequestStatus
}

export interface SaveWordDetailState {
  status: RequestStatus
}

export interface DeleteWordDetailState {
  status: RequestStatus
}

export interface WordDetailState {
  fetchWordDetail: FetchWordDetailState
  saveWordDetail: SaveWordDetailState
  deleteWordDetail: DeleteWordDetailState
}

// Search State
export interface WordDupeState {
  data: WordDupeResult
  status: RequestStatus
}

export interface WordSearchState {
  data: SearchData
  status: RequestStatus
}

export interface SearchState {
  dupe: WordDupeState
  search: WordSearchState
}

// Root state
export interface RootState {
  nav: NavState
  router: RouterState
  wordList: WordListState
  wordDetail: WordDetailState
  search: SearchState
}
