import { createSelector } from 'reselect'
import { RootState } from 'src/types/redux'

const getWordDetailStore = (state: RootState) => state.wordDetail || {}
const getFetchWordDetailStore = createSelector(
  getWordDetailStore,
  store => store.fetchWordDetail || { data: null, status: 'INITIAL' }
)
const getSaveWordDetailStore = createSelector(
  getWordDetailStore,
  store => store.saveWordDetail || { status: 'INITIAL' }
)
const getDeleteWordDetailStore = createSelector(
  getWordDetailStore,
  store => store.deleteWordDetail || { status: 'INITIAL' }
)

export const getFetchWordDetailData = createSelector(
  getFetchWordDetailStore,
  store => store.data
)
export const getFetchWordDetailStatus = createSelector(
  getFetchWordDetailStore,
  store => store.status
)

export const getSaveWordDetailStatus = createSelector(
  getSaveWordDetailStore,
  store => store.status
)

export const getDeleteWordDetailStatus = createSelector(
  getDeleteWordDetailStore,
  store => store.status
)

