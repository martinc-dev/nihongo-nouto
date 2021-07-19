import { takeLatest, put, call, select } from 'redux-saga/effects'

import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import { fetchWordListAction, fetchWordListActionOK, fetchWordListActionError } from 'src/actions/wordList'
import { getCurrentContentType } from 'src/selectors/nav'

export function* fetchWordList() {
  try {
    const typeKey = yield select(getCurrentContentType)
    const response = yield call(sendGet, {
      url: endpoints.getWordsUrl({ typeKey })
    })

    if (response.error) {
      throw response
    }

    yield put(fetchWordListActionOK(response))
  } catch (error) {
    yield put(fetchWordListActionError(error))
    logError(error)
  }
}

export function* watchFetchWordList() {
  yield takeLatest(fetchWordListAction().type, fetchWordList)
}
