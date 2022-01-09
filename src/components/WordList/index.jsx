import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { pickBy, keys as getKeysInObj } from 'lodash'

import {
  mainResourceFields,
  mainResourceFilterables,
  getWordGroupIconMatch,
} from 'src/constants/resources'
import { adjTypes } from 'src/constants/jisho'
import { deserializeBoolList } from 'src/utils/boolean'
import { getCurrentContentType } from 'src/selectors/nav'
import { getWordListData } from 'src/selectors/wordList'
import WordGroupIcon from 'src/components/common/WordGroupIcon'
import WordListTableHead from 'src/components/WordList/WordListTableHead'
import WordListTable from 'src/components/WordList/WordListTable'

const PREFIX = 'WordList'

const classes = {
  wordList: `${PREFIX}-wordList`,
}

const Root = styled('div')(() => ({
  [`&.${classes.wordList}`]: {
    display: 'inline-block',
    width: '30%',
    maxWidth: 270,
    verticalAlign: 'top',
  },
}))

const DISPLAYABLE_FIELDS_MAP = Object.keys(mainResourceFields).reduce(
  (acc, t) => ({
    ...acc,
    [t]: Object.keys(mainResourceFields[t]).filter(
      k => deserializeBoolList(mainResourceFields[t][k])[0]
    ),
  }),
  {}
)

const FILTERABLE_FIELDS_MAP = { ...mainResourceFilterables }

const WordList = () => {
  const currentContentType = useSelector(getCurrentContentType)
  const words = useSelector(getWordListData)

  const [filterOptionsMap, setFilterOptionsMap] = useState(null)
  const [displayOptionsMap, setDisplayOptionsMap] = useState(null)

  useEffect(() => {
    setDisplayOptionsMap(
      DISPLAYABLE_FIELDS_MAP[currentContentType]
        ? DISPLAYABLE_FIELDS_MAP[currentContentType].reduce(
            (acc, t) => ({ ...acc, [t]: true }),
            {}
          )
        : null
    )
    setFilterOptionsMap(
      FILTERABLE_FIELDS_MAP[currentContentType]
        ? FILTERABLE_FIELDS_MAP[currentContentType].reduce(
            (acc, t) => ({ ...acc, [t]: true }),
            {}
          )
        : null
    )
  }, [currentContentType])

  return displayOptionsMap ? (
    <Root className={classes.wordList}>
      <WordListTableHead
        displayOptionsMap={displayOptionsMap}
        filterOptionsMap={filterOptionsMap}
        onCreateClick={() => true}
        onDisplayChange={setDisplayOptionsMap}
        onFilterChange={setFilterOptionsMap}
      />
      <WordListTable
        columns={getKeysInObj(pickBy(displayOptionsMap, t => t)) || []}
        wordToRow={t => ({
          ...t,
          ...(t.group && { group: <WordGroupIcon type={t.group} /> }),
          ...(t.isIConjugation !== undefined && {
            isIConjugation: (
              <WordGroupIcon type={t.isIConjugation ? adjTypes.IADJ : adjTypes.NAADJ} />
            ),
          }),
        })}
        words={words.filter(t => {
          if (t.group)
            return filterOptionsMap[getWordGroupIconMatch(t.group)?.filterKey ?? '']
          if (t.isIConjugation !== undefined)
            return filterOptionsMap[
              getWordGroupIconMatch(t.isIConjugation ? 'IADJ' : 'NAADJ')?.filterKey ?? ''
            ]

          return true
        })}
      />
    </Root>
  ) : null
}

export default WordList
