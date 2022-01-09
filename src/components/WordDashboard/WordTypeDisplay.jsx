import PropTypes from 'prop-types'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { getWordGroupIconMatch } from 'src/constants/resources'
import WordGroupIcon from 'src/components/common/WordGroupIcon'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
    },
    row: {
      margin: '10px 0',
    },
    iconCell: {
      display: 'inline-block',
      marginRight: 10,
    },
    valueCell: {
      display: 'inline-block',
    },
  })
)

const WordTypeDisplay = ({ types }) => {
  const classes = useStyles()
  const items = (types || [])
    .map(t => ({ type: t, match: getWordGroupIconMatch(t) }))
    .filter(t => t.match)

  return (
    <div className={classes.root}>
      {items.map(t => (
        <div className={classes.row} key={t.type}>
          <span className={classes.iconCell}>
            <WordGroupIcon type={t.type} />
          </span>
          <span className={classes.valueCell}>{t.match.value}</span>
        </div>
      ))}
    </div>
  )
}

WordTypeDisplay.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string),
}

export default WordTypeDisplay
