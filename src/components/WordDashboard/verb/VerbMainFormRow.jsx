import PropTypes from 'prop-types'

import { styled } from '@mui/styles'
const PREFIX = 'VerbMainFormRow'

const classes = {
  root: `${PREFIX}-root`,
  stem: `${PREFIX}-stem`,
  teForm: `${PREFIX}-teForm`,
  name: `${PREFIX}-name`,
  value: `${PREFIX}-value`,
  suffix: `${PREFIX}-suffix`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: '100%',
    padding: '10px 0',
    margin: '10px 0',
    borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
  },

  [`& .${classes.stem}`]: {
    display: 'inline-block',
    width: 200,
  },

  [`& .${classes.teForm}`]: {
    display: 'inline-block',
  },

  [`& .${classes.name}`]: {
    marginRight: 50,
    padding: '0 5px',
    textTransform: 'uppercase',
    borderRadius: 4,
    backgroundColor: theme.palette.soraBlue.main,
    color: theme.palette.prussianBlue.main,
  },

  [`& .${classes.value}`]: {
    marginRight: 5,
  },

  [`& .${classes.suffix}`]: {},
}))

const VerbMainFormRow = ({ conjugation }) => {
  return (
    <Root className={classes.root}>
      <div className={classes.stem}>
        <span className={classes.name}>Stem</span>
        <span className={classes.value}>
          {conjugation.verbstem || conjugation['te form'].replace('て', '')}
        </span>
        <span className={classes.suffix}>〜</span>
      </div>
      <div className={classes.teForm}>
        <span className={classes.name}>Te</span>
        <span className={classes.value}>{conjugation['te form'] || '?'}</span>
      </div>
    </Root>
  )
}

VerbMainFormRow.propTypes = {
  conjugation: PropTypes.object.isRequired,
}

export default VerbMainFormRow
