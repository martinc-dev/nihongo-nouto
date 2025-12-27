/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react'
import { useVerbFromJisho } from '../../hooks/useVerbFromJisho'
import { useWordSearch } from '../../hooks/useWordSearch'

// Mock dependencies
jest.mock('../../hooks/useWordSearch')
jest.mock('../../utils/conjugation', () => ({
  getConjugationFormsFromSense: jest.fn().mockReturnValue({
    stem: 'stem',
    teForm: 'te',
    aDan: 'a',
    eDan: 'e',
    oDan: 'o',
  }),
}))

describe('useVerbFromJisho', () => {
  let mockMutate: jest.Mock

  beforeEach(() => {
    mockMutate = jest.fn()
    ;(useWordSearch as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    })
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useVerbFromJisho())

    expect(result.current.prepopulatedData).toBeNull()
    expect(result.current.slugOptions).toEqual([])
    expect(result.current.selectedSlug).toBeNull()
    expect(result.current.selectedJapaneseOption).toBeNull()
  })

  it('should search word', () => {
    const { result } = renderHook(() => useVerbFromJisho())

    act(() => {
      result.current.searchWord('test')
    })

    expect(mockMutate).toHaveBeenCalledWith('test', expect.any(Object))
  })

  it('should handle search success', () => {
    const mockData = { slugOptions: [{ slug: 'test' }] }

    mockMutate.mockImplementation((word, options) => {
      options.onSuccess(mockData)
    })

    const { result } = renderHook(() => useVerbFromJisho())

    act(() => {
      result.current.searchWord('test')
    })

    expect(result.current.slugOptions).toEqual(mockData.slugOptions)
  })

  it('should handle slug selection', () => {
    const slugOption = { slug: 'test', senses: [], japanese: [] } as any
    const { result } = renderHook(() => useVerbFromJisho())

    act(() => {
      result.current.selectSlug(slugOption)
    })

    expect(result.current.selectedSlug).toEqual(slugOption)
  })

  it('should prepopulate data when sense is selected', () => {
    const slugOption = {
      slug: 'test',
      senses: [{ definitions: ['def'], partsOfSpeech: ['verb'] }],
      japanese: [],
    } as any
    const japaneseOption = { word: 'word', reading: 'reading' } as any

    const { result } = renderHook(() => useVerbFromJisho())

    act(() => {
      result.current.selectSlug(slugOption)
      result.current.selectJapaneseOption(japaneseOption)
    })

    act(() => {
      result.current.selectSense(0)
    })

    expect(result.current.prepopulatedData).not.toBeNull()
    expect(result.current.prepopulatedData?.word).toBe('word')
    expect(result.current.prepopulatedData?.sense).toBe('def')
  })
})
