import resourceTypes from 'src/constants/resourceTypes'
import { ResourceTypeKey } from 'src/types'

interface GetWordsUrlParams {
  typeKey: ResourceTypeKey
}

interface GetWordUrlParams {
  typeKey: ResourceTypeKey
  id: string | number
}

interface GetWordDupeSearchUrlParams {
  typeKey: ResourceTypeKey
}

const endpoints = {
  getWordsUrl: ({ typeKey }: GetWordsUrlParams): string =>
    `/api/${resourceTypes[typeKey].path}`,
  getWordUrl: ({ typeKey, id }: GetWordUrlParams): string =>
    `/api/${resourceTypes[typeKey].path}/${id}`,
  getWordDupeSearchUrl: ({ typeKey }: GetWordDupeSearchUrlParams): string =>
    `/api/${resourceTypes[typeKey].path}/search`,
  getJishoSearchUrl: (keyword: string): string => `/api/jisho/${keyword}`,
}

export default endpoints
