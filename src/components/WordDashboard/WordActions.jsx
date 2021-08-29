import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(() =>
  createStyles({
    wordActions: {
      display: 'inline-block'
    },
    editButton: {},
    deleteButton: {}
  })
)

const WordActions = () => {
  const classes = useStyles()

  return (
    <div className={classes.wordActions}>
      <Button className={classes.editButton} onClick={() => true} type='button'>
        Edit
      </Button>
      <Button className={classes.deleteButton} onClick={() => true} type='button'>
        Delete
      </Button>
    </div>
  )
}

export default WordActions
