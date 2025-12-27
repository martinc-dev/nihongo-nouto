/* eslint-disable no-magic-numbers */
import LocalStorageUtil from '../../utils/localStorage'

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should set and get values', () => {
    LocalStorageUtil.set('testKey', 'testValue')
    expect(LocalStorageUtil.get('testKey')).toBe('testValue')
  })

  it('should remove values', () => {
    LocalStorageUtil.set('testKey', 'testValue')
    LocalStorageUtil.remove('testKey')
    expect(LocalStorageUtil.get('testKey')).toBeNull()
  })

  it('should handle numbers', () => {
    LocalStorageUtil.setNumber('numKey', 123)
    expect(LocalStorageUtil.getNumber('numKey', 0)).toBe(123)
  })

  it('should return default number if missing', () => {
    expect(LocalStorageUtil.getNumber('missing', 999)).toBe(999)
  })

  it('should handle booleans', () => {
    LocalStorageUtil.setBoolean('boolKey', true)
    expect(LocalStorageUtil.getBoolean('boolKey', false)).toBe(true)

    LocalStorageUtil.setBoolean('boolKey2', false)
    expect(LocalStorageUtil.getBoolean('boolKey2', true)).toBe(false)
  })
})
