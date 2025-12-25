import { createSelector } from 'reselect'
import { RootState } from 'src/types/redux'

const getWordListStore = (state: RootState) => state.wordList || { data: [], status: 'INITIAL' }

export const getWordListData = createSelector(getWordListStore, store => store.data)
export const getWordListStatus = createSelector(getWordListStore, store => store.status)

