import { createSelector } from 'reselect'

const getSearchStore = state => state.search || {}

const getSearchStoreDupe = createSelector(getSearchStore, store => store.dupe)

export const getSearchStoreDupeData = createSelector(getSearchStoreDupe, store => store.data)
export const getSearchStoreDupeStatus = createSelector(getSearchStoreDupe, store => store.status)
