import { Routes, Route, Navigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

import { theme as customTheme } from 'src/themes/theme'
import { sizes } from 'src/themes/sizes'
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
          <Routes>
            <Route element={<WordDashboard />} path='/' />
            <Route element={<WordDashboard />} path='/:resourceType/create' />
            <Route element={<WordDashboard />} path='/:resourceType/:wordId/edit' />
            <Route element={<WordDashboard />} path='/:resourceType/:wordId' />
            <Route element={<WordDashboard />} path='/:resourceType' />
            <Route element={<Navigate replace to='/' />} path='*' />
          </Routes>
        </main>
        <Footer />
      </Paper>
    </Root>
  )
}

export default MainContent
