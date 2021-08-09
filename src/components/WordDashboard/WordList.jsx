import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    wordList: {
      display: 'inline-block',
      width: '30%',
      verticalAlign: 'top'
    }
  })
)

const WordList = () => {
  const classes = useStyles()

  return <div className={classes.wordList}>WordList</div>
}

export default WordList
