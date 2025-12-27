import { styled } from '@mui/material/styles'
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

interface WordTitleProps {
  word: string
  hiragana?: string
  romaji?: string
}

const WordTitle = ({ word, hiragana, romaji }: WordTitleProps) => {
  const reading = hiragana || romaji

  return (
    <Root className={classes.wordTitle}>
      <Typography className={classes.wordTitleWord} variant='h2'>
        {word}
      </Typography>
      {reading && (
        <Typography className={classes.wordTitleHiragana} variant='h4'>
          {reading}
        </Typography>
      )}
    </Root>
  )
}

export default WordTitle
