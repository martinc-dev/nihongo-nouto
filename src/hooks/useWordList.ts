import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'
import { WordListItem, ApiError } from 'src/types/words'

const fetchWordList = async (typeKey: ResourceTypeKey): Promise<WordListItem[]> => {
  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  const response = await sendGet<WordListItem[]>({
    url: endpoints.getWordsUrl({ typeKey }),
  })

  if (response.error) {
    throw response.error
  }

  // The response is the data directly when successful
  const data = (response as unknown as WordListItem[]) || []

  // Transform isIconjugation to isIConjugation
  return data.map((t: WordListItem & { isIconjugation?: boolean }) => {
    if (t.isIconjugation !== undefined) {
      const isIConjugation = t.isIconjugation
      const { isIconjugation: _, ...rest } = t
      return {
        ...rest,
        isIConjugation,
      }
    }
    return t
  }) as WordListItem[]
}

export const useWordList = (): UseQueryResult<WordListItem[], ApiError> => {
  const currentContentType = useSelector((state: RootState) => getCurrentContentType(state))

  return useQuery({
    queryKey: ['wordList', currentContentType],
    queryFn: () => {
      if (!currentContentType) {
        throw new Error('No content type selected')
      }
      return fetchWordList(currentContentType)
    },
    enabled: !!currentContentType && (resourceTypes[currentContentType]?.isMain ?? false),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

