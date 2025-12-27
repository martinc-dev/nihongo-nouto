/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WordTagIcon from '../../../components/common/WordTagIcon'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Mock theme with required custom palette colors
const mockTheme = createTheme({
  palette: {
    prussianBlue: { main: '#102b43' },
  } as any, // Bypass strict typing for custom colors in test
})

describe('WordTagIcon', () => {
  it('should render icon for known tag', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <WordTagIcon tagName='THINGS' />
      </ThemeProvider>,
    )
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('should render nothing for unknown tag', () => {
    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <WordTagIcon tagName='Unknown' />
      </ThemeProvider>,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
