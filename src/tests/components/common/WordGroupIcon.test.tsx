/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WordGroupIcon from '../../../components/common/WordGroupIcon'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const mockTheme = createTheme({
  palette: {
    prussianBlue: { main: '#102b43' },
  } as any,
})

describe('WordGroupIcon', () => {
  it('should render icon for known group', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <WordGroupIcon type='V1' />
      </ThemeProvider>,
    )
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should render nothing for unknown group', () => {
    const { container } = render(
      <ThemeProvider theme={mockTheme}>
        <WordGroupIcon type='Unknown' />
      </ThemeProvider>,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
