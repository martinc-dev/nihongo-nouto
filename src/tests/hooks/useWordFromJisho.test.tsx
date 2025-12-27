/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react'
import { useWordFromJisho } from '../../hooks/useWordFromJisho'
import { useWordSearch } from '../../hooks/useWordSearch'

jest.mock('../../hooks/useWordSearch')

describe('useWordFromJisho', () => {
  let mockMutate: jest.Mock

  beforeEach(() => {
    mockMutate = jest.fn()
    ;(useWordSearch as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    })
  })

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useWordFromJisho())

    expect(result.current.prepopulatedData).toBeNull()
  })

  it('should search word', () => {
    const { result } = renderHook(() => useWordFromJisho())

    act(() => {
      result.current.searchWord('test')
    })
    expect(mockMutate).toHaveBeenCalledWith('test', expect.any(Object))
  })

  it('should select slug and sense', () => {
    const slugOption = {
      slug: 'test',
      japanese: [{ word: 'word', reading: 'reading' }],
      senses: [{ definitions: ['def'] }],
    } as any
    const japaneseOption = { word: 'word', reading: 'reading' } as any

    const { result } = renderHook(() => useWordFromJisho())

    act(() => {
      result.current.selectSlug(slugOption)
      result.current.selectJapaneseOption(japaneseOption)
    })

    act(() => {
      result.current.selectSense(0)
    })

    expect(result.current.prepopulatedData).toEqual({
      word: 'word',
      hiragana: 'reading',
      sense: 'def',
    })
  })
})
