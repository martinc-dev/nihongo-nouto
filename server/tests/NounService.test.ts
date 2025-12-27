import { NounService } from '../app/services/NounService'
import { NounTagService } from '../app/services/NounTagService'
import { NounTagRelService } from '../app/services/NounTagRelService'
import { InternalServiceError } from '../app/constants/exceptions'

// Mock dependencies
jest.mock('../app/services/NounTagService')
jest.mock('../app/services/NounTagRelService')

describe('NounService', () => {
  let nounService: NounService
  let mockCreateAsync: jest.Mock
  let mockQueryAsync: jest.Mock
  let mockUpdateAsync: jest.Mock
  let mockRemoveAsync: jest.Mock

  beforeEach(() => {
    nounService = new NounService()

    // Mock BaseService methods
    mockCreateAsync = jest.fn()
    mockQueryAsync = jest.fn()
    mockUpdateAsync = jest.fn()
    mockRemoveAsync = jest.fn()

    nounService.createAsync = mockCreateAsync
    nounService.queryAsync = mockQueryAsync
    nounService.updateAsync = mockUpdateAsync
    nounService.removeAsync = mockRemoveAsync

    // Clear static mocks
    ;(NounTagService as jest.Mock).mockClear()
    ;(NounTagRelService as jest.Mock).mockClear()
  })

  describe('insertNoun', () => {
    it('should create a noun and associated tags', async () => {
      const params = {
        word: 'Cat',
        hiragana: 'Neko',
        sense: 'Animal',
        tagIds: [1, 2],
      }

      // Mock createAsync response for Noun
      mockCreateAsync.mockResolvedValue({
        dataValues: { id: 123, ...params },
      })

      // Mock NounTagService to return valid tags
      const mockNounTagQuery = jest.fn().mockResolvedValue({
        rows: [{ dataValues: { id: 1 } }, { dataValues: { id: 2 } }],
      })

      // eslint-disable-next-line max-nested-callbacks
      ;(NounTagService as jest.Mock).mockImplementation(() => ({
        queryAsync: mockNounTagQuery,
      }))

      // Mock NounTagRelService
      const mockNounTagRelCreate = jest.fn().mockResolvedValue({})

      // eslint-disable-next-line max-nested-callbacks
      ;(NounTagRelService as jest.Mock).mockImplementation(() => ({
        createAsync: mockNounTagRelCreate,
      }))

      const result = await nounService.insertNoun(params)

      expect(mockCreateAsync).toHaveBeenCalledWith({
        fieldKV: {
          word: params.word,
          hiragana: params.hiragana,
          sense: params.sense,
        },
      })
      expect(mockNounTagRelCreate).toHaveBeenCalledTimes(2)
      expect(result).toBeDefined()
    })

    it('should throw error if creation fails', async () => {
      mockCreateAsync.mockResolvedValue(null)

      await expect(
        nounService.insertNoun({ word: 'Test', hiragana: 'Test', sense: 'Test' }),
      ).rejects.toThrow(InternalServiceError)
    })
  })

  describe('updateNoun', () => {
    it('should update noun and sync tags', async () => {
      const params = {
        id: 123,
        word: 'Dog',
        hiragana: 'Inu',
        sense: 'Animal',
        tagIds: [2, 3], // Existing was [1, 2], so delete 1, keep 2, add 3
      }

      // Mock existing record
      mockQueryAsync.mockResolvedValue({
        rows: [
          {
            dataValues: {
              id: 123,
              nounTagRel: [{ dataValues: { tagId: 1 } }, { dataValues: { tagId: 2 } }],
            },
          },
        ],
        count: 1,
      })

      const mockNounTagRelCreate = jest.fn()
      const mockNounTagRelRemove = jest.fn()

      // eslint-disable-next-line max-nested-callbacks
      ;(NounTagRelService as jest.Mock).mockImplementation(() => ({
        createAsync: mockNounTagRelCreate,
        removeAsync: mockNounTagRelRemove,
      }))

      await nounService.updateNoun(params)

      expect(mockNounTagRelRemove).toHaveBeenCalledWith({
        conditionKV: { nounId: 123, tagId: 1 },
      })
      expect(mockNounTagRelCreate).toHaveBeenCalledWith({
        fieldKV: { nounId: 123, tagId: 3 },
      })
      expect(mockUpdateAsync).toHaveBeenCalled()
    })
  })
})
