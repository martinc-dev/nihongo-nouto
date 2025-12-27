import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import WordEditorContainer, {
  editorClasses,
} from 'src/components/WordDashboard/WordEditorContainer'
import { colors } from 'src/themes/colors'

// Create a mock theme that includes the properties expected by the component
const theme = createTheme({
  palette: {
    shibafuGreen: { main: colors.shibafuGreen },
    white: { main: colors.white },
    shinmeGreen: { main: colors.shinmeGreen },
    ichigoRed: { main: colors.ichigoRed },
    mikanOrange: { main: colors.mikanOrange },
    kumoriBlue: { main: colors.kumoriBlue },
    soraBlue: { main: colors.soraBlue },
    kujakuishiGreen: { main: colors.kujakuishiGreen },
    prussianBlue: { main: colors.prussianBlue },
  },
})

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('WordEditorContainer', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <WordEditorContainer>
        <div data-testid='child-element'>Test Content</div>
      </WordEditorContainer>,
    )

    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('exports correct CSS classes', () => {
    expect(editorClasses.root).toBe('WordEditorContainer-root')
    expect(editorClasses.saveButton).toBe('WordEditorContainer-saveButton')
    expect(editorClasses.cancelButton).toBe('WordEditorContainer-cancelButton')
    expect(editorClasses.formSection).toBe('WordEditorContainer-formSection')
  })

  it('applies the root class name', () => {
    const { container } = renderWithTheme(
      <WordEditorContainer>
        <div>Content</div>
      </WordEditorContainer>,
    )

    expect(container.firstChild).toHaveClass(editorClasses.root)
  })
})
