import {
  WORD_LIST_ACTION_TYPES,
  FetchWordListAction,
  FetchWordListActionOK,
  FetchWordListActionError,
  FetchWordListActionReset,
  AddWordToWordListAction,
  UpdateWordInWordListAction,
  RemoveWordInWordListAction,
} from 'src/types/redux'
import { WordListItem, ApiError } from 'src/types/words'

export { WORD_LIST_ACTION_TYPES }

export const fetchWordListAction = (): FetchWordListAction => ({
  type: WORD_LIST_ACTION_TYPES.FETCH,
})

export const fetchWordListActionOK = (payload: WordListItem[]): FetchWordListActionOK => ({
  type: WORD_LIST_ACTION_TYPES.FETCH_OK,
  payload,
})

export const fetchWordListActionError = (payload: ApiError): FetchWordListActionError => ({
  type: WORD_LIST_ACTION_TYPES.FETCH_ERROR,
  payload,
})

export const fetchWordListActionReset = (): FetchWordListActionReset => ({
  type: WORD_LIST_ACTION_TYPES.FETCH_RESET,
})

export const addWordToWordListAction = (payload: WordListItem): AddWordToWordListAction => ({
  type: WORD_LIST_ACTION_TYPES.ADD,
  payload,
})

export const updateWordInWordListAction = (payload: WordListItem): UpdateWordInWordListAction => ({
  type: WORD_LIST_ACTION_TYPES.UPDATE,
  payload,
})

export const removeWordInWordListAction = (payload: { id: number | string }): RemoveWordInWordListAction => ({
  type: WORD_LIST_ACTION_TYPES.REMOVE,
  payload,
})
