/* eslint-disable max-nested-callbacks */
import conjugation, { getConjugationFormsFromSense } from '../../utils/conjugation'

describe('conjugation utils', () => {
  describe('conjugation', () => {
    it('should conjugate Godan verb (u-ending)', () => {
      const result = conjugation('あう', 'V5U')

      expect(result['polite affirmative']).toBe('あいます')
      expect(result['plain negative']).toBe('あわない')
      expect(result['te form']).toBe('あって')
    })

    it('should conjugate Ichidan verb', () => {
      const result = conjugation('たべる', 'V1')

      expect(result['polite affirmative']).toBe('たべます')
      expect(result['plain negative']).toBe('たべない')
      expect(result['te form']).toBe('たべて')
    })

    it('should conjugate Irregular Suru', () => {
      const result = conjugation('べんきょうする', 'IRS')

      expect(result['polite affirmative']).toBe('べんきょうします')
      expect(result['plain negative']).toBe('べんきょうしない')
      expect(result['te form']).toBe('べんきょうして')
    })

    it('should conjugate Irregular Kuru', () => {
      const result = conjugation('くる', 'IRK')

      expect(result['polite affirmative']).toBe('きます')
      expect(result['plain negative']).toBe('こない')
      expect(result['te form']).toBe('きて')
    })

    it('should throw error if parameters are missing', () => {
      expect(() => conjugation('', 'V1')).toThrow('Missing param')
      expect(() => conjugation('taberu', '')).toThrow('Missing param')
    })
  })

  describe('getConjugationFormsFromSense', () => {
    it('should return null if word or partsOfSpeech are missing', () => {
      expect(getConjugationFormsFromSense('', ['Verb'])).toBeNull()
      expect(getConjugationFormsFromSense('taberu', [])).toBeNull()
    })

    it('should correctly identify and conjugate Godan verb', () => {
      const result = getConjugationFormsFromSense('あう', ['Godan verb with u ending'])

      expect(result).not.toBeNull()
      expect(result?.stem).toBe('あい')
      expect(result?.aDan).toBe('あわ')
      expect(result?.eDan).toBe('あえ')
      expect(result?.oDan).toBe('あお')
      expect(result?.teForm).toBe('あって')
    })

    it('should correctly identify and conjugate Ichidan verb', () => {
      const result = getConjugationFormsFromSense('たべる', ['Ichidan verb'])

      expect(result).not.toBeNull()
      expect(result?.stem).toBe('たべ')
      expect(result?.aDan).toBe('たべ')
      expect(result?.eDan).toBe('たべ')
      expect(result?.oDan).toBe('たべ')
      expect(result?.teForm).toBe('たべて')
    })

    it('should fallback to guessing if specific type not found but is V5', () => {
      // 'nomu' ends in 'mu', so it guesses V5M
      const result = getConjugationFormsFromSense('のむ', ['Verb', 'Godan verb'])

      expect(result).not.toBeNull()
      expect(result?.stem).toBe('のみ')
    })

    it('should return null if verb type cannot be determined', () => {
      // Unknown POS and unknown ending logic (though most endings are covered)
      const result = getConjugationFormsFromSense('xyz', ['Unknown'])

      // Depending on implementation, might return null or guess.
      // Based on code: findVerbTypeFromPartsOfSpeech -> guessVerbTypeFromWord ('z' ending returns null)
      expect(result).toBeNull()
    })
  })
})
