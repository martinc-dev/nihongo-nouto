import { styled } from '@mui/material/styles'
const PREFIX = 'SplashScreen'

const classes = {
  splashScreen: `${PREFIX}-splashScreen`,
}

const Root = styled('div')(() => ({
  [`&.${classes.splashScreen}`]: {},
}))

const SplashScreen = () => {
  return <Root className={classes.splashScreen}>SplashScreen</Root>
}

export default SplashScreen
