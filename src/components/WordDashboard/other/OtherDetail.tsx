import { useWordDetail } from 'src/hooks/useWordDetail'
import { OtherWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'
import WordDetailContainer from 'src/components/WordDashboard/WordDetailContainer'
import { NUMBERS } from 'src/constants/numbers'

interface OtherDetailProps {
  wordId?: string | null
}

const OtherDetail = ({ wordId }: OtherDetailProps) => {
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

  const otherWord = word as OtherWord

  const types: string[] = [
    'group' in otherWord ? otherWord.group : null,
    'isTransitive' in otherWord && otherWord.isTransitive === true ? 'TRANSITIVE' : null,
    'isIntransitive' in otherWord && otherWord.isIntransitive === true
      ? 'INTRANSITIVE'
      : null,
    'isIConjugation' in otherWord && otherWord.isIConjugation === true ? 'IADJ' : null,
    'isIConjugation' in otherWord && otherWord.isIConjugation === false ? 'NAADJ' : null,
  ].filter((t): t is string => t !== null)

  return (
    <WordDetailContainer>
      <WordTitle {...otherWord} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...otherWord} />
    </WordDetailContainer>
  )
}

export default OtherDetail
