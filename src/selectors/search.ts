import { createSelector } from 'reselect'
import { RootState } from 'src/types/redux'

const getSearchStore = (state: RootState) => state.search || {}

const getSearchStoreDupe = createSelector(getSearchStore, store => store.dupe || { data: [], status: 'INITIAL' })

export const getSearchStoreDupeData = createSelector(
  getSearchStoreDupe,
  store => store.data
)
export const getSearchStoreDupeStatus = createSelector(
  getSearchStoreDupe,
  store => store.status
)

const getSearchStoreSearch = createSelector(getSearchStore, store => store.search || { data: {}, status: 'INITIAL' })

export const getSearchStoreSearchData = createSelector(
  getSearchStoreSearch,
  store => store.data
)
export const getSearchStoreSearchStatus = createSelector(
  getSearchStoreSearch,
  store => store.status
)

