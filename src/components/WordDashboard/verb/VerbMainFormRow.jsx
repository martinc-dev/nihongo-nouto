import PropTypes from 'prop-types'

import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      padding: '10px 0',
      margin: '10px 0',
      borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
    },
    stem: {
      display: 'inline-block',
      width: 200,
    },
    teForm: {
      display: 'inline-block',
    },
    name: {
      textTransform: 'uppercase',
      marginRight: 50,
      color: theme.palette.soraBlue.main,
    },
    value: {
      marginRight: 5,
    },
    suffix: {},
  })
)

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
  teForm: PropTypes.string,
}

export default VerbMainFormRow
