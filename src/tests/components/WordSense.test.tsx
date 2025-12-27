import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import WordSense from '../../components/WordDashboard/WordSense'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('WordSense', () => {
  it('should render sense', () => {
    renderWithTheme(<WordSense sense='Meaning' />)
    expect(screen.getByText('Meaning')).toBeInTheDocument()
  })

  it('should render empty sense if missing', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { container } = renderWithTheme(<WordSense sense={undefined as any} />)

    // It seems to render an empty container rather than null
    expect(container.firstChild).toBeInTheDocument()
  })
})
