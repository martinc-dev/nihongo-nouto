import { all, fork } from 'redux-saga/effects'

function* sagas() {
  yield all([].map(fork))
}

export default sagas
