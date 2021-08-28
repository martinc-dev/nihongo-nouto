import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { find as findInObj } from 'lodash'

import Container from '@material-ui/core/Container'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'
import { fetchWordListAction } from 'src/actions/wordList'
import { setCurrentContentType } from 'src/actions/nav'
import WordList from 'src/components/WordList'
import WordDetail from 'src/components/WordDashboard/WordDetail'
import SplashScreen from 'src/components/WordDashboard/SplashScreen'

const WordDashboard = ({ match }) => {
  const dispatch = useDispatch()
  const currentContentType = useSelector(getCurrentContentType)

  const { path } = match
  const contentType =
    findInObj(
      resourceTypes,
      t => t.pathName === path.replace('/', '').replace('/:wordId', '').toLowerCase()
    )?.key ?? null

  useEffect(() => {
    if (currentContentType !== contentType) {
      dispatch(setCurrentContentType(contentType))
    }
  }, [path])

  useEffect(() => {
    if (currentContentType && currentContentType === contentType) {
      dispatch(fetchWordListAction())
    }
  }, [currentContentType])

  return (
    <Container maxWidth='xl'>
      {currentContentType ? (
        <>
          <WordList />
          <WordDetail wordId={match.params?.wordId ?? null} />
        </>
      ) : (
        <SplashScreen />
      )}
    </Container>
  )
}

WordDashboard.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      wordId: PropTypes.string
    })
  }).isRequired
}

export default WordDashboard
