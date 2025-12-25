import { createSelector } from 'reselect'
import { RootState } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'

const getNavStore = (state: RootState) => state.nav || { currentContentType: null }

export const getCurrentContentType = createSelector(
  getNavStore,
  (store): ResourceTypeKey | null => store.currentContentType
)

