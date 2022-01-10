import { QueryClientProvider } from 'react-query'

import { styled } from '@mui/material/styles'
import {
  responsiveFontSizes,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { theme as customTheme } from 'src/themes/theme'
import queryClient from 'src/singletons/queryClient'
import MainContent from 'src/components/common/MainContent'

const StyledQueryClientProvider = styled(QueryClientProvider)(() => ({}))

const App = () => {
  const theme = responsiveFontSizes(customTheme)

  return (
    <StyledQueryClientProvider client={queryClient}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainContent />
        </ThemeProvider>
      </StyledEngineProvider>
    </StyledQueryClientProvider>
  )
}

export default App
