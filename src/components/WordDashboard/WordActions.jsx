import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const PREFIX = 'WordActions'

const classes = {
  wordActions: `${PREFIX}-wordActions`,
  editButton: `${PREFIX}-editButton`,
  deleteButton: `${PREFIX}-deleteButton`,
}

const Root = styled('div')(() => ({
  [`&.${classes.wordActions}`]: {
    display: 'inline-block',
  },

  [`& .${classes.editButton}`]: {},
  [`& .${classes.deleteButton}`]: {},
}))

const WordActions = () => {
  return (
    <Root className={classes.wordActions}>
      <Button className={classes.editButton} onClick={() => true} type='button'>
        Edit
      </Button>
      <Button className={classes.deleteButton} onClick={() => true} type='button'>
        Delete
      </Button>
    </Root>
  )
}

export default WordActions
