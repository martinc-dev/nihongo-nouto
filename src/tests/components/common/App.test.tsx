import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../themes/theme'
import App from '../../../components/common/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordList', () => () => (
  <div data-testid='word-list'>WordList</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/verb/VerbEditor', () => () => (
  <div>VerbEditor</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/adj/AdjEditor', () => () => (
  <div>AdjEditor</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/noun/NounEditor', () => () => (
  <div>NounEditor</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/other/OtherEditor', () => () => (
  <div>OtherEditor</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/verb/VerbDetail', () => () => (
  <div>VerbDetail</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/adj/AdjDetail', () => () => (
  <div>AdjDetail</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/noun/NounDetail', () => () => (
  <div>NounDetail</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../../components/WordDashboard/other/OtherDetail', () => () => (
  <div>OtherDetail</div>
))

const mockStore = configureStore([])
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

const renderApp = (initialRoute = '/') => {
  const store = mockStore({
    nav: { currentContentType: 'NOUN' },
  })

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[initialRoute]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>,
  )
}

describe('App', () => {
  it('should render header and footer', () => {
    renderApp()

    // Check for Header title
    expect(screen.getByText('日本語ノート')).toBeInTheDocument()

    // Check for Footer text
    expect(screen.getByText('Nihongo Nouto')).toBeInTheDocument()
  })

  it('should render WordList on root route', () => {
    renderApp('/')
    expect(screen.getByTestId('word-list')).toBeInTheDocument()
  })
})
