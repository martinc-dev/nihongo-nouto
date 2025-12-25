import { styled } from '@mui/material/styles'

import { useWordDetail } from 'src/hooks/useWordDetail'
import { VerbWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import VerbMainFormRow from 'src/components/WordDashboard/verb/VerbMainFormRow'
import VerbConjFormRow from 'src/components/WordDashboard/verb/VerbConjFormRow'
import VerbConjFormAdditional from 'src/components/WordDashboard/verb/VerbConjFormAdditional'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'
import { NUMBERS } from 'src/constants/numbers'

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
  const { data: word, isLoading, error } = useWordDetail(wordId ? parseInt(wordId, NUMBERS.DECIMAL_RADIX) : null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !word) {
    return null
  }

  const verbWord = word as VerbWord

  const types: string[] = [
    verbWord.group,
    verbWord.isTransitive === true ? 'TRANSITIVE' : null,
    verbWord.isIntransitive === true ? 'INTRANSITIVE' : null,
  ].filter((t): t is string => t !== null)

  return (
    <Root className={classes.wordDetail}>
      <WordTitle {...verbWord} />
      <WordActions />
      {verbWord.conjugation && <VerbMainFormRow conjugation={verbWord.conjugation} />}
      <WordTypeDisplay types={types} />
      {verbWord.conjugation && (
        <VerbConjFormRow conjugation={verbWord.conjugation} group={verbWord.group} word={verbWord.word} />
      )}
      <WordSense {...verbWord} />
      {verbWord.conjugation && <VerbConjFormAdditional conjugation={verbWord.conjugation} />}
    </Root>
  )
}

export default VerbDetail

