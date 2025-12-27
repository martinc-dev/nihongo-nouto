import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import AdjDetail from '../../components/WordDashboard/adj/AdjDetail'
import { useWordDetail } from '../../hooks/useWordDetail'

jest.mock('../../hooks/useWordDetail')
jest.mock('../../components/WordDashboard/WordDetailContainer', () =>
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  ({ children }: any) => <div>{children}</div>,
)
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock('../../components/WordDashboard/WordTitle', () => ({ word }: any) => (
  <div>Title: {word}</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/WordActions', () => () => <div>Actions</div>)
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/WordTypeDisplay', () => () => (
  <div>TypeDisplay</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/WordSense', () => () => <div>Sense</div>)

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('AdjDetail', () => {
  it('should render detail', () => {
    const mockWord = {
      word: 'Takai',
      isIConjugation: true,
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ isLoading: false, data: mockWord })

    renderWithTheme(<AdjDetail wordId='1' />)

    expect(screen.getByText('Title: Takai')).toBeInTheDocument()
    expect(screen.getByText('TypeDisplay')).toBeInTheDocument()
  })
})
