import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getWordDetailData } from 'src/selectors/wordDetail'

const useStyles = makeStyles(() =>
  createStyles({
    wordDetail: {
      display: 'inline-block',
      position: 'relative',
      width: '70%',
      borderRadius: 3,
      verticalAlign: 'top'
    }
  })
)

const WordDetail = ({ wordId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const word = useSelector(getWordDetailData)

  useEffect(() => {
    if (wordId) {
      dispatch(fetchWordDetailAction({ id: parseInt(wordId) }))
    } else {
      dispatch(fetchWordDetailActionReset())
    }
  }, [wordId])

  return <div className={classes.wordDetail}>{word && JSON.stringify(word)}</div>
}

WordDetail.propTypes = {
  wordId: PropTypes.string
}

export default WordDetail
