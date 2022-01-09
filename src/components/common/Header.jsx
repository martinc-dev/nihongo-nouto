import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { sizes } from 'src/themes/sizes'
import NavMenu from 'src/components/common/NavMenu'

const PREFIX = 'Header'

const classes = {
  root: `${PREFIX}-root`,
  toolbar: `${PREFIX}-toolbar`,
  title: `${PREFIX}-title`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },

  [`& .${classes.toolbar}`]: {
    minHeight: sizes.headerHeight,
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
    color: theme.palette.white.main,
  },
}))

const Header = () => {
  return (
    <Root className={classes.root}>
      <AppBar enableColorOnDark position='fixed'>
        <Toolbar className={classes.toolbar}>
          <NavMenu />
          <Typography className={classes.title} variant='h6'>
            日本語ノート
          </Typography>
        </Toolbar>
      </AppBar>
    </Root>
  )
}

export default Header
