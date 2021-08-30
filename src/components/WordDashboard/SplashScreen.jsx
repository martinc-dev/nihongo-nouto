import { makeStyles, createStyles } from '@material-ui/core/styles'

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
