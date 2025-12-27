import { VerbController } from '../app/controllers'
import { VerbService } from '../app/services/VerbService'
import { Request, Response } from 'express'

jest.mock('../app/services/VerbService')

describe('VerbController', () => {
  let controller: VerbController
  let mockService: jest.Mocked<VerbService>
  let req: Partial<Request>
  let res: Partial<Response>
  let json: jest.Mock
  let status: jest.Mock

  beforeEach(() => {
    controller = new VerbController()
    mockService = new VerbService() as jest.Mocked<VerbService>
    // Explicitly mock methods
    mockService.createAsync = jest.fn()
    mockService.updateAsync = jest.fn()
    mockService.queryAsync = jest.fn()

    // Use type assertion to override the service property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(controller as any).service = mockService

    json = jest.fn()
    status = jest.fn().mockReturnValue({ json })
    req = {}
    res = {
      json,
      status,
    }
  })

  describe('createOne', () => {
    it('should create verb successfully', async () => {
      req.body = { word: 'Taberu', hiragana: 'たべる', group: 'V1' }

      mockService.createAsync.mockResolvedValue({
        dataValues: { id: 1 },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)

      // BaseController createOne calls service.createAsync
      await controller.createOne(req as Request, res as Response)

      expect(mockService.createAsync).toHaveBeenCalledWith({
        fieldKV: req.body,
        editableFields: controller.editableFields,
      })
      expect(res.json).toHaveBeenCalledWith({ id: 1 })
    })

    it('should handle errors', async () => {
      req.body = {}
      mockService.createAsync.mockRejectedValue(new Error('Fail'))

      await controller.createOne(req as Request, res as Response)

      expect(status).toHaveBeenCalledWith(500)
    })
  })

  describe('updateOne', () => {
    it('should update verb successfully', async () => {
      req.params = { id: '1' }
      req.body = { word: 'Nomu' }

      mockService.updateAsync.mockResolvedValue([1])
      mockService.queryAsync.mockResolvedValue({
        count: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows: [{ dataValues: { id: 1, word: 'Nomu' } } as any],
      })

      await controller.updateOne(req as Request, res as Response)

      expect(mockService.updateAsync).toHaveBeenCalledWith({
        conditionKV: { id: '1' },
        fieldKV: req.body,
        editableFields: controller.editableFields,
      })
      expect(res.json).toHaveBeenCalledWith({ id: 1, word: 'Nomu' })
    })
  })
})
