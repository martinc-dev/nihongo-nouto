import { useState, useCallback } from 'react'

import { useWordSearch } from 'src/hooks/useWordSearch'
import { VerbGroup, JishoWordOption, JishoSlugOption, ApiError } from 'src/types/words'
import { getConjugationFormsFromSense } from 'src/utils/conjugation'

export interface VerbFromJishoData {
  word: string
  hiragana: string
  group: VerbGroup | null
  sense: string
  stem: string
  teForm: string
  aDan: string
  eDan: string
  oDan: string
  isTransitive: boolean
  isIntransitive: boolean
}

interface UseVerbFromJishoResult {
  searchWord: (word: string) => void
  selectSlug: (slugOption: JishoSlugOption) => void
  selectJapaneseOption: (japaneseOption: JishoWordOption) => void
  selectSense: (senseIndex: number) => void
  prepopulatedData: VerbFromJishoData | null
  isLoading: boolean
  error: ApiError | null
  slugOptions: JishoSlugOption[]
  selectedSlug: JishoSlugOption | null
  selectedJapaneseOption: JishoWordOption | null
  availableSenses: Array<{
    definitions: string[]
    partsOfSpeech: string[]
    verbType?: string | null
    verbClassification?: string | null
    verbIsTransitive?: boolean
    verbIsInTransitive?: boolean
  }>
}

export const useVerbFromJisho = (): UseVerbFromJishoResult => {
  const [prepopulatedData, setPrepopulatedData] = useState<VerbFromJishoData | null>(null)
  const [slugOptions, setSlugOptions] = useState<JishoSlugOption[]>([])
  const [selectedSlug, setSelectedSlug] = useState<JishoSlugOption | null>(null)
  const [selectedJapaneseOption, setSelectedJapaneseOption] =
    useState<JishoWordOption | null>(null)

  const wordSearchMutation = useWordSearch()

  const searchWord = useCallback(
    (word: string) => {
      if (!word.trim()) {
        setSlugOptions([])
        setSelectedSlug(null)
        setSelectedJapaneseOption(null)
        setPrepopulatedData(null)

        return
      }

      wordSearchMutation.mutate(word, {
        onSuccess: data => {
          setSlugOptions(data.slugOptions || [])
          setSelectedSlug(null)
          setSelectedJapaneseOption(null)
          setPrepopulatedData(null)
        },
        onError: () => {
          setSlugOptions([])
          setSelectedSlug(null)
          setSelectedJapaneseOption(null)
          setPrepopulatedData(null)
        },
      })
    },
    [wordSearchMutation],
  )

  const selectSlug = useCallback((slugOption: JishoSlugOption) => {
    setSelectedSlug(slugOption)
    setSelectedJapaneseOption(null)
    setPrepopulatedData(null)
  }, [])

  const selectJapaneseOption = useCallback((japaneseOption: JishoWordOption) => {
    setSelectedJapaneseOption(japaneseOption)
    setPrepopulatedData(null)
  }, [])

  const selectSense = useCallback(
    (senseIndex: number) => {
      if (!selectedSlug || !selectedJapaneseOption) {
        return
      }

      const sense = selectedSlug.senses[senseIndex]

      if (!sense) {
        return
      }

      const word = selectedJapaneseOption.word || ''
      const partsOfSpeech = sense.partsOfSpeech || []

      const conjugationForms = getConjugationFormsFromSense(word, partsOfSpeech)

      const verbData: VerbFromJishoData = {
        word,
        hiragana: selectedJapaneseOption.reading || '',
        group: (sense.verbClassification as VerbGroup) || null,
        sense: sense.definitions.join('; ') || '',
        stem: conjugationForms?.stem || '',
        teForm: conjugationForms?.teForm || '',
        aDan: conjugationForms?.aDan || '',
        eDan: conjugationForms?.eDan || '',
        oDan: conjugationForms?.oDan || '',
        isTransitive: sense.verbIsTransitive || false,
        isIntransitive: sense.verbIsInTransitive || false,
      }

      setPrepopulatedData(verbData)
    },
    [selectedSlug, selectedJapaneseOption],
  )

  const availableSenses = selectedSlug?.senses || []

  return {
    searchWord,
    selectSlug,
    selectJapaneseOption,
    selectSense,
    prepopulatedData,
    isLoading: wordSearchMutation.isPending,
    error: wordSearchMutation.error || null,
    slugOptions,
    selectedSlug,
    selectedJapaneseOption,
    availableSenses,
  }
}
