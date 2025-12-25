import { all, fork } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import sagaList from 'src/sagas'

function* sagas(): SagaIterator {
  yield all([...sagaList].map(fork))
}

export default sagas

