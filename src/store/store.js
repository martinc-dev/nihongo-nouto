import { createStore } from 'redux'
import { createBrowserHistory } from 'history'

import createRootReducer from 'src/reducers'
import getEnhancerConfig from 'src/store/enhancers'

export const history = createBrowserHistory()
const enhancerConfig = getEnhancerConfig(history)
const store = createStore(createRootReducer(history), enhancerConfig.enhancers)

enhancerConfig.afterMount()

export default store
