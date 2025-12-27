import { NounController } from '../app/controllers'
import { NounService } from '../app/services/NounService'
import { Request, Response } from 'express'

jest.mock('../../app/services/NounService')

describe('NounController', () => {
  let controller: NounController
  let mockService: jest.Mocked<NounService>
  let req: Partial<Request>
  let res: Partial<Response>
  let json: jest.Mock
  let status: jest.Mock

  beforeEach(() => {
    controller = new NounController()
    mockService = new NounService() as jest.Mocked<NounService>
    // Explicitly mock methods
    mockService.insertNoun = jest.fn()
    mockService.updateNoun = jest.fn()
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
    it('should call insertNoun', async () => {
      req.body = { word: 'Cat', hiragana: 'Neko' }
      mockService.insertNoun.mockResolvedValue({
        dataValues: { id: 1 },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
      mockService.queryAsync.mockResolvedValue({
        count: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows: [{ dataValues: { id: 1, word: 'Cat' } } as any],
      })

      await controller.createOne(req as Request, res as Response)

      expect(mockService.insertNoun).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith({ id: 1, word: 'Cat' })
    })

    it('should handle errors', async () => {
      req.body = {}
      mockService.insertNoun.mockRejectedValue(new Error('Fail'))

      await controller.createOne(req as Request, res as Response)

      expect(status).toHaveBeenCalledWith(500)
    })
  })

  describe('updateOne', () => {
    it('should call updateNoun', async () => {
      req.params = { id: '1' }
      req.body = { word: 'Dog' }
      mockService.updateNoun.mockResolvedValue({
        count: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows: [{ dataValues: { id: 1, word: 'Dog' } } as any],
      })

      await controller.updateOne(req as Request, res as Response)

      expect(mockService.updateNoun).toHaveBeenCalledWith({
        id: 1,
        ...req.body,
      })
      expect(res.json).toHaveBeenCalledWith({ id: 1, word: 'Dog' })
    })
  })
})
