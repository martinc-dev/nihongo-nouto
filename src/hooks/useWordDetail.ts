import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { sendGet, sendPost, sendPatch, sendDelete } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { TIME } from 'src/constants/numbers'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'
import verbConjugation from 'src/utils/conjugation'
import { WordDetail, VerbWord, ApiError } from 'src/types/words'

interface FetchWordDetailParams {
  typeKey: ResourceTypeKey
  id: string | number
}

interface SaveWordDetailParams {
  typeKey: ResourceTypeKey
  id?: string | number
  data: Partial<WordDetail> & { tagIds?: number[] }
}

interface DeleteWordDetailParams {
  typeKey: ResourceTypeKey
  id: string | number
}

const fetchWordDetail = async ({
  typeKey,
  id,
}: FetchWordDetailParams): Promise<WordDetail> => {
  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  if (!id) {
    throw new Error('No id defined when fetching detail')
  }

  const response = await sendGet<WordDetail>({
    url: endpoints.getWordUrl({ typeKey, id: String(id) }),
  })

  if (response.error) {
    throw response.error
  }

  // The response is the data directly when successful
  let result = response as unknown as WordDetail as WordDetail

  // Add verb conjugation if it's a verb
  if (
    typeKey === resourceTypes.VERB.key &&
    result &&
    'word' in result &&
    'group' in result &&
    result.word &&
    result.group
  ) {
    const verbWord = result as VerbWord

    if (verbWord.group) {
      result = {
        ...verbWord,
        conjugation: verbConjugation(verbWord.word, verbWord.group),
      } as WordDetail
    }
  }

  if (
    typeKey === resourceTypes.ADJ.key &&
    result &&
    'isIconjugation' in result &&
    result.isIconjugation !== undefined
  ) {
    if (result.isIconjugation !== undefined) {
      const isIConjugation = result.isIconjugation
      const { isIconjugation: _, ...rest } = result

      result = {
        ...rest,
        isIConjugation,
      } as WordDetail
    }
  }

  return result
}

const saveWordDetail = async ({
  typeKey,
  id,
  data,
}: SaveWordDetailParams): Promise<WordDetail> => {
  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  let result: WordDetail

  if (id) {
    const response = await sendPatch<WordDetail>({
      url: endpoints.getWordUrl({ typeKey, id: String(id) }),
      data: data as Record<string, string | number | boolean>,
    })

    if (response.error) {
      throw response.error
    }
    result = response as unknown as WordDetail as WordDetail
  } else {
    const response = await sendPost<WordDetail>({
      url: endpoints.getWordsUrl({ typeKey }),
      data: data as Record<string, string | number | boolean>,
    })

    if (response.error) {
      throw response.error
    }
    result = response as unknown as WordDetail as WordDetail
  }

  // Add verb conjugation if it's a verb
  if (
    typeKey === resourceTypes.VERB.key &&
    result &&
    'word' in result &&
    'group' in result &&
    result.word &&
    result.group
  ) {
    const verbWord = result as VerbWord

    if (verbWord.group) {
      result = {
        ...verbWord,
        conjugation: verbConjugation(verbWord.word, verbWord.group),
      } as WordDetail
    }
  }

  return result
}

const deleteWordDetail = async ({
  typeKey,
  id,
}: DeleteWordDetailParams): Promise<void> => {
  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  if (!id) {
    throw new Error('No id defined when deleting word')
  }

  const result = await sendDelete({
    url: endpoints.getWordUrl({ typeKey, id: String(id) }),
  })

  if (result.error) {
    throw result.error
  }
}

export const useWordDetail = (
  wordId: string | number | null | undefined,
): UseQueryResult<WordDetail | null, ApiError> => {
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )

  return useQuery({
    queryKey: ['wordDetail', currentContentType, wordId],
    queryFn: () => {
      if (!currentContentType || !wordId) {
        return null
      }

      return fetchWordDetail({ typeKey: currentContentType, id: wordId })
    },
    enabled:
      !!currentContentType &&
      !!wordId &&
      (resourceTypes[currentContentType]?.isMain ?? false),
    staleTime: TIME.FIVE_MINUTES_MS,
  })
}

export const useSaveWordDetail = (): UseMutationResult<
  WordDetail,
  ApiError,
  { id?: string | number; data: Partial<WordDetail> & { tagIds?: number[] } },
  unknown
> => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id?: string | number
      data: Partial<WordDetail> & { tagIds?: number[] }
    }) => {
      if (!currentContentType) {
        throw new Error('No content type selected')
      }

      return saveWordDetail({ typeKey: currentContentType, id, data })
    },
    onSuccess: (result, variables) => {
      if (!currentContentType) return

      // Invalidate and refetch word list
      queryClient.invalidateQueries({ queryKey: ['wordList', currentContentType] })

      // Update word detail cache
      if (variables.id) {
        queryClient.setQueryData(['wordDetail', currentContentType, variables.id], result)
      } else if (result && 'id' in result) {
        // New word created - navigate to it
        queryClient.setQueryData(['wordDetail', currentContentType, result.id], result)
        navigate(`/${resourceTypes[currentContentType].pathName}/${result.id}`)
      }
    },
  })
}

export const useDeleteWordDetail = (): UseMutationResult<
  void,
  ApiError,
  { id: string | number },
  unknown
> => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )

  return useMutation({
    mutationFn: ({ id }: { id: string | number }) => {
      if (!currentContentType) {
        throw new Error('No content type selected')
      }

      return deleteWordDetail({ typeKey: currentContentType, id })
    },
    onSuccess: (_, variables) => {
      if (!currentContentType) return

      // Remove from word detail cache
      queryClient.removeQueries({
        queryKey: ['wordDetail', currentContentType, variables.id],
      })

      // Invalidate and refetch word list
      queryClient.invalidateQueries({ queryKey: ['wordList', currentContentType] })

      // Navigate to word list route
      const listPath = `/${resourceTypes[currentContentType].pathName}`

      navigate(listPath, { replace: true })
    },
  })
}
