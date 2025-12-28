import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ThemeProvider } from '@mui/material/styles'
import { MemoryRouter } from 'react-router-dom'
import { theme } from '../../themes/theme'
import Header from '../../components/common/Header'

// Mock NavMenu since it might be complex or connected
// eslint-disable-next-line react/display-name
jest.mock('../../components/common/NavMenu', () => () => (
  <div data-testid='nav-menu'>NavMenu</div>
))

const mockStore = configureStore([])

const renderWithProviders = (ui: React.ReactElement) => {
  const store = mockStore({ nav: { currentContentType: 'VERB' } })

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  )
}

describe('Header', () => {
  it('renders title and nav menu', () => {
    renderWithProviders(<Header />)

    expect(screen.getByText('日本語ノート')).toBeInTheDocument()
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument()
  })
})
