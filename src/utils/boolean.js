// [true, false, true, true] -> (1101) -> 13
export const serializeBoolList = list =>
  parseInt(
    list.reduce((m, n) => 0 + n + m, ''),
    2
  )

export const deserializeBoolList = posInt =>
  posInt
    .toString(2)
    .split('')
    .reverse()
    .map(t => t === '1')
