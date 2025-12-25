import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
import { RootState } from 'src/types/redux'
import { AdjWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'

const PREFIX = 'AdjDetail'

const classes = {
  wordDetail: `${PREFIX}-wordDetail`,
}

const Root = styled('div')(() => ({
  [`&.${classes.wordDetail}`]: {
    display: 'inline-block',
    position: 'relative',
    width: '70%',
    borderRadius: 3,
    verticalAlign: 'top',
  },
}))

interface AdjDetailProps {
  wordId?: string | null
}

const AdjDetail = ({ wordId }: AdjDetailProps) => {
  const dispatch = useDispatch()

  const word = useSelector((state: RootState) => getFetchWordDetailData(state)) as AdjWord | null

  useEffect(() => {
    if (wordId) {
      dispatch(fetchWordDetailAction({ id: parseInt(wordId, 10) }))
    } else {
      dispatch(fetchWordDetailActionReset())
    }
  }, [wordId, dispatch])

  if (!word) return null

  const types: string[] = [
    word.isIConjugation === true ? 'IADJ' : null,
    word.isIConjugation === false ? 'NAADJ' : null,
  ].filter((t): t is string => t !== null)

  return (
    <Root className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...word} />
    </Root>
  )
}

export default AdjDetail

