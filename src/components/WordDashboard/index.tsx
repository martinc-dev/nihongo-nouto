import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { find as findInObj } from 'lodash'

import Container from '@mui/material/Container'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'
import { setCurrentContentType } from 'src/actions/nav'
import { ResourceTypeKey } from 'src/types'
import { useWordList } from 'src/hooks/useWordList'
import WordList from 'src/components/WordList'
import VerbDetail from 'src/components/WordDashboard/verb/VerbDetail'
import VerbEditor from 'src/components/WordDashboard/verb/VerbEditor'
import AdjDetail from 'src/components/WordDashboard/adj/AdjDetail'
import AdjEditor from 'src/components/WordDashboard/adj/AdjEditor'
import NounDetail from 'src/components/WordDashboard/noun/NounDetail'
import NounEditor from 'src/components/WordDashboard/noun/NounEditor'
import OtherDetail from 'src/components/WordDashboard/other/OtherDetail'
import OtherEditor from 'src/components/WordDashboard/other/OtherEditor'
import SplashScreen from 'src/components/WordDashboard/SplashScreen'

const WordDashboard = () => {
  const dispatch = useDispatch()
  const currentContentType = useSelector(getCurrentContentType)
  const { resourceType, wordId } = useParams<{ resourceType?: string; wordId?: string }>()
  const location = useLocation()

  const contentType: ResourceTypeKey | null = resourceType
    ? ((findInObj(resourceTypes, t => t.pathName === resourceType.toLowerCase())
        ?.key as ResourceTypeKey) ?? null)
    : null

  // Trigger word list fetch when content type changes (React Query handles caching)
  useWordList()

  useEffect(() => {
    if (currentContentType !== contentType) {
      dispatch(setCurrentContentType(contentType))
    }
  }, [currentContentType, contentType, dispatch])

  const isEditing =
    location.pathname.includes('/create') || location.pathname.includes('/edit')

  return (
    <Container maxWidth={false}>
      {currentContentType ? (
        <>
          <WordList />
          {currentContentType === resourceTypes.VERB.key &&
            (isEditing ? (
              <VerbEditor wordId={wordId ?? null} />
            ) : (
              <VerbDetail wordId={wordId ?? null} />
            ))}
          {currentContentType === resourceTypes.ADJ.key &&
            (isEditing ? (
              <AdjEditor wordId={wordId ?? null} />
            ) : (
              <AdjDetail wordId={wordId ?? null} />
            ))}
          {currentContentType === resourceTypes.NOUN.key &&
            (isEditing ? (
              <NounEditor wordId={wordId ?? null} />
            ) : (
              <NounDetail wordId={wordId ?? null} />
            ))}
          {currentContentType === resourceTypes.OTHER.key &&
            (isEditing ? (
              <OtherEditor wordId={wordId ?? null} />
            ) : (
              <OtherDetail wordId={wordId ?? null} />
            ))}
        </>
      ) : (
        <SplashScreen />
      )}
    </Container>
  )
}

export default WordDashboard
