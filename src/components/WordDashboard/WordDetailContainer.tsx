import { styled } from '@mui/material/styles'

import { UI_DIMENSIONS } from 'src/constants/numbers'

const PREFIX = 'WordDetailContainer'

const classes = {
  root: `${PREFIX}-root`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'inline-block',
    position: 'relative',
    width: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH,
    borderRadius: UI_DIMENSIONS.WORD_DASHBOARD_BORDER_RADIUS,
    verticalAlign: 'top',
    [theme.breakpoints.down('xl')]: {
      width: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH_MOBILE,
      maxWidth: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH_MOBILE,
    },
  },
}))

interface WordDetailContainerProps {
  children: React.ReactNode
}

const WordDetailContainer = ({ children }: WordDetailContainerProps) => {
  return <Root className={classes.root}>{children}</Root>
}

export default WordDetailContainer

