import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactNode } from 'react'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'
import { RootState } from 'src/types/redux'
import { WordListItem, VerbGroup } from 'src/types/words'

const PREFIX = 'WordListTable'

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  tableRow: `${PREFIX}-tableRow`,
  tableRowLink: `${PREFIX}-tableRowLink`,
  tableCell: `${PREFIX}-tableCell`,
  tableCellHead: `${PREFIX}-tableCellHead`,
  tableCellHeadContent: `${PREFIX}-tableCellHeadContent`,
  tableCellContent: `${PREFIX}-tableCellContent`,
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [`&.${classes.root}`]: {
    boxShadow: 'none',
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100%',
  },
  [`& .${classes.table}`]: {
    width: '100%',
    tableLayout: 'fixed',
  },
  [`& .${classes.tableRow}`]: {
    maxWidth: 'none',
    cursor: 'pointer',
  },
  [`& .${classes.tableCell}`]: {
    padding: theme.spacing(1),
    border: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0.5),
    },
  },
  [`& .${classes.tableCellHead}`]: {
    padding: theme.spacing(1),
    border: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0.5),
    },
  },
  [`& .${classes.tableCellHeadContent}`]: {
    display: 'block',
    maxWidth: '100%',
    verticalAlign: 'middle',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [`& .${classes.tableCellContent}`]: {
    display: 'block',
    maxWidth: '100%',
    verticalAlign: 'middle',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

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

interface WordListTableProps {
  wordToRow: (word: WordListItem) => WordListTableRow
  words: WordListItem[]
  columns: string[]
}

const WordListTable = ({ wordToRow, words, columns }: WordListTableProps) => {
  const currentContentType = useSelector((state: RootState) =>
    getCurrentContentType(state),
  )
  const navigate = useNavigate()

  const resourcePath = currentContentType
    ? (resourceTypes[currentContentType]?.path ?? null)
    : null

  const getTooltipTitle = (
    value: string | number | boolean | VerbGroup | null | undefined | ReactNode,
  ): string => {
    if (value === null || value === undefined) {
      return ''
    }

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return String(value)
    }

    return ''
  }

  return (
    <StyledTableContainer className={classes.root}>
      <Table aria-label='word list table' className={classes.table} size='small'>
        <TableBody>
          {words.map(word => {
            const row = wordToRow(word)

            return (
              <TableRow
                className={classes.tableRow}
                key={row.id}
                onClick={() => navigate(`/${resourcePath}/${row.id}`)}
              >
                {columns.map((column, idx) =>
                  !idx ? (
                    <TableCell
                      align='center'
                      className={classes.tableCellHead}
                      component='th'
                      key={column}
                      scope='row'
                    >
                      <Tooltip arrow title={getTooltipTitle(row[column])}>
                        <Typography
                          className={classes.tableCellHeadContent}
                          component='div'
                          noWrap
                          variant='caption'
                        >
                          {row[column] ?? ''}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  ) : (
                    <TableCell align='center' className={classes.tableCell} key={column}>
                      <Tooltip arrow title={getTooltipTitle(row[column])}>
                        <Typography
                          className={classes.tableCellContent}
                          component='div'
                          noWrap
                          variant='caption'
                        >
                          {row[column] ?? ''}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  ),
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default WordListTable
