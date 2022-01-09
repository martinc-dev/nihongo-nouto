import { Switch, Route, Redirect } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { theme as customTheme } from 'src/themes/theme'
import { sizes } from 'src/themes/sizes'
import resourceTypes from 'src/constants/resourceTypes'
import Header from 'src/components/common/Header'
import Footer from 'src/components/common/Footer'
import WordDashboard from 'src/components/WordDashboard'

const PREFIX = 'MainContent'
const paddingTopExtra = 20

const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
}

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: customTheme.palette.sameGray.main,
    color: customTheme.palette.white.main,
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    minHeight: `calc(100vh - ${sizes.footerHeight}px)`,
    padding: customTheme.spacing(3),
    paddingTop: sizes.headerHeight + paddingTopExtra,
  },
}))

const MainContent = () => {
  return (
    <Root className={classes.root}>
      <Paper>
        <Header />
        <main className={classes.content}>
          <Switch>
            <Route component={WordDashboard} exact key='dashboard' path='/' />
            <Route
              component={WordDashboard}
              path={`/${resourceTypes.VERB.pathName}/:wordId`}
            />
            <Route component={WordDashboard} path={`/${resourceTypes.VERB.pathName}`} />
            <Route
              component={WordDashboard}
              path={`/${resourceTypes.ADJ.pathName}/:wordId`}
            />
            <Route component={WordDashboard} path={`/${resourceTypes.ADJ.pathName}`} />
            <Route
              component={WordDashboard}
              path={`/${resourceTypes.NOUN.pathName}/:wordId`}
            />
            <Route component={WordDashboard} path={`/${resourceTypes.NOUN.pathName}`} />
            <Route
              component={WordDashboard}
              path={`/${resourceTypes.OTHER.pathName}/:wordId`}
            />
            <Route component={WordDashboard} path={`/${resourceTypes.OTHER.pathName}`} />
            <Redirect from='*' to='/' />
          </Switch>
        </main>
        <Footer />
      </Paper>
    </Root>
  )
}

export default MainContent
