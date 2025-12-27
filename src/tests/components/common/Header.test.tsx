import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../../../components/common/Header'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const mockStore = configureStore([])

const mockTheme = createTheme({})

// Explicitly add custom palette properties
mockTheme.palette.white = { main: '#fff' }

describe('Header', () => {
  it('should render header with title', () => {
    const store = mockStore({
      nav: { currentContentType: 'VERB' },
    })

    render(
      <Provider store={store}>
        <ThemeProvider theme={mockTheme}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    )

    expect(screen.getByText('日本語ノート')).toBeInTheDocument()
  })
})
