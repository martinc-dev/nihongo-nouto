import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import VerbMainFormRow from 'src/components/WordDashboard/verb/VerbMainFormRow'
import VerbConjFormRow from 'src/components/WordDashboard/verb/VerbConjFormRow'
import VerbConjFormAdditional from 'src/components/WordDashboard/verb/VerbConjFormAdditional'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'

const useStyles = makeStyles(() =>
  createStyles({
    wordDetail: {
      display: 'inline-block',
      position: 'relative',
      width: '70%',
      borderRadius: 3,
      verticalAlign: 'top',
    },
  })
)

const VerbDetail = ({ wordId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const word = useSelector(getFetchWordDetailData)

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
  ].filter(t => t)

  return (
    <div className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      <VerbMainFormRow {...word} />
      <WordTypeDisplay types={types} />
      <VerbConjFormRow {...word} />
      <WordSense {...word} />
      <VerbConjFormAdditional {...word} />
    </div>
  )
}

VerbDetail.propTypes = {
  wordId: PropTypes.string,
}

export default VerbDetail
