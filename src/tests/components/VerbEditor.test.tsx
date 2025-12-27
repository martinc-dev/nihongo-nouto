/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import VerbEditor from '../../components/WordDashboard/verb/VerbEditor'
import { useWordDetail, useSaveWordDetail } from '../../hooks/useWordDetail'
import { useVerbFromJisho } from '../../hooks/useVerbFromJisho'

// Mock hooks
jest.mock('../../hooks/useWordDetail')
jest.mock('../../hooks/useWordDetail')
jest.mock('../../hooks/useVerbFromJisho')

// Mock child components if necessary (WordTitle is simple enough to render, but WordEditorContainer needs theme)
// We need to wrap with ThemeProvider or mock WordEditorContainer.
// Since WordEditorContainer uses MUI styled, it needs a theme.
// But we can just mock it to render children for simplicity in unit test of Editor logic.
jest.mock('../../components/WordDashboard/WordEditorContainer', () => {
  return {
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
    },
  }
})

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('VerbEditor', () => {
  let mockSaveWordMutation: any
  let mockUseVerbFromJisho: any

  beforeEach(() => {
    mockSaveWordMutation = {
      mutate: jest.fn(),
      isPending: false,
    }
    ;(useSaveWordDetail as jest.Mock).mockReturnValue(mockSaveWordMutation)

    mockUseVerbFromJisho = {
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
    ;(useVerbFromJisho as jest.Mock).mockReturnValue(mockUseVerbFromJisho)
  })

  it('should render create form when no wordId', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter>
        <VerbEditor />
      </MemoryRouter>,
    )

    expect(screen.getByText('Create New Verb')).toBeInTheDocument()
    expect(screen.getByLabelText('Search Word')).toBeInTheDocument()
  })

  it('should render edit form when wordId exists', () => {
    const mockWord = {
      word: 'Taberu',
      hiragana: 'たべる',
      group: 'V1',
      sense: 'To eat',
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ data: mockWord, isLoading: false })

    renderWithTheme(
      <MemoryRouter initialEntries={['/verb/1']}>
        <Routes>
          <Route element={<VerbEditor />} path='/verb/:wordId' />
        </Routes>
      </MemoryRouter>,
    )

    // Wait for form to populate (useEffect)
    // Actually react-testing-library handles effects.
    // Check if values are there.
    // Note: MUI Select input is tricky to query by label directly sometimes, but TextField is okay.

    // Check if "Save" button is present (implies edit mode layout)
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should populate fields from Jisho data', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    // Simulate prepopulated data change
    mockUseVerbFromJisho.prepopulatedData = {
      word: 'JishoWord',
      hiragana: 'JishoReading',
      sense: 'JishoSense',
    }
    ;(useVerbFromJisho as jest.Mock).mockReturnValue(mockUseVerbFromJisho)

    const { rerender } = renderWithTheme(
      <MemoryRouter>
        <VerbEditor />
      </MemoryRouter>,
    )

    // Trigger re-render explicitly to ensure hook update
    rerender(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <VerbEditor />
        </MemoryRouter>
      </ThemeProvider>,
    )

    // The useEffect should update state.
    // We need to re-render to pick up the new hook return value if we changed it,
    // But here we set it before render.
    // Let's verify input values.

    expect(screen.getByDisplayValue('JishoWord')).toBeInTheDocument()
    expect(screen.getByDisplayValue('JishoReading')).toBeInTheDocument()
  })

  it('should call save mutation on submit', async () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter>
        <VerbEditor />
      </MemoryRouter>,
    )

    // Fill in required fields
    const wordInput = screen.getByLabelText('Word')

    fireEvent.change(wordInput, { target: { value: 'NewVerb' } })

    const saveButton = screen.getByText('Create')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockSaveWordMutation.mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ word: 'NewVerb' }),
        }),
        expect.anything(),
      )
    })
  })
})
