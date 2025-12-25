import { useState, useEffect } from 'react'

import { styled } from '@mui/material/styles'

import { useWordDetail } from 'src/hooks/useWordDetail'
import { WordDetail } from 'src/types/words'
import WordSearchInput from 'src/components/WordDashboard/editor/WordSearchInput'

const PREFIX = 'VerbEditor'

const classes = {
  wordEditor: `${PREFIX}-wordEditor`,
}

const Root = styled('div')(() => ({
  [`&.${classes.wordEditor}`]: {
    display: 'inline-block',
    position: 'relative',
    width: '70%',
    borderRadius: 3,
    verticalAlign: 'top',
  },
}))

interface VerbEditorProps {
  wordId?: string | null
}

const VerbEditor = ({ wordId = null }: VerbEditorProps) => {
  const [currentWordObject, setCurrentWordObject] = useState<Partial<WordDetail>>({})

  const { data: word } = useWordDetail(wordId ? parseInt(wordId, 10) : null)

  useEffect(() => {
    if (word) {
      setCurrentWordObject(word)
    }
  }, [word])

  const wordText = word && 'word' in word ? word.word : ''

  return (
    <Root className={classes.wordEditor}>
      <WordSearchInput
        initWord={wordText}
        onInputBlur={() => {}}
        onWordChange={() => {}}
        onWordSelect={() => {}}
      />
    </Root>
  )
}

export default VerbEditor
