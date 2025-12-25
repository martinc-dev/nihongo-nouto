// [true, false, true, true] -> (1101) -> 13
export const serializeBoolList = (list: boolean[]): number =>
  parseInt(
    list.reduce((m, n) => String(Number(n)) + m, ''),
    2
  )

export const deserializeBoolList = (posInt: number): boolean[] =>
  posInt
    .toString(2)
    .split('')
    .reverse()
    .map(t => t === '1')

