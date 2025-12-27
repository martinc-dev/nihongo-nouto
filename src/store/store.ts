import { createStore, applyMiddleware, compose, Store, AnyAction } from 'redux'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory, History } from 'history'

import createRootReducer from 'src/reducers'
import { RootState } from 'src/types/redux'

const history: History = createBrowserHistory()
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext(
  {
    history,
    reduxTravelling: true,
  },
)

const rootReducer = createRootReducer(routerReducer)

interface WindowWithDevTools extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

const composeEnhancers: typeof compose =
  // eslint-disable-next-line no-underscore-dangle
  (window as unknown as WindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose

const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware)),
)

// Create redux history after store is created - it needs the store object, not the reducer
createReduxHistory(store)

export { history }
export default store
