import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { pickBy, keys as getKeysInObj } from 'lodash'
import { ReactNode } from 'react'

import { styled } from '@mui/material/styles'

import {
  mainResourceFields,
  mainResourceFilterables,
  getWordGroupIconMatch,
  nounTags,
} from 'src/constants/resources'
import { adjTypes } from 'src/constants/jisho'
import { deserializeBoolList } from 'src/utils/boolean'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { WordListItem, VerbGroup, NounTagRelItem } from 'src/types/words'
import { useWordList } from 'src/hooks/useWordList'
import WordGroupIcon from 'src/components/common/WordGroupIcon'
import WordTagIcon from 'src/components/common/WordTagIcon'
import WordListTableHead from 'src/components/WordList/WordListTableHead'
import WordListTable from 'src/components/WordList/WordListTable'
import resourceTypes from 'src/constants/resourceTypes'

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
      k => deserializeBoolList(mainResourceFields[t][k])[0],
    ),
  }),
  {} as Record<string, string[]>,
)

const FILTERABLE_FIELDS_MAP = { ...mainResourceFilterables }

interface WordListTableRow {
  id: number
  word: string
  hiragana?: string
  romaji?: string
  group?: VerbGroup | ReactNode | null | undefined
  isIConjugation?: boolean | ReactNode | undefined
  sense?: string
  isTransitive?: boolean
  isIntransitive?: boolean
  tags?: ReactNode // For nouns - will be rendered as icons
  [key: string]: string | number | boolean | VerbGroup | null | undefined | ReactNode
}

const WordList = () => {
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )
  const { data: words = [], isLoading, error } = useWordList()

  const [filterOptionsMap, setFilterOptionsMap] = useState<Record<
    string,
    boolean
  > | null>(null)
  const [displayOptionsMap, setDisplayOptionsMap] = useState<Record<
    string,
    boolean
  > | null>(null)

  useEffect(() => {
    if (currentContentType) {
      setDisplayOptionsMap(
        DISPLAYABLE_FIELDS_MAP[currentContentType]
          ? DISPLAYABLE_FIELDS_MAP[currentContentType].reduce(
              (acc: Record<string, boolean>, t: string) => ({ ...acc, [t]: true }),
              {} as Record<string, boolean>,
            )
          : null,
      )
      setFilterOptionsMap(
        FILTERABLE_FIELDS_MAP[currentContentType]
          ? FILTERABLE_FIELDS_MAP[currentContentType].reduce(
              (acc: Record<string, boolean>, t: string) => ({ ...acc, [t]: true }),
              {} as Record<string, boolean>,
            )
          : null,
      )
    }
  }, [currentContentType])

  if (isLoading) {
    return (
      <Root className={classes.wordList}>
        <div>Loading...</div>
      </Root>
    )
  }

  if (error) {
    return (
      <Root className={classes.wordList}>
        <div>Error loading words: {error.error?.toString()}</div>
      </Root>
    )
  }

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
        wordToRow={(t: WordListItem): WordListTableRow => {
          const { nounTagRel, ...rest } = t
          const row: WordListTableRow = {
            ...rest,
            ...(t.group && { group: <WordGroupIcon type={t.group} /> }),
            ...(t.isIConjugation !== undefined && {
              isIConjugation: (
                <WordGroupIcon type={t.isIConjugation ? adjTypes.IADJ : adjTypes.NAADJ} />
              ),
            }),
          }

          // Add noun tags as icons for nouns
          if (
            currentContentType === resourceTypes.NOUN.key &&
            nounTagRel &&
            Array.isArray(nounTagRel) &&
            nounTagRel.length > 0
          ) {
            const tagIcons = nounTagRel
              .map((rel: NounTagRelItem) => {
                // Handle both nested nounTag and direct tagId lookup
                const tagName = rel.nounTag?.name

                if (!tagName) {
                  // Fallback: try to find tag by tagId if nounTag is not populated
                  if (rel.tagId) {
                    const tag = Object.values(nounTags).find(nt => nt.id === rel.tagId)

                    if (tag) {
                      return <WordTagIcon key={rel.tagId || rel.id} tagName={tag.name} />
                    }
                  }

                  return null
                }

                return <WordTagIcon key={rel.tagId || rel.id} tagName={tagName} />
              })
              .filter((icon): icon is JSX.Element => icon !== null)

            if (tagIcons.length > 0) {
              row.tags = (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {tagIcons}
                </div>
              )
            }
          }

          return row
        }}
        words={words.filter((t: WordListItem) => {
          if (t.group)
            return filterOptionsMap?.[getWordGroupIconMatch(t.group)?.filterKey ?? '']
          if (t.isIConjugation !== undefined)
            return filterOptionsMap?.[
              getWordGroupIconMatch(t.isIConjugation ? 'IADJ' : 'NAADJ')?.filterKey ?? ''
            ]

          return true
        })}
      />
    </Root>
  ) : null
}

export default WordList
