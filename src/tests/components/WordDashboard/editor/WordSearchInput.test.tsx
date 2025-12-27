/* eslint-disable require-await */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import WordSearchInput from '../../../../components/WordDashboard/editor/WordSearchInput'
import { useWordSearch } from '../../../../hooks/useWordSearch'
import { KEYCODES } from '../../../../constants/events'

// Mock hooks
jest.mock('../../../../hooks/useWordSearch')

describe('WordSearchInput', () => {
  let mockMutate: jest.Mock
  let mockOnInputBlur: jest.Mock
  let mockOnWordChange: jest.Mock
  let mockOnWordSelect: jest.Mock

  beforeEach(() => {
    mockMutate = jest.fn()
    mockOnInputBlur = jest.fn()
    mockOnWordChange = jest.fn()
    mockOnWordSelect = jest.fn()
    ;(useWordSearch as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    })
  })

  it('should render input field', () => {
    render(
      <WordSearchInput
        onInputBlur={mockOnInputBlur}
        onWordChange={mockOnWordChange}
        onWordSelect={mockOnWordSelect}
      />,
    )

    expect(screen.getByLabelText('Word')).toBeInTheDocument()
  })

  it('should call onWordChange when typing', () => {
    render(
      <WordSearchInput
        onInputBlur={mockOnInputBlur}
        onWordChange={mockOnWordChange}
        onWordSelect={mockOnWordSelect}
      />,
    )

    const input = screen.getByLabelText('Word')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(mockOnWordChange).toHaveBeenCalledWith('test')
  })

  it('should trigger search on Enter key', async () => {
    render(
      <WordSearchInput
        onInputBlur={mockOnInputBlur}
        onWordChange={mockOnWordChange}
        onWordSelect={mockOnWordSelect}
      />,
    )

    const input = screen.getByLabelText('Word')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { keyCode: KEYCODES.ENTER_KEY_CODE })

    // Use waitFor to ensure async expectations are handled
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith('test', expect.any(Object))
    })
  })

  it('should display options after search success', async () => {
    mockMutate.mockImplementation((word, options) => {
      options.onSuccess({
        wordOptions: [
          { word: 'test1', reading: 'reading1' },
          { word: 'test2', reading: 'reading2' },
        ],
      })
    })

    render(
      <WordSearchInput
        onInputBlur={mockOnInputBlur}
        onWordChange={mockOnWordChange}
        onWordSelect={mockOnWordSelect}
      />,
    )

    const input = screen.getByLabelText('Word')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { keyCode: KEYCODES.ENTER_KEY_CODE })

    // Open autocomplete dropdown (typing usually opens it, but we might need to trigger it)
    fireEvent.mouseDown(input)

    await waitFor(() => {
      // Autocomplete options are rendered in portals usually, assume they appear in document
      expect(screen.getByText('test1')).toBeInTheDocument()
      expect(screen.getByText('test2')).toBeInTheDocument()
    })
  })
})
