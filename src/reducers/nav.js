import { combineReducers } from 'redux'

import { setCurrentContentType } from 'src/actions/nav'

const currentContentType = (state = null, action) => {
  switch (action.type) {
    case setCurrentContentType().type:
      return action.payload

    default:
      return state
  }
}

export default combineReducers({ currentContentType })
