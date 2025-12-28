import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const PREFIX = 'SplashScreen'

const classes = {
  root: `${PREFIX}-root`,
  logo: `${PREFIX}-logo`,
  title: `${PREFIX}-title`,
  subtitle: `${PREFIX}-subtitle`,
}

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    textAlign: 'center',
  },
  [`& .${classes.logo}`]: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing(4),
    borderRadius: '20%', // Soft rounded square like an app icon
    boxShadow: `0 8px 32px 0 ${theme.palette.common.black}40`, // Clear subtle shadow
  },
  [`& .${classes.title}`]: {
    fontWeight: 800,
    marginBottom: theme.spacing(1),
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
  },
  [`& .${classes.subtitle}`]: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
}))

const SplashScreen = () => {
  return (
    <Root className={classes.root}>
      <img alt='Nihongo Nouto Logo' className={classes.logo} src='/logo192.png' />
      <Typography className={classes.title} component='h1' variant='h2'>
        Nihongo Nouto
      </Typography>
      <Typography
        component='h2'
        sx={{ color: 'text.primary', fontWeight: 'bold' }}
        variant='h4'
      >
        日本語ノート
      </Typography>
      <Typography className={classes.subtitle} variant='h6'>
        Select a category to start studying
      </Typography>
    </Root>
  )
}

export default SplashScreen
