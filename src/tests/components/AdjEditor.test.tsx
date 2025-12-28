/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import AdjEditor from '../../components/WordDashboard/adj/AdjEditor'
import { useWordDetail, useSaveWordDetail } from '../../hooks/useWordDetail'
import { useAdjFromJisho } from '../../hooks/useAdjFromJisho'
import { useWordDupe } from '../../hooks/useWordDupe'

// Mock hooks
jest.mock('../../hooks/useWordDetail')
jest.mock('../../hooks/useAdjFromJisho')
jest.mock('../../hooks/useWordDupe')

// Mock Search Input
jest.mock('src/components/WordDashboard/editor/WordSearchInput', () =>
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  ({ onSelect }: any) => (
    <button
      onClick={() => onSelect({ slug: 'test-slug', japanese: [{ word: 'test' }] })}
      type='button'
    >
      Select
    </button>
  ),
)

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

describe('AdjEditor', () => {
  let mockSaveWordMutation: any
  let mockUseAdjFromJisho: any
  const user = userEvent.setup()

  beforeEach(() => {
    mockSaveWordMutation = {
      mutate: jest.fn(),
      isPending: false,
    }
    ;(useSaveWordDetail as jest.Mock).mockReturnValue(mockSaveWordMutation)

    mockUseAdjFromJisho = {
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
    ;(useAdjFromJisho as jest.Mock).mockReturnValue(mockUseAdjFromJisho)
    ;(useWordDupe as jest.Mock).mockReturnValue({
      refetch: jest.fn().mockResolvedValue({ data: { data: [] } }),
    })
  })

  it('should render create form', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AdjEditor />
      </MemoryRouter>,
    )

    expect(screen.getByText('Create New Adjective')).toBeInTheDocument()
  })

  it('should toggle adjective type', async () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AdjEditor />
      </MemoryRouter>,
    )

    // Find the select by role (combobox)
    const trigger = screen.getByRole('combobox')

    expect(trigger).toHaveTextContent('NAADJ')

    // Open menu
    await user.click(trigger)

    // Select IADJ
    const option = await screen.findByRole('option', { name: 'IADJ' })

    await user.click(option)

    // Verify change
    expect(trigger).toHaveTextContent('IADJ')
  })

  it('should save data', async () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AdjEditor />
      </MemoryRouter>,
    )

    const wordInput = screen.getByLabelText('Word')

    await user.type(wordInput, 'Atarashii')

    const saveButton = screen.getByText('Create')

    await user.click(saveButton)

    await waitFor(() => {
      expect(mockSaveWordMutation.mutate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            word: 'Atarashii',
          }),
        }),
        expect.anything(),
      )
    })
  })

  it('should populate data from Jisho', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ data: null, isLoading: false })

    mockUseAdjFromJisho.prepopulatedData = {
      word: 'JishoWord',
      hiragana: 'JishoReading',
      sense: 'JishoSense',
      isIConjugation: true,
    }
    ;(useAdjFromJisho as jest.Mock).mockReturnValue(mockUseAdjFromJisho)

    renderWithTheme(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AdjEditor />
      </MemoryRouter>,
    )

    expect(screen.getByDisplayValue('JishoWord')).toBeInTheDocument()
    expect(screen.getByDisplayValue('JishoReading')).toBeInTheDocument()
    const trigger = screen.getByRole('combobox')

    expect(trigger).toHaveTextContent('IADJ')
  })

  it('should populate data for editing', () => {
    const mockWord = {
      word: 'OldWord',
      hiragana: 'OldReading',
      sense: 'OldSense',
      isIConjugation: false,
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ data: mockWord, isLoading: false })

    renderWithTheme(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        initialEntries={['/adj/123']}
      >
        <AdjEditor wordId='123' />
      </MemoryRouter>,
    )

    expect(screen.getByDisplayValue('OldWord')).toBeInTheDocument()
    const trigger = screen.getByRole('combobox')

    expect(trigger).toHaveTextContent('NAADJ')

    expect(screen.queryByText('Create New Adjective')).not.toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })
})
