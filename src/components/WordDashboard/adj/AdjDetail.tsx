import { styled } from '@mui/material/styles'

import { useWordDetail } from 'src/hooks/useWordDetail'
import { AdjWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'
import { NUMBERS } from 'src/constants/numbers'

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
  const {
    data: word,
    isLoading,
    error,
  } = useWordDetail(wordId ? parseInt(wordId, NUMBERS.DECIMAL_RADIX) : null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !word) {
    return null
  }

  const adjWord = word as AdjWord

  // Build types array for display - always show I/Na group
  // IsIConjugation === true means I-adjective, false means Na-adjective
  const types: string[] = [adjWord.isIConjugation === true ? 'IADJ' : 'NAADJ'].filter(
    (t): t is string => t !== null,
  )

  return (
    <Root className={classes.wordDetail}>
      <WordTitle {...adjWord} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...adjWord} />
    </Root>
  )
}

export default AdjDetail
