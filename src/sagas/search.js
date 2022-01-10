import { takeLatest, put, call, select } from 'redux-saga/effects'
import camelCase from 'camelcase-keys'

import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import { parseVerbProp, parseAdjProp } from 'src/utils/jisho'
import {
  fetchWordDupeAction,
  fetchWordDupeActionOK,
  fetchWordDupeActionError,
  fetchWordSearchAction,
  fetchWordSearchActionOK,
  fetchWordSearchActionError,
} from 'src/actions/search'
import { getCurrentContentType } from 'src/selectors/nav'
import jisho from 'src/singletons/jisho'

export function* fetchWordDupe({ payload }) {
  try {
    const { word } = payload

    if (!word) throw new Error('No word defined within dupe search')

    const typeKey = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const response = yield call(sendGet, {
      url: endpoints.getWordDupeSearchUrl({ typeKey }),
      data: { word },
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

export function* aggregateJisho({ raw, typeKey, word }) {
  try {
    const result = {
      wordOptions: [],
      definitionOptions: [],
    }

    if ((raw?.meta?.status ?? null) !== 200) yield result

    const casedRaw = camelCase(raw, { deep: true })
    const senses = casedRaw?.data?.[0]?.senses ?? []

    result.wordOptions = casedRaw?.data?.[0]?.japanese ?? []

    switch (typeKey) {
      case resourceTypes.VERB.key: {
        result.definitionOptions = senses.map(t => ({
          definitions: t.englishDefinitions,
          ...parseVerbProp({ partsOfSpeechArray: t.partsOfSpeech, word }),
        }))
        break
      }

      case resourceTypes.ADJ.key: {
        result.definitionOptions = senses.map(t => ({
          definitions: t.englishDefinitions,
          ...parseAdjProp({ partsOfSpeechArray: t.partsOfSpeech }),
        }))
        break
      }

      case resourceTypes.NOUN.key: {
        // TODO: Add tag management if/when available
        result.definitionOptions = senses.map(t => ({
          definitions: t.englishDefinitions,
        }))
        break
      }

      default: {
        result.definitionOptions = senses.map(t => ({
          definitions: t.englishDefinitions,
        }))
      }
    }

    return result
  } catch (error) {
    logError(error)
    throw error
  }
}

export function* fetchWordSearch({ payload: word }) {
  try {
    if (!word) throw new Error('No word defined within search')

    const typeKey = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const raw = yield jisho.searchForPhrase(word)
    const result = yield call(aggregateJisho, { raw, typeKey, word })

    if (!result) throw new Error('Jisho response cannot be parsed')
    yield put(fetchWordSearchActionOK(result))
  } catch (error) {
    yield put(fetchWordSearchActionError(error))
    logError(error)
  }
}

export function* watchFetchWordDupe() {
  yield takeLatest(fetchWordDupeAction().type, fetchWordDupe)
}

export function* watchFetchWordSearch() {
  yield takeLatest(fetchWordSearchAction().type, fetchWordSearch)
}
