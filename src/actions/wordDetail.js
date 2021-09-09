export const fetchWordDetailAction = payload => ({
  type: 'WORD_DETAIL:FETCH',
  payload,
})
export const fetchWordDetailActionOK = payload => ({
  type: 'WORD_DETAIL:FETCH:OK',
  payload,
})
export const fetchWordDetailActionError = payload => ({
  type: 'WORD_DETAIL:FETCH:ERROR',
  payload,
})
export const fetchWordDetailActionReset = () => ({
  type: 'WORD_DETAIL:FETCH:RESET',
})

export const saveWordDetailAction = payload => ({
  type: 'WORD_DETAIL:SAVE',
  payload,
})
export const saveWordDetailActionOK = payload => ({
  type: 'WORD_DETAIL:SAVE:OK',
  payload,
})
export const saveWordDetailActionError = payload => ({
  type: 'WORD_DETAIL:SAVE:ERROR',
  payload,
})
export const saveWordDetailActionReset = () => ({
  type: 'WORD_DETAIL:SAVE:RESET',
})

export const deleteWordDetailAction = payload => ({
  type: 'WORD_DETAIL:DELETE',
  payload,
})
export const deleteWordDetailActionOK = () => ({
  type: 'WORD_DETAIL:DELETE:OK',
})
export const deleteWordDetailActionError = payload => ({
  type: 'WORD_DETAIL:DELETE:ERROR',
  payload,
})
export const deleteWordDetailActionReset = () => ({
  type: 'WORD_DETAIL:DELETE:RESET',
})
