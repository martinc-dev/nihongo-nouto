import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'

import { colors } from 'src/themes/colors'
import { fetchWordSearchAction, fetchWordSearchActionReset } from 'src/actions/search'
import { getSearchStoreSearchData } from 'src/selectors/search'

const WordSearchInput = ({ onInputBlur, onWordChange, onWordSelect, initWord = '' }) => {
  const [word, setWord] = useState('')

  const dispatch = useDispatch()
  const searchResult = useSelector(getSearchStoreSearchData)

  useEffect(() => {
    if (initWord) setWord(initWord)
    dispatch(fetchWordSearchActionReset())
  }, [initWord])

  return (
    <Autocomplete
      filterOptions={t => t}
      freeSolo
      getOptionLabel={option => option.word}
      onBlur={onInputBlur}
      onChange={(_, option) => {
        if (!option) return
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

            if (searchResult) dispatch(fetchWordSearchActionReset())
            if (e.keyCode === enterKeyCode && word) dispatch(fetchWordSearchAction(word))
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
            {option.word}
          </Typography>
          <Typography sx={{ fontSize: 14 }} variant='subtitle1'>
            {option.reading}
          </Typography>
        </Box>
      )}
      sx={{ width: 250 }}
      value={{ word }}
    />
  )
}

WordSearchInput.propTypes = {
  initWord: PropTypes.string.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  onWordChange: PropTypes.func.isRequired,
  onWordSelect: PropTypes.func.isRequired,
}

export default WordSearchInput
