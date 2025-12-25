import { takeLatest, put, call, select } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import { logError } from 'src/utils/log'
import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import {
  WORD_LIST_ACTION_TYPES,
  fetchWordListActionOK,
  fetchWordListActionError,
} from 'src/actions/wordList'
import { getCurrentContentType } from 'src/selectors/nav'
import { ResourceTypeKey } from 'src/types'
import { WordListItem, ApiError } from 'src/types/words'

export function* fetchWordList(): SagaIterator {
  try {
    const typeKey: ResourceTypeKey | null = yield select(getCurrentContentType)

    if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false))
      throw new Error('Target resource is not searchable')

    const response = yield call(sendGet<WordListItem[]>, {
      url: endpoints.getWordsUrl({ typeKey }),
    })

    if (response.error) {
      throw response
    }

    yield put(
      fetchWordListActionOK(
        response.map((t: WordListItem & { isIconjugation?: boolean }) => {
          if (t.isIconjugation !== undefined) {
            const isIConjugation = t.isIconjugation

            delete t.isIconjugation

            return {
              ...t,
              isIConjugation,
            }
          }

          return t
        }) as WordListItem[],
      ),
    )
  } catch (error) {
    const apiError: ApiError = error as ApiError

    yield put(fetchWordListActionError(apiError))
    logError(error)
  }
}

export function* watchFetchWordList(): SagaIterator {
  yield takeLatest(WORD_LIST_ACTION_TYPES.FETCH, fetchWordList)
}
