import { createSelector } from 'reselect'

const getSearchStore = state => state.search || {}

const getSearchStoreDupe = createSelector(getSearchStore, store => store.dupe)

export const getSearchStoreDupeData = createSelector(getSearchStoreDupe, store => store.data)
export const getSearchStoreDupeStatus = createSelector(getSearchStoreDupe, store => store.status)

const getSearchStoreSearch = createSelector(getSearchStore, store => store.search)

export const getSearchStoreSearchData = createSelector(getSearchStoreSearch, store => store.data)
export const getSearchStoreSearchStatus = createSelector(getSearchStoreSearch, store => store.status)
