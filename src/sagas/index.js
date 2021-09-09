import { watchFetchWordList } from 'src/sagas/wordList'
import {
  watchFetchWordDetail,
  watchSaveWordDetailAction,
  watchDeleteWordDetailAction,
} from 'src/sagas/wordDetail'
import { watchFetchWordDupe, watchFetchWordSearch } from 'src/sagas/search'

const sagas = [
  watchFetchWordList,
  watchFetchWordDetail,
  watchFetchWordDupe,
  watchFetchWordSearch,
  watchSaveWordDetailAction,
  watchDeleteWordDetailAction,
]

export default sagas
