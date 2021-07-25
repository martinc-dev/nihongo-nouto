import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { theme } from 'src/themes/theme'
import { sizes } from 'src/themes/sizes'

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: sizes.footerHeight,
    backgroundColor: theme.palette.metalBlue.main,
    color: theme.palette.white.main
  },
  footNote: {
    padding: '40px 40px 0 0',
    fontSize: 12
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.footNote}>Nihongo Nouto</Typography>
    </div>
  )
}

export default Footer
