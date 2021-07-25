import { takeLatest, put, call, select } from 'redux-saga/effects'

import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import { fetchWordDupeAction, fetchWordDupeActionOK, fetchWordDupeActionError } from 'src/actions/search'
import { getCurrentContentType } from 'src/selectors/nav'

export function* fetchWordDupe({ payload }) {
  try {
    const { word } = payload

    if (!word) throw new Error('No word defined within search')

    const typeKey = yield select(getCurrentContentType)
    const response = yield call(sendGet, {
      url: endpoints.getWordSearchUrl({ typeKey }),
      data: { word }
    })

    if (response.error) {
      throw response
    }

    yield put(fetchWordDupeActionOK(response))
  } catch (error) {
    yield put(fetchWordDupeActionError(error))
    logError(error)
  }
}

export function* watchFetchWordDupe() {
  yield takeLatest(fetchWordDupeAction().type, fetchWordDupe)
}
