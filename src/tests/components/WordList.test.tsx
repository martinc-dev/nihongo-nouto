/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import WordList from '../../components/WordList'
import { useWordList } from '../../hooks/useWordList'

// Mock dependencies
jest.mock('../../hooks/useWordList')
jest.mock('../../utils/localStorage', () => ({
  getNumber: jest.fn().mockReturnValue(1),
  setNumber: jest.fn(),
  remove: jest.fn(),
}))

const mockStore = configureStore([])

const renderWordList = (storeState: any) => {
  const store = mockStore(storeState)

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <WordList />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  )
}

describe('WordList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state', () => {
    ;(useWordList as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    renderWordList({ nav: { currentContentType: 'VERB' } })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    ;(useWordList as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { error: 'Failed to fetch' },
    })

    renderWordList({ nav: { currentContentType: 'VERB' } })

    expect(screen.getByText('Error loading words: Failed to fetch')).toBeInTheDocument()
  })

  it('renders word list with data', () => {
    const mockData = {
      data: [{ id: 1, word: 'Taberu', hiragana: 'たべる', group: 'V1', sense: 'To eat' }],
      pagination: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    }

    ;(useWordList as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    })

    renderWordList({ nav: { currentContentType: 'VERB' } })

    expect(screen.getByText('Taberu')).toBeInTheDocument()
    expect(screen.getByText('たべる')).toBeInTheDocument()
    expect(screen.getByText('To eat')).toBeInTheDocument()
  })

  it('renders loading if currentContentType is null', () => {
    ;(useWordList as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    renderWordList({ nav: { currentContentType: null } })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
