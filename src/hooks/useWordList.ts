import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { DEFAULT_WORD_LIST_LIMIT } from 'src/constants/pagination'
import { TIME, NUMBERS, ARRAY } from 'src/constants/numbers'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'
import { WordListItem, ApiError, PaginatedResponse } from 'src/types/words'

interface UseWordListParams {
  enabled?: boolean
  page?: number
  limit?: number
  orderBy?: string
  isAsc?: boolean
  filters?: string[]
}

const fetchWordList = async (
  typeKey: ResourceTypeKey,
  page: number = NUMBERS.DEFAULT_PAGE,
  limit: number = DEFAULT_WORD_LIST_LIMIT,
  orderBy: string = 'id',
  isAsc: boolean = true,
  filters: string[] = [],
  // eslint-disable-next-line max-params
): Promise<PaginatedResponse<WordListItem>> => {
  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  const filterParams =
    filters.length > ARRAY.EMPTY_LENGTH
      ? `&filters=${filters.map(encodeURIComponent).join('&filters=')}`
      : ''
  const url = `${endpoints.getWordsUrl({ typeKey })}?page=${page}&limit=${limit}&orderBy=${orderBy}&asc=${isAsc}${filterParams}`
  const response = await sendGet<PaginatedResponse<WordListItem>>({
    url,
  })

  if (response.error) {
    throw response.error
  }

  // When successful, sendGet returns the camelCased body directly
  // The response IS the PaginatedResponse object (after camelCase transformation)
  // Similar to useWordDetail where response is cast directly to WordDetail
  // But ApiResponse<T> means response has properties of T, so response.data and response.pagination exist
  const paginatedResponse = (response as unknown as PaginatedResponse<WordListItem>) || {
    data: [],
    pagination: {
      total: ARRAY.EMPTY_LENGTH,
      page: NUMBERS.DEFAULT_PAGE,
      limit: DEFAULT_WORD_LIST_LIMIT,
      totalPages: ARRAY.EMPTY_LENGTH,
    },
  }

  // Validate response structure
  if (!paginatedResponse || typeof paginatedResponse !== 'object') {
    throw new Error('Invalid response from API')
  }

  if (!Array.isArray(paginatedResponse.data)) {
    throw new Error('Invalid data format in API response')
  }

  if (!paginatedResponse.pagination || typeof paginatedResponse.pagination !== 'object') {
    throw new Error('Invalid pagination format in API response')
  }

  // Transform isIconjugation to isIConjugation
  const transformedData = paginatedResponse.data.map(
    (t: WordListItem & { isIconjugation?: boolean }) => {
      if (t.isIconjugation !== undefined) {
        const isIConjugation = t.isIconjugation
        const { isIconjugation: _, ...rest } = t

        return {
          ...rest,
          isIConjugation,
        }
      }

      return t
    },
  ) as WordListItem[]

  return {
    data: transformedData,
    pagination: paginatedResponse.pagination,
  }
}

export const useWordList = (
  params: UseWordListParams = {},
): UseQueryResult<PaginatedResponse<WordListItem>, ApiError> => {
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )
  const {
    page = NUMBERS.DEFAULT_PAGE,
    limit = DEFAULT_WORD_LIST_LIMIT,
    orderBy = 'id',
    isAsc = true,
    filters = [],
    enabled = true,
  } = params

  return useQuery({
    queryKey: ['wordList', currentContentType, page, limit, orderBy, isAsc, filters],
    queryFn: () => {
      if (!currentContentType) {
        throw new Error('No content type selected')
      }

      return fetchWordList(currentContentType, page, limit, orderBy, isAsc, filters)
    },
    enabled:
      enabled &&
      !!currentContentType &&
      (resourceTypes[currentContentType]?.isMain ?? false),
    staleTime: TIME.FIVE_MINUTES_MS,
  })
}
