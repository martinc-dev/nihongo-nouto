/* eslint-disable @typescript-eslint/no-explicit-any */
import navReducer from '../../reducers/nav'
import { getCurrentContentType } from '../../selectors/nav'
import { NAV_ACTION_TYPES } from '../../types/redux'

describe('nav reducer', () => {
  it('should return initial state', () => {
    expect(navReducer(undefined, { type: 'unknown' })).toEqual({
      currentContentType: null,
    })
  })

  it('should handle SET_CURRENT_CONTENT_TYPE', () => {
    const action = {
      type: NAV_ACTION_TYPES.SET_CURRENT_CONTENT_TYPE,
      payload: 'VERB',
    }
    const expectedState = {
      currentContentType: 'VERB',
    }

    expect(navReducer(undefined, action)).toEqual(expectedState)
  })
})

describe('nav selectors', () => {
  it('should select current content type', () => {
    const state = {
      nav: {
        currentContentType: 'NOUN',
      },
    } as unknown as { nav: { currentContentType: string } }

    expect(getCurrentContentType(state as any)).toBe('NOUN')
  })

  it('should return null if nav state is missing', () => {
    const state = {} as unknown

    expect(getCurrentContentType(state as any)).toBeNull()
  })
})
