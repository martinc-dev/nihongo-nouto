import { BaseController } from '../app/controllers/BaseController'
import { BaseService } from '../app/services/BaseService'
import { Request, Response } from 'express'
// Mock service
class MockService extends BaseService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model = {} as any
}

// Concrete implementation
class TestController extends BaseController {
  service = new MockService()
}

describe('BaseController', () => {
  let controller: TestController
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockService: any
  let req: Partial<Request>
  let res: Partial<Response>
  let json: jest.Mock
  let status: jest.Mock

  beforeEach(() => {
    controller = new TestController()
    mockService = new MockService()
    controller.service = mockService

    // Mock service methods
    mockService.queryAsync = jest.fn()
    mockService.createAsync = jest.fn()
    mockService.updateAsync = jest.fn()
    mockService.removeAsync = jest.fn()

    json = jest.fn()
    status = jest.fn().mockReturnValue({ json })
    req = {}
    res = {
      json,
      status,
    }
  })

  describe('getOne', () => {
    it('should return one record', async () => {
      req.params = { id: '1' }
      mockService.queryAsync.mockResolvedValue({
        count: 1,
        rows: [{ dataValues: { id: 1, name: 'Test' } }],
      })

      await controller.getOne(req as Request, res as Response)

      expect(mockService.queryAsync).toHaveBeenCalledWith({
        conditionKV: { id: '1' },
        options: undefined,
      })
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test' })
    })

    it('should handle not found', async () => {
      req.params = { id: '1' }
      mockService.queryAsync.mockResolvedValue({ count: 0, rows: [] })

      await controller.getOne(req as Request, res as Response)

      expect(status).toHaveBeenCalledWith(404)
      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'No record found' }),
      )
    })
  })

  describe('getMultiple', () => {
    it('should return paginated results', async () => {
      req.query = { page: '1', limit: '10' }
      mockService.queryAsync.mockResolvedValue({
        count: 2,
        rows: [{ dataValues: { id: 1 } }, { dataValues: { id: 2 } }],
      })

      await controller.getMultiple(req as Request, res as Response)

      expect(mockService.queryAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          limit: 10,
        }),
      )
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          data: [{ id: 1 }, { id: 2 }],
          pagination: expect.objectContaining({ total: 2 }),
        }),
      )
    })
  })

  describe('deleteOne', () => {
    it('should delete record', async () => {
      req.params = { id: '1' }
      mockService.removeAsync.mockResolvedValue(1)

      await controller.deleteOne(req as Request, res as Response)

      expect(mockService.removeAsync).toHaveBeenCalledWith({
        conditionKV: { id: '1' },
      })
      expect(res.json).toHaveBeenCalledWith('OK')
    })
  })
})
