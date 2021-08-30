import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { find as findInObj } from 'lodash'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { nounTags } from 'src/constants/resources'
import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getWordDetailData } from 'src/selectors/wordDetail'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
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

const NounDetail = ({ wordId }) => {
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

  const types =
    word.nounTagRel
      ?.map(t => findInObj(nounTags, tag => tag.id === t.tagId)?.name ?? null)
      ?.filter(t => t) ?? []

  return (
    <div className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...word} />
    </div>
  )
}

NounDetail.propTypes = {
  wordId: PropTypes.string,
}

export default NounDetail
