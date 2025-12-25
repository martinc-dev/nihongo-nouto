import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
import { RootState } from 'src/types/redux'
import { VerbWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import VerbMainFormRow from 'src/components/WordDashboard/verb/VerbMainFormRow'
import VerbConjFormRow from 'src/components/WordDashboard/verb/VerbConjFormRow'
import VerbConjFormAdditional from 'src/components/WordDashboard/verb/VerbConjFormAdditional'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'

const PREFIX = 'VerbDetail'

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

interface VerbDetailProps {
  wordId?: string | null
}

const VerbDetail = ({ wordId }: VerbDetailProps) => {
  const dispatch = useDispatch()

  const word = useSelector((state: RootState) => getFetchWordDetailData(state)) as VerbWord | null

  useEffect(() => {
    if (wordId) {
      dispatch(fetchWordDetailAction({ id: parseInt(wordId, 10) }))
    } else {
      dispatch(fetchWordDetailActionReset())
    }
  }, [wordId, dispatch])

  if (!word) return null

  const types: string[] = [
    word.group,
    word.isTransitive === true ? 'TRANSITIVE' : null,
    word.isIntransitive === true ? 'INTRANSITIVE' : null,
  ].filter((t): t is string => t !== null)

  return (
    <Root className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      {word.conjugation && <VerbMainFormRow conjugation={word.conjugation} />}
      <WordTypeDisplay types={types} />
      {word.conjugation && <VerbConjFormRow group={word.group} word={word.word} conjugation={word.conjugation} />}
      <WordSense {...word} />
      {word.conjugation && <VerbConjFormAdditional conjugation={word.conjugation} />}
    </Root>
  )
}

export default VerbDetail

