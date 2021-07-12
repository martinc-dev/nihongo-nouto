import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'

import { colors } from 'src/themes/colors'

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    type: 'light',
    primary: { main: colors.shinmeGreen },
    secondary: { main: colors.shibafuGreen },
    white: { main: colors.white },
    black: { main: colors.black },
    sakuraPink: { main: colors.sakuraPink },
    ichigoRed: { main: colors.ichigoRed },
    mikanOrange: { main: colors.mikanOrange },
    yuzuYellow: { main: colors.yuzuYellow },
    shinmeGreen: { main: colors.shinmeGreen },
    shibafuGreen: { main: colors.shibafuGreen },
    oliveGreen: { main: colors.oliveGreen },
    kooriBlue: { main: colors.kooriBlue },
    soraBlue: { main: colors.soraBlue },
    toukaPurple: { main: colors.toukaPurple },
    kamiGray: { main: colors.kamiGray },
    kumoriGray: { main: colors.kumoriGray },
    arashiGray: { main: colors.arashiGray },
    iwaGray: { main: colors.iwaGray },
    haiGray: { main: colors.haiGray },
    transparent: { main: colors.transparent }
  }
})
