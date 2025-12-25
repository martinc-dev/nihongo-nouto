/* eslint-disable max-lines */
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { useWordDetail, useSaveWordDetail } from 'src/hooks/useWordDetail'
import { useWordFromJisho } from 'src/hooks/useWordFromJisho'
import { OtherWord, JishoSlugOption, JishoWordOption } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import { colors } from 'src/themes/colors'
import { NUMBERS, UI_DIMENSIONS } from 'src/constants/numbers'

const PREFIX = 'OtherEditor'

const classes = {
  wordEditor: `${PREFIX}-wordEditor`,
  editorActions: `${PREFIX}-editorActions`,
  saveButton: `${PREFIX}-saveButton`,
  cancelButton: `${PREFIX}-cancelButton`,
  formSection: `${PREFIX}-formSection`,
  formRow: `${PREFIX}-formRow`,
  formField: `${PREFIX}-formField`,
  label: `${PREFIX}-label`,
  mainFields: `${PREFIX}-mainFields`,
  senseField: `${PREFIX}-senseField`,
  selectField: `${PREFIX}-selectField`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.wordEditor}`]: {
    display: 'inline-block',
    position: 'relative',
    width: UI_DIMENSIONS.WORD_DASHBOARD_WIDTH,
    borderRadius: UI_DIMENSIONS.WORD_DASHBOARD_BORDER_RADIUS,
    verticalAlign: 'top',
  },

  [`& .${classes.editorActions}`]: {
    display: 'inline-block',
    marginBottom: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_BOTTOM,
  },

  [`& .${classes.saveButton}`]: {
    marginRight: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_RIGHT,
    backgroundColor: theme.palette.shibafuGreen.main,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.shinmeGreen.main,
    },
  },

  [`& .${classes.cancelButton}`]: {
    backgroundColor: theme.palette.ichigoRed.main,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.mikanOrange.main,
    },
  },

  [`& .${classes.formSection}`]: {
    width: UI_DIMENSIONS.FORM_FIELD_WIDTH_FULL,
    marginBottom: UI_DIMENSIONS.WORD_DASHBOARD_MARGIN_BOTTOM,
    paddingBottom: UI_DIMENSIONS.WORD_DASHBOARD_PADDING_BOTTOM,
    borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
  },

  [`& .${classes.formRow}`]: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
    gap: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
  },

  [`& .${classes.formField}`]: {
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

  [`& .${classes.label}`]: {
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

  [`& .${classes.mainFields}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: UI_DIMENSIONS.WORD_DASHBOARD_GAP,
  },

  [`& .${classes.senseField}`]: {
    width: UI_DIMENSIONS.FORM_FIELD_WIDTH_FULL,
    '& .MuiOutlinedInput-root': {
      minHeight: UI_DIMENSIONS.FORM_FIELD_MIN_HEIGHT,
      alignItems: 'flex-start',
    },
    '& .MuiOutlinedInput-input': {
      color: colors.shibafuGreen,
    },
  },

  [`& .${classes.selectField}`]: {
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
}))

interface OtherEditorProps {
  wordId?: string | null
}

