import makeStyles from '@mui/styles/makeStyles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { sizes } from 'src/themes/sizes'
import NavMenu from 'src/components/common/NavMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: sizes.headerHeight,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.white.main,
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          <NavMenu />
          <Typography className={classes.title} variant='h6'>
            日本語ノート
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
