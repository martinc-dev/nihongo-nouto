export const fetchWordDupeAction = payload => ({
  type: 'WORD_DUPE:FETCH',
  payload
})
export const fetchWordDupeActionOK = payload => ({
  type: 'WORD_DUPE:FETCH:OK',
  payload
})
export const fetchWordDupeActionError = payload => ({
  type: 'WORD_DUPE:FETCH:ERROR',
  payload
})
export const fetchWordDupeActionReset = payload => ({
  type: 'WORD_DUPE:FETCH:RESET',
  payload
})

export const fetchWordSearchAction = payload => ({
  type: 'WORD_SEARCH:FETCH',
  payload
})
export const fetchWordSearchActionOK = payload => ({
  type: 'WORD_SEARCH:FETCH:OK',
  payload
})
export const fetchWordSearchActionError = payload => ({
  type: 'WORD_SEARCH:FETCH:ERROR',
  payload
})
export const fetchWordSearchActionReset = payload => ({
  type: 'WORD_SEARCH:FETCH:RESET',
  payload
})
