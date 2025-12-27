import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../../../components/common/Footer'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const mockTheme = createTheme({})

// Explicitly add custom palette properties
mockTheme.palette.metalBlue = { main: '#2e455b' }
mockTheme.palette.white = { main: '#fff' }

describe('Footer', () => {
  it('should render footer text', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <Footer />
      </ThemeProvider>,
    )
    expect(screen.getByText('Nihongo Nouto')).toBeInTheDocument()
  })
})
