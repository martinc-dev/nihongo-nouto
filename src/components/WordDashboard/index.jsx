import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { find as findInObj } from 'lodash'

import Container from '@material-ui/core/Container'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'
import { setCurrentContentType } from 'src/actions/nav'
import WordList from 'src/components/WordDashboard/WordList'
import WordDetail from 'src/components/WordDashboard/WordDetail'

const WordDashboard = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentContentType = useSelector(getCurrentContentType)

  const { pathname } = location

  useEffect(() => {
    const contentType =
      findInObj(resourceTypes, t => t.pathName === pathname.replace('/', ''))
        ?.contentType ?? null

    if (currentContentType !== contentType) {
      dispatch(setCurrentContentType(contentType))
    }
  }, [pathname])

  return (
    <Container maxWidth='xl'>
      <WordList />
      <WordDetail />
    </Container>
  )
}

export default WordDashboard
