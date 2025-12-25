import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { find as findInObj } from 'lodash'

import { styled } from '@mui/material/styles'

import { nounTags } from 'src/constants/resources'
import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
import { RootState } from 'src/types/redux'
import { NounWord } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'

const PREFIX = 'NounDetail'

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

interface NounDetailProps {
  wordId?: string | null
}

interface NounTagRel {
  tagId: number
  [key: string]: unknown
}

interface NounWordWithTags extends NounWord {
  nounTagRel?: NounTagRel[]
}

const NounDetail = ({ wordId }: NounDetailProps) => {
  const dispatch = useDispatch()

  const word = useSelector((state: RootState) => getFetchWordDetailData(state)) as NounWordWithTags | null

  useEffect(() => {
    if (wordId) {
      dispatch(fetchWordDetailAction({ id: parseInt(wordId, 10) }))
    } else {
      dispatch(fetchWordDetailActionReset())
    }
  }, [wordId, dispatch])

  if (!word) return null

  const types: string[] =
    word.nounTagRel
      ?.map(t => findInObj(nounTags, tag => tag.id === t.tagId)?.name ?? null)
      ?.filter((t): t is string => t !== null) ?? []

  return (
    <Root className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...word} />
    </Root>
  )
}

export default NounDetail

