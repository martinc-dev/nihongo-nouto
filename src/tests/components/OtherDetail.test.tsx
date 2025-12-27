import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import OtherDetail from '../../components/WordDashboard/other/OtherDetail'
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
jest.mock('../../components/WordDashboard/WordSense', () => () => <div>Sense</div>)

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('OtherDetail', () => {
  it('should render detail', () => {
    const mockWord = {
      word: 'Etc',
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ isLoading: false, data: mockWord })

    renderWithTheme(<OtherDetail wordId='1' />)

    expect(screen.getByText('Title: Etc')).toBeInTheDocument()
  })
})
