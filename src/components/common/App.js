import { QueryClientProvider } from 'react-query'
import { Switch, Route, Redirect } from 'react-router-dom'

import {
  responsiveFontSizes,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import CssBaseline from '@mui/material/CssBaseline'

import { theme as customTheme } from 'src/themes/theme'
import { sizes } from 'src/themes/sizes'
import resourceTypes from 'src/constants/resourceTypes'
import queryClient from 'src/singletons/queryClient'
import Header from 'src/components/common/Header'
import Footer from 'src/components/common/Footer'
import WordDashboard from 'src/components/WordDashboard'

const paddingTopExtra = 20

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: customTheme.palette.sameGray.main,
      color: customTheme.palette.white.main,
    },
    content: {
      flexGrow: 1,
      minHeight: `calc(100vh - ${sizes.footerHeight}px)`,
      padding: customTheme.spacing(3),
      paddingTop: sizes.headerHeight + paddingTopExtra,
    },
  })
)

const App = () => {
  const classes = useStyles()
  const theme = responsiveFontSizes(customTheme)

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <Header />
            <main className={classes.content}>
              <Switch>
                <Route component={WordDashboard} exact key='dashboard' path='/' />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.VERB.pathName}/:wordId`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.VERB.pathName}`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.ADJ.pathName}/:wordId`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.ADJ.pathName}`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.NOUN.pathName}/:wordId`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.NOUN.pathName}`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.OTHER.pathName}/:wordId`}
                />
                <Route
                  component={WordDashboard}
                  path={`/${resourceTypes.OTHER.pathName}`}
                />
                <Redirect from='*' to='/' />
              </Switch>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  )
}

export default App
