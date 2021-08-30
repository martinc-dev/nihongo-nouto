import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import { getWordGroupIconMatch } from 'src/constants/jisho'
import WordGroupIcon from 'src/components/common/WordGroupIcon'

const useStyles = makeStyles({
  root: {},
  row: {},
  iconCell: {},
  valueCell: {}
})

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
  types: PropTypes.arrayOf(PropTypes.string)
}

export default WordTypeDisplay
