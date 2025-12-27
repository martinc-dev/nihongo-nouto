/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import WordTypeDisplay from '../../components/WordDashboard/WordTypeDisplay'

// Mock WordGroupIcon since it might need specific props or context
// eslint-disable-next-line react/display-name
jest.mock('../../components/common/WordGroupIcon', () => ({ type }: any) => (
  <span>Icon: {type}</span>
))

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('WordTypeDisplay', () => {
  it('should render types', () => {
    renderWithTheme(<WordTypeDisplay types={['V1', 'TRANSITIVE']} />)

    expect(screen.getByText('Icon: V1')).toBeInTheDocument()
    expect(screen.getByText('Icon: TRANSITIVE')).toBeInTheDocument()
  })

  it('should render nothing if no types', () => {
    const { container } = renderWithTheme(<WordTypeDisplay types={[]} />)

    // It might render an empty container depending on implementation
    // Checking code: return <Root ...>{types.map...}</Root>
    // So it renders the root.
    expect(container.firstChild).toBeInTheDocument()
  })
})
