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
    `${process.env.REACT_APP_API_HOST || ''}/api/${resourceTypes[typeKey].path}`,
  getWordUrl: ({ typeKey, id }: GetWordUrlParams): string =>
    `${process.env.REACT_APP_API_HOST || ''}/api/${resourceTypes[typeKey].path}/${id}`,
  getWordDupeSearchUrl: ({ typeKey }: GetWordDupeSearchUrlParams): string =>
    `${process.env.REACT_APP_API_HOST || ''}/api/${resourceTypes[typeKey].path}/search`,
  getJishoSearchUrl: (keyword: string): string =>
    `${process.env.REACT_APP_API_HOST || ''}/api/jisho/${keyword}`,
}


export default endpoints
