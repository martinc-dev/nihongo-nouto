import { takeLatest, put, call, select } from 'redux-saga/effects'

import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import {
  fetchWordDetailAction,
  fetchWordDetailActionOK,
  fetchWordDetailActionError,
} from 'src/actions/wordDetail'
import { getCurrentContentType } from 'src/selectors/nav'
import verbConjugation from 'src/utils/conjugation'

export function* fetchWordDetail({ payload }) {
  try {
    const { id } = payload

    if (!id) throw new Error('No id defined when fetching detail')

    const typeKey = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    let result = yield call(sendGet, {
      url: endpoints.getWordUrl({ typeKey, id }),
    })

    if (result.error) {
      throw result
    }

    if (typeKey === resourceTypes.VERB.key && result.word && result.group) {
      result = { ...result, conjugation: verbConjugation(result.word, result.group) }
    }

    yield put(fetchWordDetailActionOK(result))
  } catch (error) {
    yield put(fetchWordDetailActionError(error))
    logError(error)
  }
}

export function* watchFetchWordDetail() {
  yield takeLatest(fetchWordDetailAction().type, fetchWordDetail)
}
