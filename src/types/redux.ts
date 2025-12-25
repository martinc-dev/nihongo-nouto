import { Action } from 'redux'
import { RouterState } from 'redux-first-history'
import { ResourceTypeKey } from './index'

// Action types
export const NAV_ACTION_TYPES = {
  SET_CURRENT_CONTENT_TYPE: 'NAV:CONTENT_TYPE:SET',
} as const

export interface SetCurrentContentTypeAction extends Action<string> {
  type: typeof NAV_ACTION_TYPES.SET_CURRENT_CONTENT_TYPE
  payload: ResourceTypeKey | null
  [key: string]: string | ResourceTypeKey | null | undefined
}

export type NavAction = SetCurrentContentTypeAction

// State types
export interface NavState {
  currentContentType: ResourceTypeKey | null
}

// Root state
export interface RootState {
  nav: NavState
  router: RouterState
}
