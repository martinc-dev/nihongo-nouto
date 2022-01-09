import PropTypes from 'prop-types'

import { styled } from '@mui/styles'
import Typography from '@mui/material/Typography'

const PREFIX = 'WordTitle'

const classes = {
  wordTitle: `${PREFIX}-wordTitle`,
  wordTitleWord: `${PREFIX}-wordTitleWord`,
  wordTitleHiragana: `${PREFIX}-wordTitleHiragana`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.wordTitle}`]: {
    display: 'inline-block',
    height: 80,
    width: 'calc(100% - 150px)',
    color: theme.palette.shibafuGreen.main,
  },

  [`& .${classes.wordTitleWord}`]: {
    display: 'inline-block',
    marginRight: 50,
    fontWeight: 700,
  },

  [`& .${classes.wordTitleHiragana}`]: {
    display: 'inline-block',
    fontWeight: 700,
  },
}))

const WordTitle = ({ word, hiragana }) => {
  return (
    <Root className={classes.wordTitle}>
      <Typography className={classes.wordTitleWord} variant='h2'>
        {word}
      </Typography>
      {hiragana && (
        <Typography className={classes.wordTitleHiragana} variant='h4'>
          {hiragana}
        </Typography>
      )}
    </Root>
  )
}

WordTitle.propTypes = {
  hiragana: PropTypes.string,
  word: PropTypes.string.isRequired,
}

export default WordTitle
