import { NUMBERS } from 'src/constants/numbers'

/**
 * Utility class for managing localStorage operations
 */
class LocalStorageUtil {
  /**
   * Get a value from localStorage
   * @param key - The storage key
   * @returns The stored value or null if not found
   */
  static get(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading from localStorage for key "${key}":`, error)

      return null
    }
  }

  /**
   * Set a value in localStorage
   * @param key - The storage key
   * @param value - The value to store
   */
  static set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error writing to localStorage for key "${key}":`, error)
    }
  }

  /**
   * Remove a value from localStorage
   * @param key - The storage key
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error removing from localStorage for key "${key}":`, error)
    }
  }

  /**
   * Get a number from localStorage
   * @param key - The storage key
   * @param defaultValue - Default value if key doesn't exist or parsing fails
   * @returns The parsed number or defaultValue
   */
  static getNumber(key: string, defaultValue: number): number {
    const value = this.get(key)

    if (value === null) {
      return defaultValue
    }
    const parsed = parseInt(value, NUMBERS.DECIMAL_RADIX)

    return Number.isNaN(parsed) ? defaultValue : parsed
  }

  /**
   * Set a number in localStorage
   * @param key - The storage key
   * @param value - The number to store
   */
  static setNumber(key: string, value: number): void {
    this.set(key, String(value))
  }

  /**
   * Get a boolean from localStorage
   * @param key - The storage key
   * @param defaultValue - Default value if key doesn't exist
   * @returns The boolean value or defaultValue
   */
  static getBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.get(key)

    if (value === null) {
      return defaultValue
    }

    return value === 'true'
  }

  /**
   * Set a boolean in localStorage
   * @param key - The storage key
   * @param value - The boolean to store
   */
  static setBoolean(key: string, value: boolean): void {
    this.set(key, String(value))
  }

  /**
   * Get a JSON object from localStorage
   * @param key - The storage key
   * @param defaultValue - Default value if key doesn't exist or parsing fails
   * @returns The parsed object or defaultValue
   */
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

  /**
   * Set a JSON object in localStorage
   * @param key - The storage key
   * @param value - The object to store
   */
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
