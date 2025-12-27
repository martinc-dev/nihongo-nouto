import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { useWordList } from 'src/hooks/useWordList'
import * as requests from 'src/utils/requests'
import { PAGINATION } from 'src/constants/pagination'

// Mock requests
jest.mock('src/utils/requests')

const mockStore = configureStore([])
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore({ nav: { currentContentType: 'VERB' } })}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
)

describe('useWordList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch words with default parameters', async () => {
    const mockData = {
      data: [{ id: 1, word: 'test' }],
      pagination: {
        total: 1,
        page: 1,
        limit: PAGINATION.DEFAULT_WORD_LIST_LIMIT,
        totalPages: 1,
      },
    }

    ;(requests.sendGet as jest.Mock).mockResolvedValue(mockData)

    const { result } = renderHook(() => useWordList(), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockData)
    expect(requests.sendGet).toHaveBeenCalledWith({
      url: expect.stringContaining('page=1'),
    })
  })

  it('should apply filters correctly', async () => {
    const mockData = {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    }

    ;(requests.sendGet as jest.Mock).mockResolvedValue(mockData)

    const { result } = renderHook(() => useWordList({ filters: ['GoDan', 'IchiDan'] }), {
      wrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(requests.sendGet).toHaveBeenCalledWith({
      url: expect.stringContaining('filters=GoDan&filters=IchiDan'),
    })
  })

  it('should handle pagination', async () => {
    const mockData = { data: [], pagination: {} }

    ;(requests.sendGet as jest.Mock).mockResolvedValue(mockData)

    const { result } = renderHook(() => useWordList({ page: 2, limit: 20 }), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(requests.sendGet).toHaveBeenCalledWith({
      url: expect.stringContaining('page=2&limit=20'),
    })
  })
})
