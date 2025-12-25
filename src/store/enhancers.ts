import { applyMiddleware, compose, Middleware } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'

import sagas from 'src/store/sagas'

interface WindowWithDevTools extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

const composeEnhancers: typeof compose =
  (window as unknown as WindowWithDevTools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const saga: SagaMiddleware = createSagaMiddleware()

const getEnhancerConfig = (routerMiddleware: Middleware) => ({
  enhancers: composeEnhancers(applyMiddleware(routerMiddleware, saga)),
  afterMount: () => saga.run(sagas),
})

export default getEnhancerConfig
