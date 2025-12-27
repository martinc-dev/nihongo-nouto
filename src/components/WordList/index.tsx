import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { pickBy, keys as getKeysInObj } from 'lodash'
import { ReactNode } from 'react'

import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'

import {
  mainResourceFields,
  mainResourceFilterables,
  nounTags,
} from 'src/constants/resources'
import { adjTypes } from 'src/constants/jisho'
import { deserializeBoolList } from 'src/utils/boolean'
import { PAGINATION } from 'src/constants/pagination'
import { KEYCODES } from 'src/constants/events'
import { UI_DIMENSIONS } from 'src/themes/sizes'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { WordListItem, VerbGroup, NounTagRelItem } from 'src/types/words'
import { useWordList } from 'src/hooks/useWordList'
import WordGroupIcon from 'src/components/common/WordGroupIcon'
import WordTagIcon from 'src/components/common/WordTagIcon'
import WordListTableHead from 'src/components/WordList/WordListTableHead'
import WordListTable from 'src/components/WordList/WordListTable'
import resourceTypes from 'src/constants/resourceTypes'
import LocalStorageUtil from 'src/utils/localStorage'

const PREFIX = 'WordList'

const classes = {
  wordList: `${PREFIX}-wordList`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.wordList}`]: {
    display: 'inline-block',
    width: UI_DIMENSIONS.WORD_LIST_WIDTH,
    maxWidth: UI_DIMENSIONS.WORD_LIST_MAX_WIDTH,
    paddingRight: UI_DIMENSIONS.WORD_LIST_PADDING_RIGHT,
    verticalAlign: 'top',
    [theme.breakpoints.down('xl')]: {
      width: UI_DIMENSIONS.WORD_LIST_MAX_WIDTH_MOBILE,
      maxWidth: UI_DIMENSIONS.WORD_LIST_MAX_WIDTH_MOBILE,
    },
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
  tags?: ReactNode
  [key: string]: string | number | boolean | VerbGroup | null | undefined | ReactNode
}

const WordList = () => {
  const navigate = useNavigate()
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )
  const [page, setPage] = useState(() => {
    const storageKey = `wordList_page_${currentContentType}`

    return LocalStorageUtil.getNumber(storageKey, PAGINATION.DEFAULT_PAGE)
  })
  const [limit] = useState(PAGINATION.DEFAULT_WORD_LIST_LIMIT)
  const [orderBy, setOrderBy] = useState<string>('id')
  const [isAsc, setIsAsc] = useState<boolean>(true)
  const [filterOptionsMap, setFilterOptionsMap] = useState<Record<
    string,
    boolean
  > | null>(null)
  const [displayOptionsMap, setDisplayOptionsMap] = useState<Record<
    string,
    boolean
  > | null>(null)

  const activeFilters = filterOptionsMap
    ? Object.keys(filterOptionsMap).filter(key => filterOptionsMap[key])
    : []

  const prevOrderByRef = useRef<string>(orderBy)
  const prevIsAscRef = useRef<boolean>(isAsc)
  const prevActiveFiltersRef = useRef<string>(activeFilters.join(','))
  const prevCurrentContentTypeRef = useRef<string | null>(currentContentType)

  const { data, isLoading, error } = useWordList({
    page,
    limit,
    orderBy,
    isAsc,
    filters: activeFilters,
    enabled: !!currentContentType && !!displayOptionsMap && !!filterOptionsMap,
  })

  const words = data?.data ?? []
  const pagination = data?.pagination

  useEffect(() => {
    if (
      prevCurrentContentTypeRef.current &&
      prevCurrentContentTypeRef.current !== currentContentType
    ) {
      setPage(PAGINATION.DEFAULT_PAGE)

      const prevStorageKey = `wordList_page_${prevCurrentContentTypeRef.current}`

      LocalStorageUtil.remove(prevStorageKey)
    }

    prevCurrentContentTypeRef.current = currentContentType
  }, [currentContentType])

  useEffect(() => {
    const orderByChanged = prevOrderByRef.current && prevOrderByRef.current !== orderBy
    const isAscChanged = prevIsAscRef.current && prevIsAscRef.current !== isAsc
    const filtersChanged =
      prevActiveFiltersRef.current &&
      prevActiveFiltersRef.current !== activeFilters.join(',')

    if (orderByChanged || isAscChanged || filtersChanged) {
      setPage(PAGINATION.DEFAULT_PAGE)

      const storageKey = `wordList_page_${prevCurrentContentTypeRef.current}`

      LocalStorageUtil.remove(storageKey)
    }
    prevOrderByRef.current = orderBy
    prevIsAscRef.current = isAsc
    prevActiveFiltersRef.current = activeFilters.join(',')
  }, [orderBy, isAsc, activeFilters])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)

    const storageKey = `wordList_page_${currentContentType}`

    LocalStorageUtil.setNumber(storageKey, value)
    // Scroll to top of word list when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCreateClick = () => {
    if (currentContentType) {
      const resourcePath = resourceTypes[currentContentType]?.pathName

      if (resourcePath) {
        navigate(`/${resourcePath}/create`)
      }
    }
  }

  const handleSortChange = (newOrderBy: string) => {
    if (newOrderBy === orderBy) {
      setIsAsc(!isAsc)
    } else {
      setOrderBy(newOrderBy)
      setIsAsc(true)
    }
  }

  const handleFilterChange = (map: Record<string, boolean> | null) => {
    setFilterOptionsMap(map)
  }

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

  if (isLoading || !currentContentType || !displayOptionsMap || !filterOptionsMap) {
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
        isAsc={isAsc}
        onCreateClick={handleCreateClick}
        onDisplayChange={setDisplayOptionsMap}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        orderBy={orderBy}
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
                <div
                  style={{
                    display: 'flex',
                    gap: `${UI_DIMENSIONS.SPACING_XS}px`,
                    flexWrap: 'wrap',
                  }}
                >
                  {tagIcons}
                </div>
              )
            }
          }

          return row
        }}
        words={words}
      />
      {pagination && pagination.totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: UI_DIMENSIONS.FORM_FIELD_MARGIN_BOTTOM,
          }}
        >
          <Pagination
            color='primary'
            count={pagination.totalPages}
            onChange={handlePageChange}
            page={pagination.page}
            size='small'
          />
        </Box>
      )}
    </Root>
  ) : null
}

export default WordList
