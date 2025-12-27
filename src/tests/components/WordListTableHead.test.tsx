import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import WordListTableHead from '../../components/WordList/WordListTableHead'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <table>{ui}</table>
    </ThemeProvider>,
  )
}

describe('WordListTableHead', () => {
  const defaultProps = {
    onSortChange: jest.fn(),
    onFilterChange: jest.fn(),
    onDisplayChange: jest.fn(),
    orderBy: 'id',
    isAsc: true,
    displayOptionsMap: { word: true, sense: true, hiragana: true },
    filterOptionsMap: { GoDan: false, IchiDan: false },
    onCreateClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render column headers', () => {
    renderWithTheme(<WordListTableHead {...defaultProps} />)
    expect(screen.getByText('Word')).toBeInTheDocument()
    expect(screen.getByText('Sense')).toBeInTheDocument()
    expect(screen.getByText('Hiragana')).toBeInTheDocument()
  })

  it('should trigger sort on click', () => {
    renderWithTheme(<WordListTableHead {...defaultProps} />)
    const wordHeader = screen.getByText('Word')

    fireEvent.click(wordHeader)
    expect(defaultProps.onSortChange).toHaveBeenCalledWith('word')
  })

  it('should open filter menu', async () => {
    renderWithTheme(<WordListTableHead {...defaultProps} />)
    const filterButton = screen.getByTestId('FilterListIcon').closest('button')

    expect(filterButton).toBeInTheDocument()
    if (filterButton) fireEvent.click(filterButton)

    // Check if menu opened (by finding a filter option text)
    expect(await screen.findByText('GoDan')).toBeInTheDocument()
  })

  it('should open display options menu', async () => {
    renderWithTheme(<WordListTableHead {...defaultProps} />)
    const displayButton = screen.getByTestId('VisibilityIcon').closest('button')

    expect(displayButton).toBeInTheDocument()
    if (displayButton) fireEvent.click(displayButton)

    expect(await screen.findByText('Word')).toBeInTheDocument()
  })
})
