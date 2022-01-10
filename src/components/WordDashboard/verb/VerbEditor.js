import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
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

const VerbEditor = ({ wordId = null }) => {
  const [currentWordObject, setCurrentWordObject] = useState({})

  const dispatch = useDispatch()
  const word = useSelector(getFetchWordDetailData)

  useEffect(() => {
    if (wordId) {
      dispatch(fetchWordDetailAction({ id: parseInt(wordId) }))
    } else {
      dispatch(fetchWordDetailActionReset())
    }
  }, [wordId])

  useEffect(() => {
    if (word) setCurrentWordObject(word)
  }, [word])

  return (
    <Root className={classes.wordEditor}>
      <WordSearchInput
        initWord={word?.word ?? ''}
        onInputBlur={() => {
          // Dupe check
        }}
        onWordChange={value =>
          setCurrentWordObject({ ...currentWordObject, word: value })
        }
        onWordSelect={option =>
          option &&
          setCurrentWordObject({
            ...currentWordObject,
            word: option.word,
            hiragana: option.reading,
          })
        }
      />
    </Root>
  )
}

VerbEditor.propTypes = {
  wordId: PropTypes.string,
}

export default VerbEditor
