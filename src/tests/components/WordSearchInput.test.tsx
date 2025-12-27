import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import WordSearchInput from '../../components/WordDashboard/editor/WordSearchInput'
import { useWordSearch } from '../../hooks/useWordSearch'

jest.mock('../../hooks/useWordSearch')

describe('WordSearchInput', () => {
  let mockMutate: jest.Mock

  beforeEach(() => {
    mockMutate = jest.fn()
    ;(useWordSearch as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    })
  })

  it('should render input', () => {
    render(
      <WordSearchInput
        initWord=''
        onInputBlur={jest.fn()}
        onWordChange={jest.fn()}
        onWordSelect={jest.fn()}
      />,
    )
    expect(screen.getByLabelText('Word')).toBeInTheDocument()
  })

  it('should trigger search on enter', async () => {
    render(
      <WordSearchInput
        initWord=''
        onInputBlur={jest.fn()}
        onWordChange={jest.fn()}
        onWordSelect={jest.fn()}
      />,
    )

    const input = screen.getByLabelText('Word')

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { keyCode: 13 })

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled()
    })
  })
})
