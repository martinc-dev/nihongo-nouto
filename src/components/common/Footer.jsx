import makeStyles from '@mui/styles/makeStyles'
import Typography from '@mui/material/Typography'

import { sizes } from 'src/themes/sizes'

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: sizes.footerHeight,
    backgroundColor: theme.palette.metalBlue.main,
    color: theme.palette.white.main,
  },
  footNote: {
    padding: '40px 40px 0 0',
    fontSize: 12,
  },
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
