import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

const WordDashboard = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentContentType = useSelector(getCurrentContentType)

  const { pathname } = location
  const contentType =
    findInObj(resourceTypes, t => t.pathName === pathname.replace('/', '').toLowerCase())
      ?.key ?? null

  useEffect(() => {
    if (currentContentType !== contentType) {
      dispatch(setCurrentContentType(contentType))
    }
  }, [pathname])

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
          <WordDetail />
        </>
      ) : (
        <SplashScreen />
      )}
    </Container>
  )
}

export default WordDashboard
