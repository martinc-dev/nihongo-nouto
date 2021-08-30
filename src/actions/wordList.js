export const fetchWordListAction = payload => ({
  type: 'WORD_LIST:FETCH',
  payload,
})
export const fetchWordListActionOK = payload => ({
  type: 'WORD_LIST:FETCH:OK',
  payload,
})
export const fetchWordListActionError = payload => ({
  type: 'WORD_LIST:FETCH:ERROR',
  payload,
})
export const fetchWordListActionReset = payload => ({
  type: 'WORD_LIST:FETCH:RESET',
  payload,
})

export const addWordToWordListAction = payload => ({
  type: 'WORD_LIST:ADD',
  payload,
})

export const updateWordInWordListAction = payload => ({
  type: 'WORD_LIST:UPDATE',
  payload,
})

export const removeWordInWordListAction = payload => ({
  type: 'WORD_LIST:REMOVE',
  payload,
})
