import { styled } from '@mui/material/styles'

import { colors } from 'src/themes/colors'
import { nounTags, getWordGroupIconMatch } from 'src/constants/resources'

const PREFIX = 'WordTagIcon'

const classes = {
  tagIcon: `${PREFIX}-tagIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.tagIcon}`]: {
    width: 20,
    height: 20,
    borderRadius: 5,
    verticalAlign: 'top',
    textAlign: 'center',
    fontWeight: 700,
    color: theme.palette.prussianBlue.main,
  },
}))

interface WordTagIconProps {
  tagName: string
}

const WordTagIcon = ({ tagName }: WordTagIconProps) => {
  const tag = Object.values(nounTags).find(nt => nt.name === tagName)

  if (!tag) return null

  const iconDetail = getWordGroupIconMatch(tag.name)

  if (!iconDetail) return null

  return (
    <Root
      className={classes.tagIcon}
      style={{
        backgroundColor: colors[iconDetail.colorName as keyof typeof colors],
      }}
    >
      {iconDetail.text}
    </Root>
  )
}

export default WordTagIcon
