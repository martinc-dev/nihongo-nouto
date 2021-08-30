import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getWordDetailData } from 'src/selectors/wordDetail'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'

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

const AdjDetail = ({ wordId }) => {
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

  if (!word) return null

  const types = [
    word.group,
    word.isTransitive === true && 'TRANSITIVE',
    word.isIntransitive === true && 'INTRANSITIVE',
    word.isIConjugation === true && 'IADJ',
    word.isIConjugation === false && 'NAADJ'
  ].filter(t => t)

  return (
    <div className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      <WordTypeDisplay types={types} />
    </div>
  )
}

AdjDetail.propTypes = {
  wordId: PropTypes.string
}

export default AdjDetail