const OtherEditor = ({ wordId = null }: OtherEditorProps) => {
  const navigate = useNavigate()
  const { wordId: paramWordId } = useParams<{ wordId?: string }>()
  const actualWordId = wordId || paramWordId
  const isCreateMode = !actualWordId
  const { data: word, isLoading } = useWordDetail(
    actualWordId ? parseInt(actualWordId, NUMBERS.DECIMAL_RADIX) : null,
  )
  const saveWordMutation = useSaveWordDetail()
  const {
    searchWord,
    selectSlug,
    selectJapaneseOption,
    selectSense,
    prepopulatedData,
    isLoading: isJishoLoading,
    slugOptions,
    selectedSlug,
    selectedJapaneseOption,
    availableSenses,
  } = useWordFromJisho()

  const [searchInputValue, setSearchInputValue] = useState('')
  const [selectedSenseIndex, setSelectedSenseIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Partial<OtherWord>>({
    word: '',
    hiragana: '',
    sense: '',
  })

  // Load existing word data in edit mode
  useEffect(() => {
    if (!isCreateMode && word && 'word' in word) {
      const otherWord = word as OtherWord

      setFormData({
        word: otherWord.word || '',
        hiragana: otherWord.hiragana || '',
        sense: otherWord.sense || '',
      })
    }
  }, [word, isCreateMode])

  // Prepopulate form data from Jisho in create mode
  useEffect(() => {
    if (isCreateMode && prepopulatedData) {
      setFormData(prev => ({
        ...prev,
        word: prepopulatedData.word,
        hiragana: prepopulatedData.hiragana,
        sense: prepopulatedData.sense,
      }))
    }
  }, [prepopulatedData, isCreateMode])

  const handleFieldChange = (field: keyof OtherWord, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (isCreateMode) {
      // Create new word
      saveWordMutation.mutate(
        {
          data: formData,
        },
        {
          onSuccess: result => {
            // Navigate to the newly created word's detail page
            if (result && 'id' in result) {
              const currentPath = window.location.pathname
              const detailPath = currentPath.replace('/create', `/${result.id}`)

              navigate(detailPath)
            }
          },
        },
      )
    } else {
      // Update existing word
      if (!actualWordId) {
        return
      }

      saveWordMutation.mutate(
        {
          id: parseInt(actualWordId, NUMBERS.DECIMAL_RADIX),
          data: formData,
        },
        {
          onSuccess: () => {
            // Navigate back to detail view
            const currentPath = window.location.pathname
            const detailPath = currentPath.replace('/edit', '')

            navigate(detailPath)
          },
        },
      )
    }
  }

  const handleCancel = () => {
    if (isCreateMode) {
      // Navigate back to list
      const currentPath = window.location.pathname
      const listPath = currentPath.replace('/create', '')

      navigate(listPath)
    } else {
      // Navigate back to detail view
      const currentPath = window.location.pathname
      const detailPath = currentPath.replace('/edit', '')

      navigate(detailPath)
    }
  }

  const handleSearchInputChange = (value: string) => {
    setSearchInputValue(value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === NUMBERS.ENTER_KEY_CODE) {
      e.preventDefault()
      const value = searchInputValue.trim()

      if (value) {
        searchWord(value)
        setSelectedSenseIndex(null)
      } else {
        searchWord('')
        setSelectedSenseIndex(null)
      }
    }
  }

  const handleSlugSelect = (slugOption: JishoSlugOption) => {
    selectSlug(slugOption)
    setSelectedSenseIndex(null)
  }

  const handleJapaneseOptionSelect = (japaneseOption: JishoWordOption) => {
    selectJapaneseOption(japaneseOption)
    setSelectedSenseIndex(null)
  }

  const handleSenseSelect = (senseIndex: number) => {
    setSelectedSenseIndex(senseIndex)
    selectSense(senseIndex)
  }

  if (!isCreateMode && isLoading) {
    return <div>Loading...</div>
  }

  if (!isCreateMode && !word) {
    return null
  }

  return (
    <Root className={classes.wordEditor}>
      {isCreateMode ? (
        <div className={classes.formSection}>
          <Typography
            sx={{
              marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM,
              color: colors.shibafuGreen,
            }}
            variant='h5'
          >
            Create New Word
          </Typography>
          <Typography
            sx={{
              marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM,
              color: colors.kujakuishiGreen,
            }}
            variant='body2'
          >
            Search for a word to prepopulate fields, or enter manually
          </Typography>

          {/* Search Input */}
          <TextField
            autoFocus={isCreateMode}
            disabled={isJishoLoading}
            fullWidth
            helperText='Type your search and press Enter to search'
            label='Search Word'
            onChange={e => handleSearchInputChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            sx={{
              marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM,
              '& .MuiOutlinedInput-input': { color: colors.shibafuGreen },
            }}
            value={searchInputValue}
          />

          {/* Slug Selection Dropdown */}
          {slugOptions.length > 0 && (
            <FormControl
              className={classes.selectField}
              fullWidth
              sx={{ marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM }}
              variant='outlined'
            >
              <InputLabel>Select Entry (Slug)</InputLabel>
              <Select
                label='Select Entry (Slug)'
                onChange={e => {
                  const slug = slugOptions.find(s => s.slug === e.target.value)

                  if (slug) {
                    handleSlugSelect(slug)
                  }
                }}
                value={selectedSlug?.slug || ''}
              >
                {slugOptions.map(slugOption => (
                  <MenuItem key={slugOption.slug} value={slugOption.slug}>
                    {slugOption.slug}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Japanese Option Selection Dropdown */}
          {selectedSlug && selectedSlug.japanese.length > 0 && (
            <FormControl
              className={classes.selectField}
              fullWidth
              sx={{ marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM }}
              variant='outlined'
            >
              <InputLabel>Select Japanese Form</InputLabel>
              <Select
                label='Select Japanese Form'
                onChange={e => {
                  const japanese = selectedSlug.japanese.find(
                    j => j.word === e.target.value,
                  )

                  if (japanese) {
                    handleJapaneseOptionSelect(japanese)
                  }
                }}
                value={selectedJapaneseOption?.word || ''}
              >
                {selectedSlug.japanese.map(japanese => (
                  <MenuItem
                    key={`${japanese.word}-${japanese.reading}`}
                    value={japanese.word || ''}
                  >
                    {japanese.word || ''} ({japanese.reading || ''})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Sense Selection Dropdown */}
          {selectedJapaneseOption && availableSenses.length > 0 && (
            <FormControl
              className={classes.selectField}
              fullWidth
              sx={{ marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM }}
              variant='outlined'
            >
              <InputLabel>Select Sense/Definition</InputLabel>
              <Select
                label='Select Sense/Definition'
                onChange={e => {
                  const senseIndex = parseInt(
                    e.target.value as string,
                    NUMBERS.DECIMAL_RADIX,
                  )

                  if (!isNaN(senseIndex)) {
                    handleSenseSelect(senseIndex)
                  }
                }}
                value={selectedSenseIndex !== null ? selectedSenseIndex : ''}
              >
                {availableSenses.map((sense, index) => {
                  const senseKey = `${sense.definitions.join('-')}-${index}`

                  return (
                    <MenuItem key={senseKey} value={index}>
                      {sense.definitions.join('; ')}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          )}
        </div>
      ) : (
        <>
          <WordTitle hiragana={formData.hiragana || ''} word={formData.word || ''} />
          <div className={classes.editorActions}>
            <Button
              className={classes.saveButton}
              disabled={saveWordMutation.isPending || !actualWordId}
              onClick={handleSave}
              type='button'
            >
              {saveWordMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
            <Button
              className={classes.cancelButton}
              disabled={saveWordMutation.isPending}
              onClick={handleCancel}
              type='button'
            >
              Cancel
            </Button>
          </div>
        </>
      )}

      <div className={classes.formSection}>
        <div className={classes.mainFields}>
          <div className={classes.formRow}>
            <span className={classes.label}>Word</span>
            <TextField
              className={classes.formField}
              fullWidth
              label='Word'
              onChange={e => handleFieldChange('word', e.target.value)}
              value={formData.word || ''}
              variant='outlined'
            />
          </div>
          <div className={classes.formRow}>
            <span className={classes.label}>Hiragana</span>
            <TextField
              className={classes.formField}
              fullWidth
              label='Hiragana'
              onChange={e => handleFieldChange('hiragana', e.target.value)}
              value={formData.hiragana || ''}
              variant='outlined'
            />
          </div>
        </div>
      </div>

      <div className={classes.formSection}>
        <Typography
          sx={{
            marginBottom: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM,
            color: colors.shibafuGreen,
          }}
          variant='h6'
        >
          Sense
        </Typography>
        <TextField
          className={classes.senseField}
          fullWidth
          label='Sense'
          multiline
          onChange={e => handleFieldChange('sense', e.target.value)}
          rows={UI_DIMENSIONS.FORM_FIELD_ROWS}
          value={formData.sense || ''}
          variant='outlined'
        />
      </div>

      {/* Create/Cancel buttons at bottom for create mode */}
      {isCreateMode && (
        <div className={classes.editorActions}>
          <Button
            className={classes.saveButton}
            disabled={saveWordMutation.isPending}
            onClick={handleSave}
            type='button'
          >
            {saveWordMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            className={classes.cancelButton}
            disabled={saveWordMutation.isPending}
            onClick={handleCancel}
            type='button'
          >
            Cancel
          </Button>
        </div>
      )}
    </Root>
  )
}

export default OtherEditor
