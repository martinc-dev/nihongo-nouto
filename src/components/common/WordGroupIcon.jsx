import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import { theme } from 'src/themes/theme'
import { colors } from 'src/themes/colors'
import { getWordGroupIconMatch } from 'src/constants/jisho'

const useStyles = makeStyles(() => ({
  groupIcon: {
    width: 15,
    height: 15,
    borderRadius: 5,
    color: theme.palette.prussianBlue.main
  }
}))

const WordGroupIcon = ({ type }) => {
  const classes = useStyles()
  const iconDetail = getWordGroupIconMatch(type)

  if (!iconDetail) return null

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: colors[iconDetail.colorName],
        color: colors.prussianBlue
      }}
    >
      {iconDetail.text}
    </div>
  )
}

WordGroupIcon.propTypes = {
  type: PropTypes.string.isRequired
}

export default WordGroupIcon
