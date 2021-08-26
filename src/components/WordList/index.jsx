import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { pickBy, keys as getKeysInObj } from 'lodash'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { mainResourceFields, mainResourceFilterables } from 'src/constants/resources'
import { adjTypes } from 'src/constants/jisho'
import { deserializeBoolList } from 'src/utils/boolean'
import { getCurrentContentType } from 'src/selectors/nav'
import { getWordListData } from 'src/selectors/wordList'
import WordGroupIcon from 'src/components/common/WordGroupIcon'
import WordListTableHead from 'src/components/WordList/WordListTableActions'
import WordListTable from 'src/components/WordList/WordListTable'

const useStyles = makeStyles(() =>
  createStyles({
    wordList: {
      display: 'inline-block',
      width: '30%',
      verticalAlign: 'top'
    }
  })
)

const DISPLAYABLE_FIELDS_MAP = Object.keys(mainResourceFields).reduce(
  (acc, t) => ({
    ...acc,
    [t]: Object.keys(mainResourceFields[t]).filter(
      k => deserializeBoolList(mainResourceFields[t][k])[0]
    )
  }),
  {}
)

const FILTERABLE_FIELDS_MAP = { ...mainResourceFilterables }

const WordList = () => {
  const classes = useStyles()
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

  return filterOptionsMap && displayOptionsMap ? (
    <div className={classes.wordList}>
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
          ...(t.isIConjugation && {
            isIConjugation: (
              <WordGroupIcon type={t.isIConjugation ? adjTypes.IADJ : adjTypes.NAADJ} />
            )
          })
        })}
        words={words}
      />
    </div>
  ) : null
}

export default WordList
