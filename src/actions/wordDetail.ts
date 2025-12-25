import {
  WORD_DETAIL_ACTION_TYPES,
  FetchWordDetailAction,
  FetchWordDetailActionOK,
  FetchWordDetailActionError,
  FetchWordDetailActionReset,
  SaveWordDetailAction,
  SaveWordDetailActionOK,
  SaveWordDetailActionError,
  SaveWordDetailActionReset,
  DeleteWordDetailAction,
  DeleteWordDetailActionOK,
  DeleteWordDetailActionError,
  DeleteWordDetailActionReset,
} from 'src/types/redux'
import { WordDetail, ApiError } from 'src/types/words'

export { WORD_DETAIL_ACTION_TYPES }

export const fetchWordDetailAction = (payload: { id: string | number }): FetchWordDetailAction => ({
  type: WORD_DETAIL_ACTION_TYPES.FETCH,
  payload,
})

export const fetchWordDetailActionOK = (payload: WordDetail): FetchWordDetailActionOK => ({
  type: WORD_DETAIL_ACTION_TYPES.FETCH_OK,
  payload,
})

export const fetchWordDetailActionError = (payload: ApiError): FetchWordDetailActionError => ({
  type: WORD_DETAIL_ACTION_TYPES.FETCH_ERROR,
  payload,
})

export const fetchWordDetailActionReset = (): FetchWordDetailActionReset => ({
  type: WORD_DETAIL_ACTION_TYPES.FETCH_RESET,
})

export const saveWordDetailAction = (
  payload: Partial<WordDetail> & { id?: number }
): SaveWordDetailAction => ({
  type: WORD_DETAIL_ACTION_TYPES.SAVE,
  payload,
})

export const saveWordDetailActionOK = (): SaveWordDetailActionOK => ({
  type: WORD_DETAIL_ACTION_TYPES.SAVE_OK,
})

export const saveWordDetailActionError = (payload: ApiError): SaveWordDetailActionError => ({
  type: WORD_DETAIL_ACTION_TYPES.SAVE_ERROR,
  payload,
})

export const saveWordDetailActionReset = (): SaveWordDetailActionReset => ({
  type: WORD_DETAIL_ACTION_TYPES.SAVE_RESET,
})

export const deleteWordDetailAction = (payload: { id: string | number }): DeleteWordDetailAction => ({
  type: WORD_DETAIL_ACTION_TYPES.DELETE,
  payload,
})

export const deleteWordDetailActionOK = (): DeleteWordDetailActionOK => ({
  type: WORD_DETAIL_ACTION_TYPES.DELETE_OK,
})

export const deleteWordDetailActionError = (payload: ApiError): DeleteWordDetailActionError => ({
  type: WORD_DETAIL_ACTION_TYPES.DELETE_ERROR,
  payload,
})

export const deleteWordDetailActionReset = (): DeleteWordDetailActionReset => ({
  type: WORD_DETAIL_ACTION_TYPES.DELETE_RESET,
})
