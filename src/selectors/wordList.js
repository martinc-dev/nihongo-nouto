import { createSelector } from 'reselect'

const getWordListStore = state => state.wordList || {}

export const getWordListData = createSelector(getWordListStore, store => store.data)
export const getWordListStatus = createSelector(getWordListStore, store => store.status)
