/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import VerbDetail from '../../components/WordDashboard/verb/VerbDetail'
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
jest.mock('../../components/WordDashboard/verb/VerbMainFormRow', () => () => (
  <div>MainFormRow</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/verb/VerbConjFormRow', () => () => (
  <div>ConjFormRow</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/verb/VerbConjFormAdditional', () => () => (
  <div>ConjFormAdditional</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/WordTypeDisplay', () => () => (
  <div>TypeDisplay</div>
))
// eslint-disable-next-line react/display-name
jest.mock('../../components/WordDashboard/WordSense', () => () => <div>Sense</div>)

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('VerbDetail', () => {
  it('should render loading', () => {
    ;(useWordDetail as jest.Mock).mockReturnValue({ isLoading: true })
    renderWithTheme(<VerbDetail wordId='1' />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render detail', () => {
    const mockWord = {
      word: 'Taberu',
      group: 'V1',
      isTransitive: true,
      conjugation: {},
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ isLoading: false, data: mockWord })

    renderWithTheme(<VerbDetail wordId='1' />)

    expect(screen.getByText('Title: Taberu')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByText('MainFormRow')).toBeInTheDocument()
    expect(screen.getByText('ConjFormRow')).toBeInTheDocument()
    expect(screen.getByText('ConjFormAdditional')).toBeInTheDocument()
  })
})
