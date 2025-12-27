import { useState, useCallback } from 'react'

import { useWordSearch } from 'src/hooks/useWordSearch'
import { JishoWordOption, JishoSlugOption, ApiError } from 'src/types/words'

export interface WordFromJishoData {
  word: string
  hiragana: string
  sense: string
}

interface UseWordFromJishoResult {
  searchWord: (word: string) => void
  selectSlug: (slugOption: JishoSlugOption) => void
  selectJapaneseOption: (japaneseOption: JishoWordOption) => void
  selectSense: (senseIndex: number) => void
  prepopulatedData: WordFromJishoData | null
  isLoading: boolean
  error: ApiError | null
  slugOptions: JishoSlugOption[]
  selectedSlug: JishoSlugOption | null
  selectedJapaneseOption: JishoWordOption | null
  availableSenses: Array<{
    definitions: string[]
    partsOfSpeech: string[]
  }>
}

export const useWordFromJisho = (): UseWordFromJishoResult => {
  const [prepopulatedData, setPrepopulatedData] = useState<WordFromJishoData | null>(null)
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

      const wordData: WordFromJishoData = {
        word,
        hiragana: selectedJapaneseOption.reading || '',
        sense: sense.definitions.join('; ') || '',
      }

      setPrepopulatedData(wordData)
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
