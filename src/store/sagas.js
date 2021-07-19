import { all, fork } from 'redux-saga/effects'
import sagaList from 'src/sagas'

function* sagas() {
  yield all([...sagaList].map(fork))
}

export default sagas
