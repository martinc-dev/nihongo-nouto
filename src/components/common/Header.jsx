import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { theme } from 'src/themes/theme'
import { sizes } from 'src/themes/sizes'
import NavMenu from 'src/components/common/NavMenu'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    minHeight: sizes.headerHeight
  },
  title: {
    flexGrow: 1,
    color: theme.palette.white.main
  }
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
