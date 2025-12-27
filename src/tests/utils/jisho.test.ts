import { parseVerbProp, parseAdjProp } from '../../utils/jisho'

describe('jisho utils', () => {
  describe('parseVerbProp', () => {
    it('should parse simple verb properties', () => {
      const partsOfSpeechArray = ['Verb', "Godan verb with 'u' ending", 'Transitive verb']
      const word = 'au'
      const result = parseVerbProp({ partsOfSpeechArray, word })

      expect(result.verbType).toBe('V5')
      expect(result.verbClassification).toBe('V5U')
      expect(result.verbIsTransitive).toBe(true)
      expect(result.verbIsInTransitive).toBe(false)
    })

    it('should parse ichidan verbs', () => {
      const partsOfSpeechArray = ['Ichidan verb', 'Intransitive verb']
      const word = 'taberu'
      const result = parseVerbProp({ partsOfSpeechArray, word })

      expect(result.verbType).toBe('V1')
      expect(result.verbClassification).toBe('V1')
      expect(result.verbIsTransitive).toBe(false)
      expect(result.verbIsInTransitive).toBe(true)
    })

    it('should fallback to naive guessing for Godan verbs if classification missing', () => {
      const partsOfSpeechArray = ['Godan verb'] // Missing specific ending info
      const word = 'かく' // Hiragana required for naive guessing (ends in ku)
      const result = parseVerbProp({ partsOfSpeechArray, word })

      expect(result.verbType).toBe('V5')
      // Kaku -> V5K
      expect(result.verbClassification).toBe('V5K')
    })

    it('should handle suru verbs', () => {
      const partsOfSpeechArray = ['Suru verb']
      const word = 'benkyousuru'
      const result = parseVerbProp({ partsOfSpeechArray, word })

      expect(result.verbType).toBe('IRS')
      expect(result.verbClassification).toBe('IRS')
    })

    it('should handle kuru verbs', () => {
      const partsOfSpeechArray = ['Kuru verb']
      const word = 'kuru'
      const result = parseVerbProp({ partsOfSpeechArray, word })

      expect(result.verbType).toBe('IRK')
      expect(result.verbClassification).toBe('IRK')
    })
  })

  describe('parseAdjProp', () => {
    it('should parse I-adjectives', () => {
      const partsOfSpeechArray = ['I-adjective (keiyoushi)']
      const result = parseAdjProp({ partsOfSpeechArray })

      expect(result.adjType).toBe('IADJ')
    })

    it('should parse Na-adjectives', () => {
      const partsOfSpeechArray = ['Na-adjective (keiyodoshi)']
      const result = parseAdjProp({ partsOfSpeechArray })

      expect(result.adjType).toBe('NAADJ')
    })

    it('should return null for unknown types', () => {
      const partsOfSpeechArray = ['Noun']
      const result = parseAdjProp({ partsOfSpeechArray })

      expect(result.adjType).toBeNull()
    })
  })
})
