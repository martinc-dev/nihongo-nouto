import { useParams, useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

import { useDeleteWordDetail } from 'src/hooks/useWordDetail'
import { NUMBERS } from 'src/constants/numbers'

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
  const { wordId } = useParams<{ wordId?: string }>()
  const navigate = useNavigate()
  const deleteWordMutation = useDeleteWordDetail()

  const handleEdit = () => {
    if (wordId) {
      const currentPath = window.location.pathname

      navigate(`${currentPath}/edit`)
    }
  }

  const handleDelete = () => {
    if (wordId) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this word?')) {
        deleteWordMutation.mutate({ id: parseInt(wordId, NUMBERS.DECIMAL_RADIX) })
      }
    }
  }

  return (
    <Root className={classes.wordActions}>
      <Button className={classes.editButton} disabled={!wordId} onClick={handleEdit} type='button'>
        Edit
      </Button>
      <Button
        className={classes.deleteButton}
        disabled={!wordId || deleteWordMutation.isPending}
        onClick={handleDelete}
        type='button'
      >
        {deleteWordMutation.isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </Root>
  )
}

export default WordActions

