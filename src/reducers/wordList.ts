import { combineReducers, Reducer, AnyAction } from 'redux'

import requestStatus from 'src/constants/requestStatus'
import {
  WORD_LIST_ACTION_TYPES,
  FetchWordListActionOK,
  AddWordToWordListAction,
  UpdateWordInWordListAction,
  RemoveWordInWordListAction,
  WordListState,
} from 'src/types/redux'
import { WordListItem } from 'src/types/words'

const wordListData: Reducer<WordListItem[], AnyAction> = (
  state: WordListItem[] = [],
  action: AnyAction
): WordListItem[] => {
  switch (action.type) {
    case WORD_LIST_ACTION_TYPES.FETCH:
    case WORD_LIST_ACTION_TYPES.FETCH_ERROR:
    case WORD_LIST_ACTION_TYPES.FETCH_RESET:
      return []

    case WORD_LIST_ACTION_TYPES.FETCH_OK:
      return (action as FetchWordListActionOK).payload || []

    case WORD_LIST_ACTION_TYPES.ADD:
      return [...state, (action as AddWordToWordListAction).payload]

    case WORD_LIST_ACTION_TYPES.UPDATE:
      return state.map(t =>
        t.id === (action as UpdateWordInWordListAction).payload?.id
          ? { ...t, ...(action as UpdateWordInWordListAction).payload }
          : t
      )

    case WORD_LIST_ACTION_TYPES.REMOVE:
      return state.filter(
        t => t.id !== (action as RemoveWordInWordListAction).payload?.id
      )

    default:
      return state
  }
}

const wordListStatus: Reducer<string, AnyAction> = (
  state: string = requestStatus.INITIAL,
  action: AnyAction
): string => {
  switch (action.type) {
    case WORD_LIST_ACTION_TYPES.FETCH:
      return requestStatus.PROGRESS

    case WORD_LIST_ACTION_TYPES.FETCH_OK:
      return requestStatus.OK

    case WORD_LIST_ACTION_TYPES.FETCH_ERROR:
      return requestStatus.ERROR

    case WORD_LIST_ACTION_TYPES.FETCH_RESET:
      return requestStatus.INITIAL

    default:
      return state
  }
}

const wordListReducer = combineReducers({
  data: wordListData,
  status: wordListStatus,
})

export default wordListReducer as Reducer<WordListState, AnyAction>
