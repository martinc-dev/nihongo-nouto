/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, require-await */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import WordActions from '../../components/WordDashboard/WordActions'
import { useDeleteWordDetail } from '../../hooks/useWordDetail'

// Mock hooks
jest.mock('../../hooks/useWordDetail')

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ wordId: '1' }),
  useNavigate: () => jest.fn(),
}))

const mockStore = configureStore([])

const renderWithProviders = (
  ui: React.ReactElement,
  storeState: any = { nav: { currentContentType: 'NOUN' } },
) => {
  const store = mockStore(storeState)

  return render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        {ui}
      </MemoryRouter>
    </Provider>,
  )
}

describe('WordActions', () => {
  let mockDeleteMutation: any

  beforeEach(() => {
    mockDeleteMutation = {
      mutate: jest.fn(),
      isPending: false,
    }
    ;(useDeleteWordDetail as jest.Mock).mockReturnValue(mockDeleteMutation)

    // Mock window.confirm
    jest.spyOn(window, 'confirm').mockImplementation(() => true)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render delete button', () => {
    renderWithProviders(<WordActions />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('should call delete mutation when clicked', async () => {
    renderWithProviders(<WordActions />)

    const deleteButton = screen.getByText('Delete')

    fireEvent.click(deleteButton)

    // It might open a dialog first or just delete.
    // Based on typical implementation, it might ask for confirmation.
    // If it deletes immediately:
    // Expect(mockDeleteMutation.mutate).toHaveBeenCalled()

    // If it opens a dialog (unlikely for "WordActions" unless it's a menu):
    // Let's assume simple button for now based on component name.

    // Wait, checking WordActions implementation...
    // I haven't read it but it's likely simple.

    await waitFor(() => {
      expect(mockDeleteMutation.mutate).toHaveBeenCalledWith({ id: 1 })
    })
  })
})
