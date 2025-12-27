import { NUMBERS } from 'src/constants/numbers'

class LocalStorageUtil {
  static get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading from localStorage for key "${key}":`, error)

      return null
    }
  }

  static set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error writing to localStorage for key "${key}":`, error)
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error removing from localStorage for key "${key}":`, error)
    }
  }

  static getNumber(key: string, defaultValue: number): number {
    const value = this.get(key)

    if (value === null) {
      return defaultValue
    }
    const parsed = parseInt(value, NUMBERS.DECIMAL_RADIX)

    return Number.isNaN(parsed) ? defaultValue : parsed
  }

  static setNumber(key: string, value: number): void {
    this.set(key, String(value))
  }

  static getBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.get(key)

    if (value === null) {
      return defaultValue
    }

    return value === 'true'
  }

  static setBoolean(key: string, value: boolean): void {
    this.set(key, String(value))
  }

  static getObject<T>(key: string, defaultValue: T): T {
    const value = this.get(key)

    if (value === null) {
      return defaultValue
    }
    try {
      return JSON.parse(value) as T
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error parsing JSON from localStorage for key "${key}":`, error)

      return defaultValue
    }
  }

  static setObject<T>(key: string, value: T): void {
    try {
      this.set(key, JSON.stringify(value))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error stringifying object for localStorage key "${key}":`, error)
    }
  }
}

export default LocalStorageUtil
