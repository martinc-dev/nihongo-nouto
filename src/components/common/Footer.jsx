import { styled } from '@mui/styles'
import Typography from '@mui/material/Typography'

import { sizes } from 'src/themes/sizes'

const PREFIX = 'Footer'

const classes = {
  root: `${PREFIX}-root`,
  footNote: `${PREFIX}-footNote`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: sizes.footerHeight,
    backgroundColor: theme.palette.metalBlue.main,
    color: theme.palette.white.main,
  },

  [`& .${classes.footNote}`]: {
    padding: '40px 40px 0 0',
    fontSize: 12,
  },
}))

const Footer = () => {
  return (
    <Root className={classes.root}>
      <Typography className={classes.footNote}>Nihongo Nouto</Typography>
    </Root>
  )
}

export default Footer
