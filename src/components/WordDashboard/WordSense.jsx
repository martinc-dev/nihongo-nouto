import PropTypes from 'prop-types'

import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const PREFIX = 'WordSense'

const classes = {
  root: `${PREFIX}-root`,
  sense: `${PREFIX}-sense`,
}

const Root = styled('div')({
  [`&.${classes.root}`]: {
    display: 'inline-block',
    width: '50%',
    verticalAlign: 'top',
  },
  [`& .${classes.sense}`]: {},
})

const WordSense = ({ sense }) => {
  return (
    <Root className={classes.root}>
      <div className={classes.sense}>
        <Typography component='div' variant='body1'>
          {sense}
        </Typography>
      </div>
    </Root>
  )
}

WordSense.propTypes = {
  sense: PropTypes.string.isRequired,
}

export default WordSense
