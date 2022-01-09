import { useEffect } from 'react'
import { styled } from '@mui/styles'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { fetchWordDetailAction, fetchWordDetailActionReset } from 'src/actions/wordDetail'
import { getFetchWordDetailData } from 'src/selectors/wordDetail'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import WordActions from 'src/components/WordDashboard/WordActions'
import WordTypeDisplay from 'src/components/WordDashboard/WordTypeDisplay'
import WordSense from 'src/components/WordDashboard/WordSense'

const PREFIX = 'AdjDetail'

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

const AdjDetail = ({ wordId }) => {
  const dispatch = useDispatch()

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
    word.isIConjugation === true && 'IADJ',
    word.isIConjugation === false && 'NAADJ',
  ].filter(t => t)

  return (
    <Root className={classes.wordDetail}>
      <WordTitle {...word} />
      <WordActions />
      <WordTypeDisplay types={types} />
      <WordSense {...word} />
    </Root>
  )
}

AdjDetail.propTypes = {
  wordId: PropTypes.string,
}

export default AdjDetail
