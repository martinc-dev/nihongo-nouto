import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'

import { colors } from 'src/themes/colors'
import { useWordSearch } from 'src/hooks/useWordSearch'
import { JishoWordOption } from 'src/types/words'
import { KEYCODES } from "src/constants/events"
import { UI_DIMENSIONS } from "src/themes/sizes"

interface WordSearchInputProps {
  onInputBlur: () => void
  onWordChange: (value: string) => void
  onWordSelect: (option: JishoWordOption) => void
  initWord?: string
}

const WordSearchInput = ({
  onInputBlur,
  onWordChange,
  onWordSelect,
  initWord = '',
}: WordSearchInputProps) => {
  const [word, setWord] = useState('')
  const [searchResult, setSearchResult] = useState<{ wordOptions?: JishoWordOption[] } | null>(null)
  const wordSearchMutation = useWordSearch()

  useEffect(() => {
    if (initWord) setWord(initWord)
    setSearchResult(null)
  }, [initWord])

  return (
    <Autocomplete
      filterOptions={t => t}
      freeSolo
      getOptionLabel={option => (typeof option === 'string' ? option : option.word || '')}
      onBlur={onInputBlur}
      onChange={(_, option) => {
        if (!option || typeof option === 'string') return
        onWordSelect(option)
      }}
      onInputChange={(_, value) => {
        setWord(value)
        onWordChange(value)
      }}
      options={searchResult?.wordOptions ?? []}
      renderInput={params => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // Disable autocomplete and autofill
          }}
          label='Word'
          onKeyDown={e => {
            if (e.keyCode === KEYCODES.ENTER_KEY_CODE && word) {
              setSearchResult(null)
              wordSearchMutation.mutate(word, {
                onSuccess: (data) => {
                  setSearchResult(data)
                },
              })
            }
          }}
          sx={{ '& .MuiOutlinedInput-input': { color: colors.shibafuGreen } }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{
            '&.MuiBox-root.MuiAutocomplete-option': { justifyContent: 'space-between' },
          }}
          {...props}
        >
          <Typography
            sx={{ fontSize: UI_DIMENSIONS.FONT_SIZE_LARGE, color: colors.shibafuGreen }}
            variant='subtitle1'
          >
            {typeof option === 'string' ? option : option.word}
          </Typography>
          <Typography sx={{ fontSize: UI_DIMENSIONS.FONT_SIZE_MEDIUM }} variant='subtitle1'>
            {typeof option === 'string' ? '' : option.reading}
          </Typography>
        </Box>
      )}
      sx={{ width: UI_DIMENSIONS.WORD_SEARCH_INPUT_WIDTH }}
      value={{ word }}
    />
  )
}

export default WordSearchInput

