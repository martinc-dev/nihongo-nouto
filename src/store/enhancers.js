import { applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import sagas from 'src/store/sagas'

//eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const saga = createSagaMiddleware()

const getEnhancerConfig = history => ({
  enhancers: composeEnhancers(applyMiddleware(routerMiddleware(history), saga)),
  afterMount: () => saga.run(sagas),
})

export default getEnhancerConfig
