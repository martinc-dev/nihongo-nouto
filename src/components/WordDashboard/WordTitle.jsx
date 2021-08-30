import PropTypes from 'prop-types'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme =>
  createStyles({
    wordTitle: {
      display: 'inline-block',
      height: 80,
      width: 'calc(100% - 150px)',
      color: theme.palette.shibafuGreen.main,
    },
    wordTitleWord: {
      display: 'inline-block',
      marginRight: 50,
      fontWeight: 700,
    },
    wordTitleHiragana: {
      display: 'inline-block',
      fontWeight: 700,
    },
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
        <Typography className={classes.wordTitleHiragana} variant='h4'>
          {hiragana}
        </Typography>
      )}
    </div>
  )
}

WordTitle.propTypes = {
  hiragana: PropTypes.string,
  word: PropTypes.string.isRequired,
}

export default WordTitle
