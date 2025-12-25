import { takeLatest, put, call, select } from 'redux-saga/effects'
import { push } from 'redux-first-history'
import { SagaIterator } from 'redux-saga'

import { logError } from 'src/utils/log'
import { sendGet, sendPost, sendPatch, sendDelete } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import {
  WORD_DETAIL_ACTION_TYPES,
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
import { ResourceTypeKey } from 'src/types'
import verbConjugation from 'src/utils/conjugation'
import { WordDetail, VerbWord, ApiError, WordListItem } from 'src/types/words'

interface FetchWordDetailPayload {
  id: string | number
}

interface SaveWordDetailPayload {
  id?: string | number
  [key: string]: string | number | boolean | undefined
}

interface DeleteWordDetailPayload {
  id: string | number
}

export function* fetchWordDetail({
  payload,
}: {
  payload: FetchWordDetailPayload
}): SagaIterator {
  try {
    const { id } = payload

    if (!id) throw new Error('No id defined when fetching detail')

    const typeKey: ResourceTypeKey | null = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const response = yield call(sendGet<WordDetail>, {
      url: endpoints.getWordUrl({ typeKey, id: String(id) }),
    })

    if (response.error) {
      throw response
    }

    let result = response as WordDetail
    const wordDetail = result
    if (
      typeKey === resourceTypes.VERB.key &&
      wordDetail &&
      'word' in wordDetail &&
      'group' in wordDetail &&
      wordDetail.word &&
      wordDetail.group
    ) {
      const verbWord = wordDetail as VerbWord
      if (verbWord.group) {
        result = {
          ...verbWord,
          conjugation: verbConjugation(verbWord.word, verbWord.group),
        } as WordDetail
      }
    }

    yield put(fetchWordDetailActionOK(result as WordDetail))
  } catch (error) {
    const apiError: ApiError = error as ApiError
    yield put(fetchWordDetailActionError(apiError))
    logError(error)
  }
}

export function* saveWordDetail({
  payload,
}: {
  payload: SaveWordDetailPayload
}): SagaIterator {
  try {
    const { id, ...restPayload } = payload
    const typeKey: ResourceTypeKey | null = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    let result: WordDetail | null = null

    if (id) {
      const response = yield call(sendPatch<WordDetail>, {
        url: endpoints.getWordUrl({ typeKey, id: String(id) }),
        data: restPayload as Record<string, string | number | boolean>,
      })
      if (response.error) {
        throw response
      }
      result = response as WordDetail
    } else {
      const response = yield call(sendPost<WordDetail>, {
        url: endpoints.getWordsUrl({ typeKey }),
        data: restPayload as Record<string, string | number | boolean>,
      })
      if (response.error) {
        throw response
      }
      result = response as WordDetail
    }

    const wordDetail = result as WordDetail
    if (
      typeKey === resourceTypes.VERB.key &&
      wordDetail &&
      'word' in wordDetail &&
      'group' in wordDetail &&
      wordDetail.word &&
      wordDetail.group
    ) {
      const verbWord = wordDetail as VerbWord
      if (verbWord.group) {
        result = {
          ...verbWord,
          conjugation: verbConjugation(verbWord.word, verbWord.group),
        } as WordDetail
      }
    }

    yield put(saveWordDetailActionOK())

    if (id && result) {
      const wordListItem: WordListItem = {
        id: result.id,
        word: result.word,
        hiragana: 'hiragana' in result ? result.hiragana : undefined,
        romaji: 'romaji' in result ? result.romaji : undefined,
        group: 'group' in result ? result.group ?? undefined : undefined,
        isIConjugation: 'isIConjugation' in result ? result.isIConjugation : undefined,
        sense: result.sense,
        isTransitive: 'isTransitive' in result ? result.isTransitive : undefined,
        isIntransitive: 'isIntransitive' in result ? result.isIntransitive : undefined,
      }
      yield put(updateWordInWordListAction(wordListItem))
      yield put(fetchWordDetailActionOK(result))
    } else if (result && 'id' in result) {
      const wordListItem: WordListItem = {
        id: result.id,
        word: result.word,
        hiragana: 'hiragana' in result ? result.hiragana : undefined,
        romaji: 'romaji' in result ? result.romaji : undefined,
        group: 'group' in result ? result.group ?? undefined : undefined,
        isIConjugation: 'isIConjugation' in result ? result.isIConjugation : undefined,
        sense: result.sense,
        isTransitive: 'isTransitive' in result ? result.isTransitive : undefined,
        isIntransitive: 'isIntransitive' in result ? result.isIntransitive : undefined,
      }
      yield put(addWordToWordListAction(wordListItem))
      yield put(push(`/${resourceTypes[typeKey].pathName}/${result.id}`))
    }
  } catch (error) {
    const apiError: ApiError = error as ApiError
    yield put(saveWordDetailActionError(apiError))
    logError(error)
  }
}

export function* deleteWordDetail({
  payload,
}: {
  payload: DeleteWordDetailPayload
}): SagaIterator {
  try {
    const { id } = payload

    if (!id) throw new Error('No id defined when deleting word')

    const typeKey: ResourceTypeKey | null = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const result = yield call(sendDelete, {
      url: endpoints.getWordUrl({ typeKey, id: String(id) }),
    })

    if (result.error) {
      throw result
    }

    yield put(removeWordInWordListAction({ id }))
    yield put(deleteWordDetailActionOK())
    yield put(push(`/${resourceTypes[typeKey].pathName}`))
  } catch (error) {
    const apiError: ApiError = error as ApiError
    yield put(deleteWordDetailActionError(apiError))
    logError(error)
  }
}

export function* watchFetchWordDetail(): SagaIterator {
  // @ts-expect-error - redux-saga types conflict with action type constants
  yield takeLatest(WORD_DETAIL_ACTION_TYPES.FETCH, fetchWordDetail)
}

export function* watchSaveWordDetailAction(): SagaIterator {
  // @ts-expect-error - redux-saga types conflict with action type constants
  yield takeLatest(WORD_DETAIL_ACTION_TYPES.SAVE, saveWordDetail)
}

export function* watchDeleteWordDetailAction(): SagaIterator {
  // @ts-expect-error - redux-saga types conflict with action type constants
  yield takeLatest(WORD_DETAIL_ACTION_TYPES.DELETE, deleteWordDetail)
}
