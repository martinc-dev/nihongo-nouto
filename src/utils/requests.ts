import camelCase from 'camelcase-keys'
import { logError } from 'src/utils/log'
import { ApiResponse, ApiError } from 'src/types/words'

interface RequestOptions {
  url: string
  data?: Record<string, string | number | boolean>
  isRespJson?: boolean
}

interface RequestError {
  error: unknown
  status?: number
}

export const sendGet = async <T = unknown>({
  url,
  data = {},
}: RequestOptions): Promise<ApiResponse<T>> => {
  try {
    const query = Object.entries(data || {})
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    const urlWithParam = query ? `${url}?${query}` : url

    const resp = await fetch(urlWithParam, {
      method: 'GET',
    })

    const { ok } = resp
    const body = await resp.json()

    if (!ok) {
      const error: RequestError = { error: body, status: resp.status }

      throw error
    }

    return camelCase(body, {
      deep: true,
      preserveConsecutiveUppercase: true,
    }) as ApiResponse<T>
  } catch (error) {
    logError(error)

    const requestError = error as RequestError

    if (requestError.status) {
      return { error: requestError.error as ApiError, status: requestError.status }
    }

    return { error: error as ApiError, status: null }
  }
}

export const sendPost = async <T = unknown>({
  url,
  data,
  isRespJson = true,
}: RequestOptions): Promise<ApiResponse<T>> => {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const { ok } = resp
    const body = isRespJson ? await resp.json() : resp.body

    if (!ok) {
      const error: RequestError = { error: body, status: resp.status }

      throw error
    }

    return isRespJson
      ? (camelCase(body, {
          deep: true,
          preserveConsecutiveUppercase: true,
        }) as ApiResponse<T>)
      : (body as ApiResponse<T>)
  } catch (error) {
    logError(error)

    const requestError = error as RequestError

    if (requestError.status) {
      return { error: requestError.error as ApiError, status: requestError.status }
    }

    return { error: error as ApiError, status: null }
  }
}

export const sendPatch = async <T = unknown>({
  url,
  data,
  isRespJson = true,
}: RequestOptions): Promise<ApiResponse<T>> => {
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const { ok } = resp
    const body = isRespJson ? await resp.json() : resp.body

    if (!ok) {
      const error: RequestError = { error: body, status: resp.status }

      throw error
    }

    return isRespJson
      ? (camelCase(body, {
          deep: true,
          preserveConsecutiveUppercase: true,
        }) as ApiResponse<T>)
      : (body as ApiResponse<T>)
  } catch (error) {
    logError(error)

    const requestError = error as RequestError

    if (requestError.status) {
      return { error: requestError.error as ApiError, status: requestError.status }
    }

    return { error: error as ApiError, status: null }
  }
}

export const sendDelete = async <T = unknown>({
  url,
  data = {},
}: RequestOptions): Promise<ApiResponse<T>> => {
  try {
    const query = Object.entries(data || {})
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    const urlWithParam = query ? `${url}?${query}` : url

    const resp = await fetch(urlWithParam, {
      method: 'DELETE',
    })

    const { ok } = resp
    const body = await resp.json()

    if (!ok) {
      const error: RequestError = { error: body, status: resp.status }

      throw error
    }

    return camelCase(body, {
      deep: true,
      preserveConsecutiveUppercase: true,
    }) as ApiResponse<T>
  } catch (error) {
    logError(error)

    const requestError = error as RequestError

    if (requestError.status) {
      return { error: requestError.error as ApiError, status: requestError.status }
    }

    return { error: error as ApiError, status: null }
  }
}
