import { VerbService } from '../app/services/VerbService'
import { Verb } from '../app/models'

describe('VerbService', () => {
  it('should instantiate with correct model', () => {
    const service = new VerbService()

    expect(service.model).toBe(Verb)
  })
})
