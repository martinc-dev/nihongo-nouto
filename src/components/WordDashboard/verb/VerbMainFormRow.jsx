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
      marginRight: 50,
      padding: '0 5px',
      textTransform: 'uppercase',
      borderRadius: 4,
      backgroundColor: theme.palette.soraBlue.main,
      color: theme.palette.prussianBlue.main,
    },
    value: {
      marginRight: 5,
    },
    suffix: {},
  })
)

const VerbMainFormRow = ({ conjugation }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
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
    </div>
  )
}

VerbMainFormRow.propTypes = {
  conjugation: PropTypes.object.isRequired,
}

export default VerbMainFormRow
