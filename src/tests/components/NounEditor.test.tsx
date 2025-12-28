/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import NounEditor from '../../components/WordDashboard/noun/NounEditor'
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
    tagsContainer: 'tags-container',
    tagChip: 'tag-chip',
    selectField: 'select-field',
  },
}))

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('NounEditor', () => {
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

  it('should render create form correctly', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <NounEditor />
      </MemoryRouter>,
    )

    expect(screen.getByText('Create New Noun')).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('should render tags and allow selection', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <NounEditor />
      </MemoryRouter>,
    )

    // Check for a tag (e.g., "Things", "Abstract") - assuming nounTags are rendered
    const tag = screen.getByText('Things')

    expect(tag).toBeInTheDocument()

    fireEvent.click(tag)

    // MUI Chip selection visual state is hard to test without checking computed styles or classes
    // But we verify no crash and interaction works
  })

  it('should prepopulate data for edit', () => {
    const mockNoun = {
      id: 1,
      word: 'Hon',
      hiragana: 'ほん',
      sense: 'Book',
      nounTagRel: [{ tagId: 1 }],
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ data: mockNoun, isLoading: false })

    renderWithTheme(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        initialEntries={['/noun/1']}
      >
        <Routes>
          <Route element={<NounEditor />} path='/noun/:wordId' />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByDisplayValue('Hon')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Book')).toBeInTheDocument()
  })

  it('should save data with tags', async () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <NounEditor />
      </MemoryRouter>,
    )

    const wordInput = screen.getByLabelText('Word')

    fireEvent.change(wordInput, { target: { value: 'NewNoun' } })

    const tag = screen.getByText('Things')

    fireEvent.click(tag)

    const saveButton = screen.getByText('Create')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockSaveWordMutation.mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            word: 'NewNoun',
            tagIds: expect.arrayContaining([1]), // Things tag ID is 1
          }),
        }),
        expect.anything(),
      )
    })
  })
})
