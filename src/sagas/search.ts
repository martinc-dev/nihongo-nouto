import { takeLatest, put, call, select } from 'redux-saga/effects'
import camelCase from 'camelcase-keys'
import { SagaIterator } from 'redux-saga'

import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import { parseVerbProp, parseAdjProp } from 'src/utils/jisho'
import {
  SEARCH_ACTION_TYPES,
  fetchWordDupeAction,
  fetchWordDupeActionOK,
  fetchWordDupeActionError,
  fetchWordSearchAction,
  fetchWordSearchActionOK,
  fetchWordSearchActionError,
} from 'src/actions/search'
import { getCurrentContentType } from 'src/selectors/nav'
import { ResourceTypeKey } from 'src/types'
import jisho from 'src/singletons/jisho'
import {
  WordDupeResult,
  JishoRawResponse,
  JishoWordSearchResult,
  JishoDataItem,
  JishoSense,
  ApiError,
} from 'src/types/words'

interface FetchWordDupePayload {
  word: string
}

interface AggregateJishoParams {
  raw: JishoRawResponse
  typeKey: ResourceTypeKey
  word: string
}

export function* fetchWordDupe({
  payload,
}: {
  payload: FetchWordDupePayload
}): SagaIterator {
  try {
    const { word } = payload

    if (!word) throw new Error('No word defined within dupe search')

    const typeKey: ResourceTypeKey | null = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const response = yield call(sendGet<WordDupeResult>, {
      url: endpoints.getWordDupeSearchUrl({ typeKey }),
      data: { word },
    })

    if (response.error) {
      throw response
    }

    yield put(fetchWordDupeActionOK(response as WordDupeResult))
  } catch (error) {
    const apiError: ApiError = error as ApiError

    yield put(fetchWordDupeActionError(apiError))
    logError(error)
  }
}

export function aggregateJisho({
  raw,
  typeKey,
  word,
}: AggregateJishoParams): JishoWordSearchResult {
  try {
    const result: JishoWordSearchResult = {
      wordOptions: [],
      definitionOptions: [],
    }

    if ((raw?.meta?.status ?? null) !== 200) return result

    const casedRaw = camelCase(raw, { deep: true }) as {
      data?: Array<{
        japanese?: Array<{ word?: string; reading?: string }>
        senses?: Array<{
          englishDefinitions?: string[]
          partsOfSpeech?: string[]
        }>
      }>
    }
    const senses: JishoSense[] =
      (casedRaw?.data?.[0]?.senses as JishoSense[]) ?? []

    result.wordOptions = (casedRaw?.data?.[0]?.japanese ?? []) as Array<{
      word?: string
      reading?: string
    }>

    switch (typeKey) {
      case resourceTypes.VERB.key: {
        result.definitionOptions = senses.map((t: JishoSense) => ({
          definitions: t.englishDefinitions || [],
          ...parseVerbProp({
            partsOfSpeechArray: t.partsOfSpeech || [],
            word,
          }),
        }))
        break
      }

      case resourceTypes.ADJ.key: {
        result.definitionOptions = senses.map((t: JishoSense) => ({
          definitions: t.englishDefinitions || [],
          ...parseAdjProp({ partsOfSpeechArray: t.partsOfSpeech || [] }),
        }))
        break
      }

      case resourceTypes.NOUN.key: {
        // TODO: Add tag management if/when available
        result.definitionOptions = senses.map((t: JishoSense) => ({
          definitions: t.englishDefinitions || [],
        }))
        break
      }

      default: {
        result.definitionOptions = senses.map((t: JishoSense) => ({
          definitions: t.englishDefinitions || [],
        }))
      }
    }

    return result
  } catch (error) {
    logError(error)
    throw error
  }
}

export function* fetchWordSearch({
  payload: word,
}: {
  payload: string
}): SagaIterator {
  try {
    if (!word) throw new Error('No word defined within search')

    const typeKey: ResourceTypeKey | null = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const raw = (yield call(() => jisho.searchForPhrase(word))) as JishoRawResponse
    const result = aggregateJisho({
      raw,
      typeKey,
      word,
    })

    if (!result) throw new Error('Jisho response cannot be parsed')
    yield put(fetchWordSearchActionOK(result))
  } catch (error) {
    const apiError: ApiError = error as ApiError

    yield put(fetchWordSearchActionError(apiError))
    logError(error)
  }
}

export function* watchFetchWordDupe(): SagaIterator {
  // @ts-expect-error - redux-saga types conflict with action type constants
  yield takeLatest(SEARCH_ACTION_TYPES.FETCH_DUPE, fetchWordDupe)
}

export function* watchFetchWordSearch(): SagaIterator {
  // @ts-expect-error - redux-saga types conflict with action type constants
  yield takeLatest(SEARCH_ACTION_TYPES.FETCH_SEARCH, fetchWordSearch)
}
