import { makeStyles, createStyles } from '@material-ui/core/styles'

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

const WordDetail = () => {
  const classes = useStyles()

  return <div className={classes.wordDetail}>WordDetail</div>
}

export default WordDetail
