import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles(() =>
  createStyles({
    splashScreen: {},
  })
)

const SplashScreen = () => {
  const classes = useStyles()

  return <div className={classes.splashScreen}>SplashScreen</div>
}

export default SplashScreen
