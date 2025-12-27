import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { PAGINATION } from 'src/constants/pagination'
import { TIME } from 'src/constants/times'
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
  page: number = PAGINATION.DEFAULT_PAGE,
  limit: number = PAGINATION.DEFAULT_WORD_LIST_LIMIT,
  orderBy: string = 'id',
  isAsc: boolean = true,
  filters: string[] = [],
  // eslint-disable-next-line max-params
): Promise<PaginatedResponse<WordListItem>> => {
  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  const filterParams =
    filters.length > 0
      ? `&filters=${filters.map(encodeURIComponent).join('&filters=')}`
      : ''
  const url = `${endpoints.getWordsUrl({ typeKey })}?page=${page}&limit=${limit}&orderBy=${orderBy}&asc=${isAsc}${filterParams}`
  const response = await sendGet<PaginatedResponse<WordListItem>>({
    url,
  })

  if (response.error) {
    throw response.error
  }

  const paginatedResponse = (response as unknown as PaginatedResponse<WordListItem>) || {
    data: [],
    pagination: {
      total: 0,
      page: PAGINATION.DEFAULT_PAGE,
      limit: PAGINATION.DEFAULT_WORD_LIST_LIMIT,
      totalPages: 0,
    },
  }

  if (!paginatedResponse || typeof paginatedResponse !== 'object') {
    throw new Error('Invalid response from API')
  }

  if (!Array.isArray(paginatedResponse.data)) {
    throw new Error('Invalid data format in API response')
  }

  if (!paginatedResponse.pagination || typeof paginatedResponse.pagination !== 'object') {
    throw new Error('Invalid pagination format in API response')
  }

  // Transform isIconjugation to isIConjugation, camelCase issue ¯\_(ツ)_/¯
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
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_WORD_LIST_LIMIT,
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
