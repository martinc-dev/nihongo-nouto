import PropTypes from 'prop-types'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() =>
  createStyles({
    wordTitle: {
      display: 'inline-block'
    },
    wordTitleWord: {
      display: 'inline-block'
    },
    wordTitleHiragana: {
      display: 'inline-block'
    }
  })
)

const WordTitle = ({ word, hiragana }) => {
  const classes = useStyles()

  return (
    <div className={classes.wordTitle}>
      <Typography className={classes.wordTitleWord} variant='h2'>
        {word}
      </Typography>
      {hiragana && (
        <Typography className={classes.wordTitleHiragana} variant='h3'>
          {hiragana}
        </Typography>
      )}
    </div>
  )
}

WordTitle.propTypes = {
  hiragana: PropTypes.string,
  word: PropTypes.string.isRequired
}

export default WordTitle
