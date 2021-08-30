import camelCase from 'camelcase-keys'
import { logError } from 'src/utils/log'

export const sendGet = async ({ url, data = {} }) => {
  try {
    const query = Object.entries(data || {})
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')

    const urlWithParam = query ? `${url}?${query}` : url

    const resp = await fetch(urlWithParam, {
      method: 'GET',
    })

    const { ok } = resp
    const body = await resp.json()

    if (!ok) throw { error: body, status: resp.status }

    return camelCase(body, { deep: true })
  } catch (error) {
    logError(error)

    if (error.status) return { error, status: error.status }

    return { error, status: null }
  }
}

export const sendPost = async ({ url, data, isRespJson = true }) => {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const { ok } = resp
    const body = isRespJson ? await resp.json() : resp.body

    if (!ok) throw { error: body, status: resp.status }

    return isRespJson ? camelCase(body, { deep: true }) : body
  } catch (error) {
    logError(error)

    if (error.status) return { error, status: error.status }

    return { error, status: null }
  }
}

export const sendPatch = async ({ url, data, isRespJson = true }) => {
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const { ok } = resp
    const body = isRespJson ? await resp.json() : resp.body

    if (!ok) throw { error: body, status: resp.status }

    return isRespJson ? camelCase(body, { deep: true }) : body
  } catch (error) {
    logError(error)

    if (error.status) return { error, status: error.status }

    return { error, status: null }
  }
}

export const sendDelete = async ({ url, data = {} }) => {
  try {
    const query = Object.entries(data || {})
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')

    const urlWithParam = query ? `${url}?${query}` : url

    const resp = await fetch(urlWithParam, {
      method: 'DELETE',
    })

    const { ok } = resp
    const body = await resp.json()

    if (!ok) throw { error: body, status: resp.status }

    return camelCase(body, { deep: true })
  } catch (error) {
    logError(error)

    if (error.status) return { error, status: error.status }

    return { error, status: null }
  }
}
