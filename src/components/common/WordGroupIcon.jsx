import PropTypes from 'prop-types'

import { styled } from '@mui/styles'

import { colors } from 'src/themes/colors'
import { getWordGroupIconMatch } from 'src/constants/resources'

const PREFIX = 'WordGroupIcon'

const classes = {
  groupIcon: `${PREFIX}-groupIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.groupIcon}`]: {
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
  const iconDetail = getWordGroupIconMatch(type)

  if (!iconDetail) return null

  return (
    <Root
      className={classes.groupIcon}
      style={{
        backgroundColor: colors[iconDetail.colorName],
      }}
    >
      {iconDetail.text}
    </Root>
  )
}

WordGroupIcon.propTypes = {
  type: PropTypes.string.isRequired,
}

export default WordGroupIcon
