import { QueryClientProvider } from 'react-query'
import { Switch, Route, Redirect } from 'react-router-dom'

import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme as customTheme } from 'src/themes/theme'
import { sizes } from 'src/themes/sizes'
import queryClient from 'src/singletons/queryClient'
import Header from 'src/components/common/Header'
import Footer from 'src/components/common/Footer'
import WordDashboard from 'src/components/WordDashboard'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: customTheme.palette.sameGray.main,
      color: customTheme.palette.white.main
    },
    content: {
      flexGrow: 1,
      minHeight: `calc(100vh - ${sizes.footerHeight}px)`,
      padding: customTheme.spacing(3),
      paddingTop: sizes.headerHeight + customTheme.spacing(3)
    }
  })
)

const App = () => {
  const classes = useStyles()
  const theme = responsiveFontSizes(customTheme)

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header />
          <main className={classes.content}>
            <Switch>
              <Route component={WordDashboard} exact key='dashboard' path='/' />
              <Route component={WordDashboard} exact key='dashboard' path='/verbs' />
              <Route component={WordDashboard} exact key='dashboard' path='/adjectives' />
              <Route component={WordDashboard} exact key='dashboard' path='/nouns' />
              <Route component={WordDashboard} exact key='dashboard' path='/others' />
              <Redirect from='*' to='/' />
            </Switch>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
