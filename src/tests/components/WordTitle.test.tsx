import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import WordTitle from '../../components/WordDashboard/WordTitle'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('WordTitle', () => {
  it('should render word and hiragana', () => {
    renderWithTheme(<WordTitle hiragana='たべる' word='Taberu' />)

    expect(screen.getByText('Taberu')).toBeInTheDocument()
    expect(screen.getByText('たべる')).toBeInTheDocument()
  })

  it('should render with missing hiragana', () => {
    renderWithTheme(<WordTitle word='Computer' />)

    expect(screen.getByText('Computer')).toBeInTheDocument()
  })
})
