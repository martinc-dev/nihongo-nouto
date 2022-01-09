import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  adaptV4Theme,
} from '@mui/material/styles'

import { colors } from 'src/themes/colors'

export const theme = createMuiTheme(
  adaptV4Theme({
    typography: {
      fontFamily: [
        'Noto Sans JP',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      mode: 'light',
      primary: { main: colors.prussianBlue },
      secondary: { main: colors.metalBlue },
      error: { main: colors.ichigoRed },
      warning: { main: colors.yuzuYellow },
      info: { main: colors.prussianBlue },
      success: { main: colors.shibafuGreen },
      background: { default: colors.sameGray, paper: colors.sameGray },
      text: {
        primary: colors.white,
        secondary: colors.kujakuishiGreen,
      },
      sakuraPink: { main: colors.sakuraPink },
      toukaPurple: { main: colors.toukaPurple },
      ichigoRed: { main: colors.ichigoRed },
      mikanOrange: { main: colors.mikanOrange },
      yuzuYellow: { main: colors.yuzuYellow },
      kujakuishiGreen: { main: colors.kujakuishiGreen },
      shinmeGreen: { main: colors.shinmeGreen },
      shibafuGreen: { main: colors.shibafuGreen },
      oliveGreen: { main: colors.oliveGreen },
      uchuuGreen: { main: colors.uchuuGreen },
      kooriBlue: { main: colors.kooriBlue },
      soraBlue: { main: colors.soraBlue },
      kumoriBlue: { main: colors.kumoriBlue },
      metalBlue: { main: colors.metalBlue },
      prussianBlue: { main: colors.prussianBlue },
      sameGray: { main: colors.sameGray },
      black: { main: colors.black },
      white: { main: colors.white },
      transparent: { main: colors.transparent },
    },
  })
)
