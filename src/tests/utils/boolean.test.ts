import { serializeBoolList, deserializeBoolList } from '../../utils/boolean'

describe('boolean utils', () => {
  describe('serializeBoolList', () => {
    it('should serialize boolean array to integer', () => {
      // 1 (true) -> 1
      expect(serializeBoolList([true])).toBe(1)
      // 10 (false, true) -> 2 ?? wait, let's check implementation
      // List.reduce((m, n) => String(Number(n)) + m, '')
      // [true, false] -> n=true(1), m='' -> '1'
      //               -> n=false(0), m='1' -> '01' => parseInt('01', 2) = 1

      // Let's re-read implementation:
      // Reduce((m, n) => String(Number(n)) + m, '') reverses the string construction?
      // N + m means current + accum.
      // [t, f] -> '1' + '' = '1' -> '0' + '1' = '01'. Binary 01 is 1.

      // [f, t] -> '0' + '' = '0' -> '1' + '0' = '10'. Binary 10 is 2.
      expect(serializeBoolList([false, true])).toBe(2)

      // [t, t, t] -> '111' -> 7
      expect(serializeBoolList([true, true, true])).toBe(7)
    })
  })

  describe('deserializeBoolList', () => {
    it('should deserialize integer to boolean array', () => {
      // 1 -> '1' -> ['1'] -> reverse ['1'] -> [true]
      expect(deserializeBoolList(1)).toEqual([true])

      // 2 -> '10' -> ['1', '0'] -> reverse ['0', '1'] -> [false, true]
      expect(deserializeBoolList(2)).toEqual([false, true])

      // 7 -> '111' -> [true, true, true]
      expect(deserializeBoolList(7)).toEqual([true, true, true])
    })
  })
})
