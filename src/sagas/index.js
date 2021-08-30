import { watchFetchWordList } from 'src/sagas/wordList'
import { watchFetchWordDetail } from 'src/sagas/wordDetail'
import { watchFetchWordDupe, watchFetchWordSearch } from 'src/sagas/search'

const sagas = [
  watchFetchWordList,
  watchFetchWordDetail,
  watchFetchWordDupe,
  watchFetchWordSearch,
]

export default sagas
