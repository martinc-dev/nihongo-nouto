import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../themes/theme'
import NounDetail from '../../components/WordDashboard/noun/NounDetail'
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
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock('../../components/common/WordTagIcon', () => ({ tagName }: any) => (
  <div>Tag: {tagName}</div>
))

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('NounDetail', () => {
  it('should render detail', () => {
    const mockWord = {
      word: 'Hon',
      nounTagRel: [{ id: 1, tagId: 1, nounTag: { name: 'THINGS' } }],
    }

    ;(useWordDetail as jest.Mock).mockReturnValue({ isLoading: false, data: mockWord })

    renderWithTheme(<NounDetail wordId='1' />)

    expect(screen.getByText('Title: Hon')).toBeInTheDocument()
    expect(screen.getByText('Tag: THINGS')).toBeInTheDocument()
  })
})
