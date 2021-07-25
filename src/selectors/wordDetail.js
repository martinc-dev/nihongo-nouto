import { createSelector } from 'reselect'

const getWordDetailStore = state => state.wordDetail || {}

export const getWordDetailData = createSelector(getWordDetailStore, store => store.data)
export const getWordDetailStatus = createSelector(getWordDetailStore, store => store.status)
