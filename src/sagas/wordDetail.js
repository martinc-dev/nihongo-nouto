import { takeLatest, put, call, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { logError } from 'src/utils/log'
import { sendGet, sendPost, sendPatch, sendDelete } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import {
  fetchWordDetailAction,
  fetchWordDetailActionOK,
  fetchWordDetailActionError,
  saveWordDetailAction,
  saveWordDetailActionOK,
  saveWordDetailActionError,
  deleteWordDetailAction,
  deleteWordDetailActionOK,
  deleteWordDetailActionError,
} from 'src/actions/wordDetail'
import {
  addWordToWordListAction,
  updateWordInWordListAction,
  removeWordInWordListAction,
} from 'src/actions/wordList'
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

export function* saveWordDetail({ payload }) {
  try {
    const { id } = payload
    const typeKey = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    let result = null

    if (id) {
      delete payload.id

      result = yield call(sendPatch, {
        url: endpoints.getWordUrl({ typeKey, id }),
        data: payload,
      })
    } else {
      result = yield call(sendPost, {
        url: endpoints.getWordsUrl({ typeKey }),
        data: payload,
      })
    }

    if (result.error) {
      throw result
    }

    if (typeKey === resourceTypes.VERB.key && result.word && result.group) {
      result = { ...result, conjugation: verbConjugation(result.word, result.group) }
    }

    yield put(saveWordDetailActionOK())

    if (id) {
      yield put(updateWordInWordListAction(result))
      yield put(fetchWordDetailActionOK(result))
    } else {
      yield put(addWordToWordListAction(result))
      yield put(push(`/${resourceTypes[typeKey].pathName}/${result.id}`))
    }
  } catch (error) {
    yield put(saveWordDetailActionError(error))
    logError(error)
  }
}

export function* deleteWordDetail({ payload }) {
  try {
    const { id } = payload

    if (!id) throw new Error('No id defined when deleting word')

    const typeKey = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const result = yield call(sendDelete, {
      url: endpoints.getWordUrl({ typeKey, id }),
    })

    if (result.error) {
      throw result
    }

    yield put(removeWordInWordListAction({ id }))
    yield put(deleteWordDetailActionOK())
    yield put(push(`/${resourceTypes[typeKey].pathName}`))
  } catch (error) {
    yield put(deleteWordDetailActionError(error))
    logError(error)
  }
}

export function* watchFetchWordDetail() {
  yield takeLatest(fetchWordDetailAction().type, fetchWordDetail)
}

export function* watchSaveWordDetailAction() {
  yield takeLatest(saveWordDetailAction().type, saveWordDetail)
}

export function* watchDeleteWordDetailAction() {
  yield takeLatest(deleteWordDetailAction().type, deleteWordDetail)
}
