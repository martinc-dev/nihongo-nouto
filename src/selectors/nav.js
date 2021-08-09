import { createSelector } from 'reselect'

const getNavStore = state => state.nav || {}

export const getCurrentContentType = createSelector(
  getNavStore,
  store => store.currentContentType
)
