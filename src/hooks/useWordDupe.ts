import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { TIME } from 'src/constants/times'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'
import { WordDupeResult, ApiError } from 'src/types/words'

interface FetchWordDupeParams {
  typeKey: ResourceTypeKey
  word: string
  sense?: string
}

const fetchWordDupe = async ({
  typeKey,
  word,
  sense,
}: FetchWordDupeParams): Promise<WordDupeResult> => {
  if (!word) {
    throw new Error('No word defined within dupe search')
  }

  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  const response = await sendGet<WordDupeResult>({
    url: endpoints.getWordDupeSearchUrl({ typeKey }),
    data: { word, ...(sense ? { sense } : {}) },
  })

  if (response.error) {
    throw response.error
  }

  return response as unknown as WordDupeResult
}

export const useWordDupe = (
  word: string | null | undefined,
  sense?: string | null,
  options?: Omit<UseQueryOptions<WordDupeResult, ApiError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<WordDupeResult, ApiError> => {
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )

  return useQuery({
    queryKey: ['wordDupe', currentContentType, word, sense],
    queryFn: () => {
      if (!currentContentType || !word) {
        throw new Error('Missing content type or word')
      }

      return fetchWordDupe({
        typeKey: currentContentType,
        word,
        sense: sense ?? undefined,
      })
    },
    enabled:
      !!currentContentType &&
      !!word &&
      (resourceTypes[currentContentType]?.isMain ?? false),
    staleTime: TIME.FIVE_MINUTES_MS,
    ...options,
  })
}
