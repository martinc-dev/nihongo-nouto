/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook } from '@testing-library/react'
import { useWordSearch } from '../../hooks/useWordSearch'
import * as requests from '../../utils/requests'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('../../utils/requests')

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

describe('useWordSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetchWordSearch with correct params', async () => {
    const mockResponse = {
      meta: { status: 200 },
      data: [
        {
          slug: 'test-word',
          japanese: [{ word: 'Test', reading: 'Test' }],
          senses: [{ englishDefinitions: ['Test def'], partsOfSpeech: ['Verb'] }],
        },
      ],
    }

    ;(requests.sendGet as jest.Mock).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useWordSearch(), { wrapper })

    await result.current.mutateAsync('test')

    expect(requests.sendGet).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('/api/jisho/test'),
      }),
    )
  })
})
