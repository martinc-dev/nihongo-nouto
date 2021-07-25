import { takeLatest, put, call, select } from 'redux-saga/effects'

import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import { fetchWordDetailAction, fetchWordDetailActionOK, fetchWordDetailActionError } from 'src/actions/wordDetail'
import { getCurrentContentType } from 'src/selectors/nav'

export function* fetchWordDetail({ payload }) {
  try {
    const { id } = payload

    if (!id) throw new Error('No id defined when fetching detail')

    const typeKey = yield select(getCurrentContentType)
    const response = yield call(sendGet, {
      url: endpoints.getWordUrl({ typeKey, id })
    })

    if (response.error) {
      throw response
    }

    yield put(fetchWordDetailActionOK(response))
  } catch (error) {
    yield put(fetchWordDetailActionError(error))
    logError(error)
  }
}

export function* watchFetchWordDetail() {
  yield takeLatest(fetchWordDetailAction().type, fetchWordDetail)
}
