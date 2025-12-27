import { styled } from '@mui/material/styles'
import { UI_DIMENSIONS } from 'src/themes/sizes'
import { colors } from 'src/themes/colors'

const PREFIX = 'WordEditorContainer'

export const editorClasses = {
  root: `${PREFIX}-root`,
  editorActions: `${PREFIX}-editorActions`,
  saveButton: `${PREFIX}-saveButton`,
  cancelButton: `${PREFIX}-cancelButton`,
  formSection: `${PREFIX}-formSection`,
  formRow: `${PREFIX}-formRow`,
  formField: `${PREFIX}-formField`,
  label: `${PREFIX}-label`,
  selectField: `${PREFIX}-selectField`,
  mainFields: `${PREFIX}-mainFields`,
  conjugationFields: `${PREFIX}-conjugationFields`,
  booleanFields: `${PREFIX}-booleanFields`,
  senseField: `${PREFIX}-senseField`,
  tagsContainer: `${PREFIX}-tagsContainer`,
  tagChip: `${PREFIX}-tagChip`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${editorClasses.root}`]: {
    display: 'inline-block',
    position: 'relative',
    width: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH,
    borderRadius: UI_DIMENSIONS.WORD_DASHBOARD_BORDER_RADIUS,
    verticalAlign: 'top',
    [theme.breakpoints.down('xl')]: {
      width: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH_MOBILE,
      maxWidth: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH_MOBILE,
    },
  },

  [`& .${editorClasses.editorActions}`]: {
    display: 'inline-block',
    marginBottom: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_BOTTOM,
  },

  [`& .${editorClasses.saveButton}`]: {
    marginRight: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_RIGHT,
    backgroundColor: theme.palette.shibafuGreen.main,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.shinmeGreen.main,
    },
  },

  [`& .${editorClasses.cancelButton}`]: {
    backgroundColor: theme.palette.ichigoRed.main,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.mikanOrange.main,
    },
  },

  [`& .${editorClasses.formSection}`]: {
    width: UI_DIMENSIONS.FORM_FIELD_WIDTH_FULL,
    marginBottom: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_BOTTOM,
    paddingBottom: UI_DIMENSIONS.WORD_DASHBOARD_PADDING_BOTTOM,
    borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
  },

  [`& .${editorClasses.formRow}`]: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
    gap: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
  },

  [`& .${editorClasses.formField}`]: {
    flex: 1,
    '& .MuiOutlinedInput-input': {
      color: colors.shibafuGreen,
    },
    '& .MuiInputLabel-root': {
      color: colors.kujakuishiGreen,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.kumoriBlue,
      },
      '&:hover fieldset': {
        borderColor: colors.soraBlue,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.shibafuGreen,
      },
    },
  },

  [`& .${editorClasses.label}`]: {
    minWidth: UI_DIMENSIONS.WORD_DASHBOARD_MIN_WIDTH,
    marginRight: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_RIGHT,
    padding: UI_DIMENSIONS.WORD_DASHBOARD_PADDING,
    textTransform: 'uppercase',
    borderRadius: UI_DIMENSIONS.WORD_DASHBOARD_BORDER_RADIUS_SMALL,
    backgroundColor: theme.palette.soraBlue.main,
    color: theme.palette.prussianBlue.main,
    fontSize: UI_DIMENSIONS.FONT_SIZE_SMALL,
    fontWeight: UI_DIMENSIONS.FONT_WEIGHT_BOLD,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${editorClasses.selectField}`]: {
    flex: 1,
    '& .MuiOutlinedInput-input': {
      color: colors.shibafuGreen,
    },
    '& .MuiInputLabel-root': {
      color: colors.kujakuishiGreen,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.kumoriBlue,
      },
      '&:hover fieldset': {
        borderColor: colors.soraBlue,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.shibafuGreen,
      },
    },
  },

  [`& .${editorClasses.mainFields}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
  },

  [`& .${editorClasses.conjugationFields}`]: {
    display: 'grid',
    gridTemplateColumns: UI_DIMENSIONS.GRID_COLUMNS_2,
    gap: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
    '& .MuiTextField-root': {
      width: '100%',
    },
  },

  [`& .${editorClasses.booleanFields}`]: {
    display: 'grid',
    gridTemplateColumns: UI_DIMENSIONS.GRID_COLUMNS_2,
    gap: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
  },

  [`& .${editorClasses.senseField}`]: {
    width: UI_DIMENSIONS.FORM_FIELD_WIDTH_FULL,
    '& .MuiOutlinedInput-root': {
      minHeight: UI_DIMENSIONS.FORM_FIELD_MIN_HEIGHT,
      alignItems: 'flex-start',
    },
    '& .MuiOutlinedInput-input': {
      color: colors.shibafuGreen,
    },
  },

  [`& .${editorClasses.tagsContainer}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: UI_DIMENSIONS.SPACING_XS,
    marginTop: UI_DIMENSIONS.SPACING_SM,
  },

  [`& .${editorClasses.tagChip}`]: {
    cursor: 'pointer',
  },
}))

interface WordEditorContainerProps {
  children: React.ReactNode
}

const WordEditorContainer = ({ children }: WordEditorContainerProps) => {
  return <Root className={editorClasses.root}>{children}</Root>
}

export default WordEditorContainer
