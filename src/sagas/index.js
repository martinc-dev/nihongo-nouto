import { watchFetchWordList } from 'src/sagas/wordList'
import { watchFetchWordDetail } from 'src/sagas/wordDetail'
import { watchFetchWordDupe } from 'src/sagas/search'

const sagas = [watchFetchWordList, watchFetchWordDetail, watchFetchWordDupe]

export default sagas
