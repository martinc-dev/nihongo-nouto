import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import camelCase from 'camelcase-keys'

import { sendGet } from 'src/utils/requests'
import endpoints from 'src/constants/endpoints'
import resourceTypes from 'src/constants/resourceTypes'
import { HTTP_STATUS } from 'src/constants/httpStatus'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { ResourceTypeKey } from 'src/types'
import { parseVerbProp, parseAdjProp } from 'src/utils/jisho'
import {
  JishoRawResponse,
  JishoWordSearchResult,
  JishoSense,
  JishoSlugOption,
  ApiError,
} from 'src/types/words'

interface FetchWordSearchParams {
  typeKey: ResourceTypeKey
  word: string
}

const aggregateJisho = ({
  raw,
  typeKey,
  word,
}: {
  raw: JishoRawResponse
  typeKey: ResourceTypeKey
  word: string
}): JishoWordSearchResult => {
  const result: JishoWordSearchResult = {
    wordOptions: [],
    definitionOptions: [],
    slugOptions: [],
  }

  if ((raw?.meta?.status ?? null) !== HTTP_STATUS.OK) return result

  const casedRaw = camelCase(raw, { deep: true }) as {
    data?: Array<{
      slug?: string
      japanese?: Array<{ word?: string; reading?: string }>
      senses?: Array<{
        englishDefinitions?: string[]
        partsOfSpeech?: string[]
      }>
    }>
  }

  const slugOptions: JishoSlugOption[] = []

  if (casedRaw?.data) {
    for (const item of casedRaw.data) {
      const japanese = (item.japanese ?? []) as Array<{
        word?: string
        reading?: string
      }>
      const senses = (item.senses ?? []) as JishoSense[]

      if (item.slug && japanese.length > 0 && senses.length > 0) {
        const processedSenses = senses.map((sense: JishoSense) => {
          const baseSense = {
            definitions: sense.englishDefinitions || [],
            partsOfSpeech: sense.partsOfSpeech || [],
          }

          switch (typeKey) {
            case resourceTypes.VERB.key: {
              return {
                ...baseSense,
                ...parseVerbProp({
                  partsOfSpeechArray: sense.partsOfSpeech || [],
                  word: japanese[0]?.word || word,
                }),
              }
            }

            case resourceTypes.ADJ.key: {
              return {
                ...baseSense,
                ...parseAdjProp({ partsOfSpeechArray: sense.partsOfSpeech || [] }),
              }
            }

            default: {
              return baseSense
            }
          }
        })

        slugOptions.push({
          slug: item.slug,
          japanese,
          senses: processedSenses,
        })
      }
    }
  }

  result.slugOptions = slugOptions

  const firstItem = casedRaw?.data?.[0]
  const senses: JishoSense[] = (firstItem?.senses as JishoSense[]) ?? []

  result.wordOptions = (firstItem?.japanese ?? []) as Array<{
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
}

const fetchWordSearch = async ({
  typeKey,
  word,
}: FetchWordSearchParams): Promise<JishoWordSearchResult> => {
  if (!word) {
    throw new Error('No word defined within search')
  }

  if (!typeKey || !(resourceTypes[typeKey]?.isMain ?? false)) {
    throw new Error('Target resource is not searchable')
  }

  const response = await sendGet<JishoRawResponse>({
    url: endpoints.getJishoSearchUrl(word),
  })

  if (response.error) {
    throw response.error
  }

  const raw = response as unknown as JishoRawResponse
  const result = aggregateJisho({
    raw,
    typeKey,
    word,
  })

  if (!result) {
    throw new Error('Jisho response cannot be parsed')
  }

  return result
}

export const useWordSearch = (): UseMutationResult<
  JishoWordSearchResult,
  ApiError,
  string,
  unknown
> => {
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )

  return useMutation({
    mutationFn: (word: string) => {
      if (!currentContentType) {
        throw new Error('No content type selected')
      }

      return fetchWordSearch({ typeKey: currentContentType, word })
    },
  })
}
