export const requestStatus = {
  INITIAL: 'INITIAL',
  PROGRESS: 'PROGRESS',
  OK: 'OK',
  ERROR: 'ERROR',
} as const

export type RequestStatus = (typeof requestStatus)[keyof typeof requestStatus]

export default requestStatus
