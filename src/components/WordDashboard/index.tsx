import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { find as findInObj } from 'lodash'

import Container from '@mui/material/Container'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'
import { fetchWordListAction } from 'src/actions/wordList'
import { setCurrentContentType } from 'src/actions/nav'
import { ResourceTypeKey } from 'src/types'
import WordList from 'src/components/WordList'
import VerbDetail from 'src/components/WordDashboard/verb/VerbDetail'
import VerbEditor from 'src/components/WordDashboard/verb/VerbEditor'
import AdjDetail from 'src/components/WordDashboard/adj/AdjDetail'
import NounDetail from 'src/components/WordDashboard/noun/NounDetail'
import OtherDetail from 'src/components/WordDashboard/other/OtherDetail'
import SplashScreen from 'src/components/WordDashboard/SplashScreen'

const WordDashboard = () => {
  const dispatch = useDispatch()
  const currentContentType = useSelector(getCurrentContentType)
  const { resourceType, wordId } = useParams<{ resourceType?: string; wordId?: string }>()
  const location = useLocation()

  // Map resourceType parameter to ResourceTypeKey
  const contentType: ResourceTypeKey | null =
    resourceType
      ? (findInObj(
          resourceTypes,
          t => t.pathName === resourceType.toLowerCase()
        )?.key as ResourceTypeKey) ?? null
      : null

  useEffect(() => {
    if (currentContentType !== contentType) {
      dispatch(setCurrentContentType(contentType))
    }
  }, [currentContentType, contentType, dispatch])

  useEffect(() => {
    if (currentContentType && currentContentType === contentType) {
      dispatch(fetchWordListAction())
    }
  }, [currentContentType, contentType, dispatch])

  // Check if we're on an edit/create route
  const isEditing = location.pathname.includes('/create') || location.pathname.includes('/edit')

  return (
    <Container maxWidth='xl'>
      {currentContentType ? (
        <>
          <WordList />
          {currentContentType === resourceTypes.VERB.key &&
            (isEditing ? <VerbEditor wordId={wordId ?? null} /> : <VerbDetail wordId={wordId ?? null} />)}
          {currentContentType === resourceTypes.ADJ.key && <AdjDetail wordId={wordId ?? null} />}
          {currentContentType === resourceTypes.NOUN.key && (
            <NounDetail wordId={wordId ?? null} />
          )}
          {currentContentType === resourceTypes.OTHER.key && (
            <OtherDetail wordId={wordId ?? null} />
          )}
        </>
      ) : (
        <SplashScreen />
      )}
    </Container>
  )
}

export default WordDashboard
