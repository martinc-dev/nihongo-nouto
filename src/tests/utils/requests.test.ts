import { sendGet, sendPost, sendPatch, sendDelete } from '../../utils/requests'
import { logError } from '../../utils/log'

// Mock fetch
global.fetch = jest.fn()
// Mock logger
jest.mock('../../utils/log')

describe('requests utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('sendGet', () => {
    it('should make GET request and return camelCased data', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ user_name: 'test' }),
      }

      ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

      const result = await sendGet({ url: '/api/test' })

      expect(global.fetch).toHaveBeenCalledWith('/api/test', { method: 'GET' })
      expect(result).toEqual({ userName: 'test' })
    })

    it('should handle query parameters', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      }

      ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

      await sendGet({ url: '/api/test', data: { id: 1, type: 'test' } })

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test?id=1&type=test',
        expect.objectContaining({ method: 'GET' }),
      )
    })

    it('should handle API errors', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue({ message: 'Not Found' }),
      }

      ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

      const result = await sendGet({ url: '/api/test' })

      expect(logError).toHaveBeenCalled()
      expect(result).toEqual({
        error: { message: 'Not Found' },
        status: 404,
      })
    })
  })

  describe('sendPost', () => {
    it('should make POST request with JSON body', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1 }),
      }

      ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

      const data = { name: 'Test' }
      const result = await sendPost({ url: '/api/test', data })

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }),
      )
      expect(result).toEqual({ id: 1 })
    })
  })

  describe('sendPatch', () => {
    it('should make PATCH request', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ id: 1 }),
      }

      ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

      await sendPatch({ url: '/api/test', data: { name: 'Update' } })

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({ method: 'PATCH' }),
      )
    })
  })

  describe('sendDelete', () => {
    it('should make DELETE request', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ success: true }),
      }

      ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

      await sendDelete({ url: '/api/test', data: { id: 1 } })

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/test?id=1',
        expect.objectContaining({ method: 'DELETE' }),
      )
    })
  })
})
