import PropTypes from 'prop-types'

import makeStyles from '@mui/styles/makeStyles'

import { colors } from 'src/themes/colors'
import { getWordGroupIconMatch } from 'src/constants/resources'

const useStyles = makeStyles(theme => ({
  groupIcon: {
    width: 20,
    height: 20,
    borderRadius: 5,
    verticalAlign: 'top',
    textAlign: 'center',
    fontWeight: 700,
    color: theme.palette.prussianBlue.main,
  },
}))

const WordGroupIcon = ({ type }) => {
  const classes = useStyles()
  const iconDetail = getWordGroupIconMatch(type)

  if (!iconDetail) return null

  return (
    <div
      className={classes.groupIcon}
      style={{
        backgroundColor: colors[iconDetail.colorName],
      }}
    >
      {iconDetail.text}
    </div>
  )
}

WordGroupIcon.propTypes = {
  type: PropTypes.string.isRequired,
}

export default WordGroupIcon
