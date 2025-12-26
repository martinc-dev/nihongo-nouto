import { useWordDetail } from 'src/hooks/useWordDetail'
import { NounWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'
import WordDetailContainer from 'src/components/WordDashboard/WordDetailContainer'
import { NUMBERS } from 'src/constants/numbers'

interface NounDetailProps {
  wordId?: string | null
}

interface NounTagRel {
  tagId: number
  nounTag?: {
    id: number
    name: string
  }
  [key: string]: unknown
}

interface NounWordWithTags extends NounWord {
  nounTagRel?: NounTagRel[]
}

const NounDetail = ({ wordId }: NounDetailProps) => {
  const { data: word, isLoading, error } = useWordDetail(wordId ? parseInt(wordId, NUMBERS.DECIMAL_RADIX) : null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !word) {
    return null
  }

  const nounWord = word as NounWordWithTags

  // Extract tag names from nounTagRel for display as icons
  const types: string[] =
    nounWord.nounTagRel
      ?.map(rel => rel.nounTag?.name)
      ?.filter((name): name is string => name !== undefined && name !== null) ?? []

  return (
    <WordDetailContainer>
      <WordTitle {...nounWord} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...nounWord} />
    </WordDetailContainer>
  )
}

export default NounDetail

