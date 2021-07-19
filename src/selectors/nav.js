import { createSelector } from 'reselect'

import resourceTypes from 'src/constants/resourceTypes'

const DEFAULT_TYPE = 'VERB'

const getNavStore = state => state.nav || {}

export const getCurrentContentType = createSelector(
  getNavStore,
  store => store.currentContentType || resourceTypes[DEFAULT_TYPE].key
)
