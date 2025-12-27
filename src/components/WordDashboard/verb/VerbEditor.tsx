/* eslint-disable max-lines */
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import { KEYCODES } from 'src/constants/events'
import { NUMBERS } from 'src/constants/numbers'
import { useWordDetail, useSaveWordDetail } from 'src/hooks/useWordDetail'
import { useVerbFromJisho } from 'src/hooks/useVerbFromJisho'
import { VerbWord, VerbGroup, JishoSlugOption, JishoWordOption } from 'src/types/words'
import WordTitle from 'src/components/WordDashboard/WordTitle'
import { colors } from 'src/themes/colors'
import WordEditorContainer, {
  editorClasses,
} from 'src/components/WordDashboard/WordEditorContainer'

const VERB_GROUPS: VerbGroup[] = [
  'V5U',
  'V5K',
  'V5KS',
  'V5G',
  'V5S',
  'V5T',
  'V5M',
  'V5B',
  'V5N',
  'V5R',
  'V1',
  'IRS',
  'IRK',
]

interface VerbEditorProps {
  wordId?: string | null
}

const VerbEditor = ({ wordId = null }: VerbEditorProps) => {
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
  } = useVerbFromJisho()

  const [searchInputValue, setSearchInputValue] = useState('')
  const [selectedSenseIndex, setSelectedSenseIndex] = useState<number | null>(null)

  const [formData, setFormData] = useState<Partial<VerbWord>>({
    word: '',
    hiragana: '',
    group: null,
    sense: '',
    stem: '',
    teForm: '',
    aDan: '',
    eDan: '',
    oDan: '',
    isTransitive: false,
    isIntransitive: false,
  })

  useEffect(() => {
    if (!isCreateMode && word && 'word' in word) {
      const verbWord = word as VerbWord

      setFormData({
        word: verbWord.word || '',
        hiragana: verbWord.hiragana || '',
        group: verbWord.group || null,
        sense: verbWord.sense || '',
        stem: verbWord.stem || '',
        teForm: verbWord.teForm || '',
        aDan: verbWord.aDan || '',
        eDan: verbWord.eDan || '',
        oDan: verbWord.oDan || '',
        isTransitive: verbWord.isTransitive || false,
        isIntransitive: verbWord.isIntransitive || false,
      })
    }
  }, [word, isCreateMode])

  useEffect(() => {
    if (isCreateMode && prepopulatedData) {
      setFormData(prev => ({
        ...prev,
        word: prepopulatedData.word,
        hiragana: prepopulatedData.hiragana,
        group: prepopulatedData.group,
        sense: prepopulatedData.sense,
        stem: prepopulatedData.stem,
        teForm: prepopulatedData.teForm,
        aDan: prepopulatedData.aDan,
        eDan: prepopulatedData.eDan,
        oDan: prepopulatedData.oDan,
        isTransitive: prepopulatedData.isTransitive,
        isIntransitive: prepopulatedData.isIntransitive,
      }))
    }
  }, [prepopulatedData, isCreateMode])

  const handleFieldChange = (
    field: keyof VerbWord,
    value: string | boolean | VerbGroup | null,
  ) => {
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
          <Typography sx={{ marginBottom: 2, color: colors.shibafuGreen }} variant='h5'>
            Create New Verb
          </Typography>
          <Typography
            sx={{ marginBottom: 2, color: colors.kujakuishiGreen }}
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
              marginBottom: 2,
              '& .MuiOutlinedInput-input': { color: colors.shibafuGreen },
            }}
            value={searchInputValue}
          />
          {slugOptions.length > 0 && (
            <FormControl
              className={editorClasses.selectField}
              fullWidth
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
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
                  const senseKey = `${sense.definitions.join('-')}-${sense.verbClassification || ''}-${index}`

                  return (
                    <MenuItem key={senseKey} value={index}>
                      {sense.definitions.join('; ')}
                      {sense.verbClassification && ` (${sense.verbClassification})`}
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
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Group</span>
            <FormControl
              className={editorClasses.selectField}
              fullWidth
              variant='outlined'
            >
              <InputLabel>Group</InputLabel>
              <Select
                label='Group'
                onChange={e => {
                  const { value } = e.target

                  handleFieldChange('group', value === '' ? null : (value as VerbGroup))
                }}
                value={formData.group || ''}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {VERB_GROUPS.map(group => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className={editorClasses.formSection}>
        <Typography sx={{ marginBottom: 2, color: colors.shibafuGreen }} variant='h6'>
          Conjugation Forms
        </Typography>
        <div className={editorClasses.conjugationFields}>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Stem</span>
            <TextField
              className={editorClasses.formField}
              label='Stem'
              onChange={e => handleFieldChange('stem', e.target.value)}
              value={formData.stem || ''}
              variant='outlined'
            />
          </div>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Te Form</span>
            <TextField
              className={editorClasses.formField}
              label='Te Form'
              onChange={e => handleFieldChange('teForm', e.target.value)}
              value={formData.teForm || ''}
              variant='outlined'
            />
          </div>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>A Dan</span>
            <TextField
              className={editorClasses.formField}
              label='A Dan'
              onChange={e => handleFieldChange('aDan', e.target.value)}
              value={formData.aDan || ''}
              variant='outlined'
            />
          </div>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>E Dan</span>
            <TextField
              className={editorClasses.formField}
              label='E Dan'
              onChange={e => handleFieldChange('eDan', e.target.value)}
              value={formData.eDan || ''}
              variant='outlined'
            />
          </div>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>O Dan</span>
            <TextField
              className={editorClasses.formField}
              label='O Dan'
              onChange={e => handleFieldChange('oDan', e.target.value)}
              value={formData.oDan || ''}
              variant='outlined'
            />
          </div>
        </div>
      </div>

      <div className={editorClasses.formSection}>
        <Typography sx={{ marginBottom: 2, color: colors.shibafuGreen }} variant='h6'>
          Properties
        </Typography>
        <div className={editorClasses.booleanFields}>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Transitive</span>
            <FormControl
              className={editorClasses.selectField}
              fullWidth
              variant='outlined'
            >
              <InputLabel>Transitive</InputLabel>
              <Select
                label='Transitive'
                onChange={e =>
                  handleFieldChange('isTransitive', e.target.value === 'true')
                }
                value={formData.isTransitive ? 'true' : 'false'}
              >
                <MenuItem value='true'>Yes</MenuItem>
                <MenuItem value='false'>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={editorClasses.formRow}>
            <span className={editorClasses.label}>Intransitive</span>
            <FormControl
              className={editorClasses.selectField}
              fullWidth
              variant='outlined'
            >
              <InputLabel>Intransitive</InputLabel>
              <Select
                label='Intransitive'
                onChange={e =>
                  handleFieldChange('isIntransitive', e.target.value === 'true')
                }
                value={formData.isIntransitive ? 'true' : 'false'}
              >
                <MenuItem value='true'>Yes</MenuItem>
                <MenuItem value='false'>No</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className={editorClasses.formSection}>
        <Typography sx={{ marginBottom: 2, color: colors.shibafuGreen }} variant='h6'>
          Sense
        </Typography>
        <TextField
          className={editorClasses.senseField}
          fullWidth
          label='Sense'
          multiline
          onChange={e => handleFieldChange('sense', e.target.value)}
          rows={4}
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

export default VerbEditor
