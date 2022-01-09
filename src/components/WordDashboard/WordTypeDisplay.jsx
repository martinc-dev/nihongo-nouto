import PropTypes from 'prop-types'

import { styled } from '@mui/styles'

import { getWordGroupIconMatch } from 'src/constants/resources'
import WordGroupIcon from 'src/components/common/WordGroupIcon'

const PREFIX = 'WordTypeDisplay'

const classes = {
  root: `${PREFIX}-root`,
  row: `${PREFIX}-row`,
  iconCell: `${PREFIX}-iconCell`,
  valueCell: `${PREFIX}-valueCell`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
  },

  [`& .${classes.row}`]: {
    margin: '10px 0',
  },

  [`& .${classes.iconCell}`]: {
    display: 'inline-block',
    marginRight: 10,
  },

  [`& .${classes.valueCell}`]: {
    display: 'inline-block',
  },
}))

const WordTypeDisplay = ({ types }) => {
  const items = (types || [])
    .map(t => ({ type: t, match: getWordGroupIconMatch(t) }))
    .filter(t => t.match)

  return (
    <Root className={classes.root}>
      {items.map(t => (
        <div className={classes.row} key={t.type}>
          <span className={classes.iconCell}>
            <WordGroupIcon type={t.type} />
          </span>
          <span className={classes.valueCell}>{t.match.value}</span>
        </div>
      ))}
    </Root>
  )
}

WordTypeDisplay.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string),
}

export default WordTypeDisplay
