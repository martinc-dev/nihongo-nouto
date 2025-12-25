import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'

import { colors } from 'src/themes/colors'
import { useWordSearch } from 'src/hooks/useWordSearch'
import { JishoWordOption } from 'src/types/words'

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
            const enterKeyCode = 13

            if (e.keyCode === enterKeyCode && word) {
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
            sx={{ fontSize: 16, color: colors.shibafuGreen }}
            variant='subtitle1'
          >
            {typeof option === 'string' ? option : option.word}
          </Typography>
          <Typography sx={{ fontSize: 14 }} variant='subtitle1'>
            {typeof option === 'string' ? '' : option.reading}
          </Typography>
        </Box>
      )}
      sx={{ width: 250 }}
      value={{ word }}
    />
  )
}

export default WordSearchInput

