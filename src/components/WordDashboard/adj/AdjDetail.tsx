import { useWordDetail } from 'src/hooks/useWordDetail'
import { AdjWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'
import WordDetailContainer from 'src/components/WordDashboard/WordDetailContainer'
import { NUMBERS } from 'src/constants/numbers'
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

  const types: string[] = [adjWord.isIConjugation === true ? 'IADJ' : 'NAADJ'].filter(
    (t): t is string => t !== null,
  )

  return (
    <WordDetailContainer>
      <WordTitle {...adjWord} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...adjWord} />
    </WordDetailContainer>
  )
}

export default AdjDetail
