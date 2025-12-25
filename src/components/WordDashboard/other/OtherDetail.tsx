import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
import { RootState } from 'src/types/redux'
import { OtherWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'

const PREFIX = 'OtherDetail'

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

interface OtherDetailProps {
  wordId?: string | null
}

const OtherDetail = ({ wordId }: OtherDetailProps) => {
  const dispatch = useDispatch()

  const word = useSelector((state: RootState) => getFetchWordDetailData(state)) as OtherWord | null

  useEffect(() => {
    if (wordId) {
      dispatch(fetchWordDetailAction({ id: parseInt(wordId, 10) }))
    } else {
      dispatch(fetchWordDetailActionReset())
    }
  }, [wordId, dispatch])

  if (!word) return null

  const types: string[] = [
    'group' in word ? word.group : null,
    'isTransitive' in word && word.isTransitive === true ? 'TRANSITIVE' : null,
    'isIntransitive' in word && word.isIntransitive === true ? 'INTRANSITIVE' : null,
    'isIConjugation' in word && word.isIConjugation === true ? 'IADJ' : null,
    'isIConjugation' in word && word.isIConjugation === false ? 'NAADJ' : null,
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

export default OtherDetail

