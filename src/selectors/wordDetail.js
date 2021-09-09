import { createSelector } from 'reselect'

const getWordDetailStore = state => state.wordDetail || {}
const getFetchWordDetailStore = createSelector(
  getWordDetailStore,
  store => store.fetchWordDetail
)
const getSaveWordDetailStore = createSelector(
  getWordDetailStore,
  store => store.saveWordDetail
)
const getDeleteWordDetailStore = createSelector(
  getWordDetailStore,
  store => store.deleteWordDetail
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
