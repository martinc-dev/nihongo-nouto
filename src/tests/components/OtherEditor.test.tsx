/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import OtherEditor from '../../components/WordDashboard/other/OtherEditor'
import { useWordDetail, useSaveWordDetail } from '../../hooks/useWordDetail'
import { useWordFromJisho } from '../../hooks/useWordFromJisho'
import { useWordDupe } from '../../hooks/useWordDupe'

// Mock hooks
jest.mock('../../hooks/useWordDetail')
jest.mock('../../hooks/useWordFromJisho')
jest.mock('../../hooks/useWordDupe')

// Mock container
jest.mock('../../components/WordDashboard/WordEditorContainer', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  default: ({ children }: any) => (
    <div data-testid='word-editor-container'>{children}</div>
  ),
  editorClasses: {
    formSection: 'form-section',
    formRow: 'form-row',
    formField: 'form-field',
    saveButton: 'save-button',
    cancelButton: 'cancel-button',
    selectField: 'select-field',
  },
}))

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('OtherEditor', () => {
  let mockSaveWordMutation: any
  let mockUseWordFromJisho: any

  beforeEach(() => {
    mockSaveWordMutation = {
      mutate: jest.fn(),
      isPending: false,
    }
    ;(useSaveWordDetail as jest.Mock).mockReturnValue(mockSaveWordMutation)

    mockUseWordFromJisho = {
      searchWord: jest.fn(),
      selectSlug: jest.fn(),
      selectJapaneseOption: jest.fn(),
      selectSense: jest.fn(),
      prepopulatedData: null,
      isLoading: false,
      slugOptions: [],
      selectedSlug: null,
      selectedJapaneseOption: null,
      availableSenses: [],
    }
    ;(useWordFromJisho as jest.Mock).mockReturnValue(mockUseWordFromJisho)
    ;(useWordDupe as jest.Mock).mockReturnValue({
      refetch: jest.fn().mockResolvedValue({ data: { data: [] } }),
    })
  })

  it('should render create form', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <OtherEditor />
      </MemoryRouter>,
    )

    expect(screen.getByText('Create New Word')).toBeInTheDocument()
  })

  it('should save data', async () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <OtherEditor />
      </MemoryRouter>,
    )

    const wordInput = screen.getByLabelText('Word')

    fireEvent.change(wordInput, { target: { value: 'TestWord' } })

    const saveButton = screen.getByText('Create')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockSaveWordMutation.mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            word: 'TestWord',
          }),
        }),
        expect.anything(),
      )
    })
  })
})
