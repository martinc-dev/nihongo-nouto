/* eslint-disable max-lines */
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { KEYCODES } from 'src/constants/events'
import { NUMBERS } from 'src/constants/numbers'
import { UI_DIMENSIONS } from 'src/themes/sizes'
import WordEditorContainer, {
  editorClasses,
} from 'src/components/WordDashboard/WordEditorContainer'

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
      saveWordMutation.mutate(
        {
          data: formData,
        },
        {
          onSuccess: result => {
            if (result && 'id' in result) {
              const currentPath = window.location.pathname
              const detailPath = currentPath.replace('/create', `/${result.id}`)

              navigate(detailPath)
            }
          },
        },
      )
    } else {
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
      const currentPath = window.location.pathname
      const listPath = currentPath.replace('/create', '')

      navigate(listPath)
    } else {
      const currentPath = window.location.pathname
      const detailPath = currentPath.replace('/edit', '')

      navigate(detailPath)
    }
  }

  const handleSearchInputChange = (value: string) => {
    setSearchInputValue(value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KEYCODES.ENTER_KEY_CODE) {
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
    <WordEditorContainer>
      {isCreateMode ? (
        <div className={editorClasses.formSection}>
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
          {slugOptions.length > 0 && (
            <FormControl
              className={editorClasses.selectField}
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
          {selectedSlug && selectedSlug.japanese.length > 0 && (
            <FormControl
              className={editorClasses.selectField}
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
          {selectedJapaneseOption && availableSenses.length > 0 && (
            <FormControl
              className={editorClasses.selectField}
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
          <div className={editorClasses.editorActions}>
            <Button
              className={editorClasses.saveButton}
              disabled={saveWordMutation.isPending || !actualWordId}
              onClick={handleSave}
              type='button'
            >
              {saveWordMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
            <Button
              className={editorClasses.cancelButton}
              disabled={saveWordMutation.isPending}
              onClick={handleCancel}
              type='button'
            >
              Cancel
            </Button>
          </div>
        </>
      )}

      <div className={editorClasses.formSection}>
        <div className={editorClasses.mainFields}>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Word</span>
            <TextField
              className={editorClasses.formField}
              fullWidth
              label='Word'
              onChange={e => handleFieldChange('word', e.target.value)}
              value={formData.word || ''}
              variant='outlined'
            />
          </div>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Hiragana</span>
            <TextField
              className={editorClasses.formField}
              fullWidth
              label='Hiragana'
              onChange={e => handleFieldChange('hiragana', e.target.value)}
              value={formData.hiragana || ''}
              variant='outlined'
            />
          </div>
        </div>
      </div>

      <div className={editorClasses.formSection}>
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
          className={editorClasses.senseField}
          fullWidth
          label='Sense'
          multiline
          onChange={e => handleFieldChange('sense', e.target.value)}
          rows={UI_DIMENSIONS.FORM_FIELD_ROWS}
          value={formData.sense || ''}
          variant='outlined'
        />
      </div>
      {isCreateMode && (
        <div className={editorClasses.editorActions}>
          <Button
            className={editorClasses.saveButton}
            disabled={saveWordMutation.isPending}
            onClick={handleSave}
            type='button'
          >
            {saveWordMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button
            className={editorClasses.cancelButton}
            disabled={saveWordMutation.isPending}
            onClick={handleCancel}
            type='button'
          >
            Cancel
          </Button>
        </div>
      )}
    </WordEditorContainer>
  )
}

export default OtherEditor
