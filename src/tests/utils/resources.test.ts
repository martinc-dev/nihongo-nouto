/* eslint-disable max-nested-callbacks */
import { getWordGroupIconMatch, nounTags } from '../../constants/resources'

describe('resources utils', () => {
  describe('getWordGroupIconMatch', () => {
    it('should return correct match for V5 verbs', () => {
      expect(getWordGroupIconMatch('V5U')).toEqual({
        text: '5',
        colorName: 'sakuraPink',
        value: 'GoDan',
        filterKey: 'GoDan',
      })
    })

    it('should return correct match for V1 verbs', () => {
      expect(getWordGroupIconMatch('V1')).toEqual({
        text: '1',
        colorName: 'kooriBlue',
        value: 'Ichidan',
        filterKey: 'IchiDan',
      })
    })

    it('should return correct match for Irregular verbs', () => {
      expect(getWordGroupIconMatch('IRS')).toEqual({
        text: 'Su',
        colorName: 'kujakuishiGreen',
        value: 'Irregular Suru',
        filterKey: 'SuRu',
      })
    })

    it('should return correct match for Transitivity', () => {
      expect(getWordGroupIconMatch('TRANSITIVE')).toEqual({
        text: 'T',
        colorName: 'mikanOrange',
        value: 'Transitive',
      })
    })

    it('should return correct match for Adjectives', () => {
      expect(getWordGroupIconMatch('IADJ')).toEqual({
        text: 'I',
        colorName: 'sakuraPink',
        value: 'I-adjective',
        filterKey: 'I-Adj',
      })
    })

    it('should return correct match for all Noun tags', () => {
      Object.values(nounTags).forEach(tag => {
        expect(getWordGroupIconMatch(tag.name)).toEqual({
          text: expect.any(String),
          colorName: tag.color,
          value: tag.value,
          filterKey: tag.value,
        })
      })
    })

    it('should return correct match for other cases', () => {
      // Missing cases from coverage report
      const cases = [
        { type: 'V5K', text: '5' },
        { type: 'V5G', text: '5' },
        { type: 'V5S', text: '5' },
        { type: 'V5T', text: '5' },
        { type: 'V5M', text: '5' },
        { type: 'V5B', text: '5' },
        { type: 'V5N', text: '5' },
        { type: 'V5R', text: '5' },
        { type: 'V5KS', text: '5k' },
        { type: 'IRK', text: 'Ku' },
        { type: 'INTRANSITIVE', text: 'It' },
        { type: 'NAADJ', text: 'Na' },
      ]

      cases.forEach(({ type, text }) => {
        expect(getWordGroupIconMatch(type)?.text).toBe(text)
      })
    })

    it('should return null for unknown type', () => {
      expect(getWordGroupIconMatch('UNKNOWN')).toBeNull()
    })
  })
})
