import { useState, useCallback } from 'react'

import { useWordSearch } from 'src/hooks/useWordSearch'
import { JishoWordOption, JishoSlugOption, ApiError } from 'src/types/words'
import { parseAdjProp } from 'src/utils/jisho'

export interface AdjFromJishoData {
  word: string
  hiragana: string
  isIConjugation: boolean
  sense: string
}

interface UseAdjFromJishoResult {
  searchWord: (word: string) => void
  selectSlug: (slugOption: JishoSlugOption) => void
  selectJapaneseOption: (japaneseOption: JishoWordOption) => void
  selectSense: (senseIndex: number) => void
  prepopulatedData: AdjFromJishoData | null
  isLoading: boolean
  error: ApiError | null
  slugOptions: JishoSlugOption[]
  selectedSlug: JishoSlugOption | null
  selectedJapaneseOption: JishoWordOption | null
  availableSenses: Array<{
    definitions: string[]
    partsOfSpeech: string[]
    adjType?: string | null
  }>
}

export const useAdjFromJisho = (): UseAdjFromJishoResult => {
  const [prepopulatedData, setPrepopulatedData] = useState<AdjFromJishoData | null>(null)
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

      const adjProps = parseAdjProp({ partsOfSpeechArray: partsOfSpeech })

      const adjData: AdjFromJishoData = {
        word,
        hiragana: selectedJapaneseOption.reading || '',
        isIConjugation: adjProps.adjType === 'IADJ',
        sense: sense.definitions.join('; ') || '',
      }

      setPrepopulatedData(adjData)
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
