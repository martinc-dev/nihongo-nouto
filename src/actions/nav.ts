import { NAV_ACTION_TYPES, SetCurrentContentTypeAction } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'

export const setCurrentContentType = (
  payload: ResourceTypeKey | null,
): SetCurrentContentTypeAction => ({
  type: NAV_ACTION_TYPES.SET_CURRENT_CONTENT_TYPE,
  payload,
})
