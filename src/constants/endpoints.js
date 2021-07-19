import resourceTypes from 'src/constants/resourceTypes'

const endpoints = {
  getWordsUrl: ({ typeKey }) => `${process.env.REACT_APP_API_HOST || ''}/api/${resourceTypes[typeKey].path}`,
  getWordUrl: ({ typeKey, id }) => `${process.env.REACT_APP_API_HOST || ''}/api/${resourceTypes[typeKey].path}/${id}`
}

export default endpoints
