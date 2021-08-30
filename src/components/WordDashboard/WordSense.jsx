import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    width: '50%',
    verticalAlign: 'top',
  },
  sense: {},
})

const WordSense = ({ sense }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.sense}>
        <Typography component='div' variant='body1'>
          {sense}
        </Typography>
      </div>
    </div>
  )
}

WordSense.propTypes = {
  sense: PropTypes.string.isRequired,
}

export default WordSense
