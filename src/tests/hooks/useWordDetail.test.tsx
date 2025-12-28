/* eslint-disable max-nested-callbacks, require-await, @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import {
  useWordDetail,
  useSaveWordDetail,
  useDeleteWordDetail,
} from '../../hooks/useWordDetail'
import * as requests from '../../utils/requests'
import { MemoryRouter } from 'react-router-dom'

// Mock requests
jest.mock('../../utils/requests')

// Mock useNavigate
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const mockStore = configureStore([])
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore({ nav: { currentContentType: 'NOUN' } })}>
    <QueryClientProvider client={queryClient}>
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  </Provider>
)

describe('useWordDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  describe('useWordDetail', () => {
    it('should fetch word detail', async () => {
      const mockData = { id: 1, word: 'test' }

      ;(requests.sendGet as jest.Mock).mockResolvedValue(mockData)

      const { result } = renderHook(() => useWordDetail(1), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data).toEqual(mockData)
      expect(requests.sendGet).toHaveBeenCalled()
    })

    it('should return null if no wordId', async () => {
      const { result } = renderHook(() => useWordDetail(null), { wrapper })

      expect(result.current.data).toBeUndefined() // Or null depending on implementation
      expect(requests.sendGet).not.toHaveBeenCalled()
    })
  })

  describe('useSaveWordDetail', () => {
    it('should create new word', async () => {
      const mockData = { id: 1, word: 'new' }

      ;(requests.sendPost as jest.Mock).mockResolvedValue(mockData)

      const { result } = renderHook(() => useSaveWordDetail(), { wrapper })

      await result.current.mutateAsync({ data: { word: 'new' } } as any)

      expect(requests.sendPost).toHaveBeenCalled()
    })

    it('should update existing word', async () => {
      const mockData = { id: 1, word: 'updated' }

      ;(requests.sendPatch as jest.Mock).mockResolvedValue(mockData)

      const { result } = renderHook(() => useSaveWordDetail(), { wrapper })

      await result.current.mutateAsync({ id: 1, data: { word: 'updated' } } as any)

      expect(requests.sendPatch).toHaveBeenCalled()
    })
  })

  describe('useDeleteWordDetail', () => {
    it('should delete word', async () => {
      ;(requests.sendDelete as jest.Mock).mockResolvedValue({})

      const { result } = renderHook(() => useDeleteWordDetail(), { wrapper })

      await result.current.mutateAsync({ id: 1 })

      expect(requests.sendDelete).toHaveBeenCalled()
    })
  })
})
