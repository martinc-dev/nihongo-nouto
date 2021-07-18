export const fetchWordDetailAction = payload => ({
  type: 'WORD_DETAIL:FETCH',
  payload
})
export const fetchWordDetailActionOK = payload => ({
  type: 'WORD_DETAIL:FETCH:OK',
  payload
})
export const fetchWordDetailActionError = payload => ({
  type: 'WORD_DETAIL:FETCH:ERROR',
  payload
})
export const fetchWordDetailActionReset = payload => ({
  type: 'WORD_DETAIL:FETCH:RESET',
  payload
})
