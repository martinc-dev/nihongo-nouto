import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {},
  stem: {},
  teForm: {},
  name: {},
  value: {},
  suffix: {}
})

const VerbMainFormRow = ({ stem, teForm }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.stem}>
        <span className={classes.name}>Stem</span>
        <span className={classes.value}>{stem}</span>
        <span className={classes.suffix}>〜</span>
      </div>
      <div className={classes.teForm}>
        <span className={classes.name}>Te</span>
        <span className={classes.value}>{teForm}</span>
      </div>
    </div>
  )
}

VerbMainFormRow.propTypes = {
  stem: PropTypes.string,
  teForm: PropTypes.string
}

export default VerbMainFormRow
