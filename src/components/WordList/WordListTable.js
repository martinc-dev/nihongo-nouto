import PropTypes from 'prop-types'
import { styled } from '@mui/styles'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'

const PREFIX = 'WordListTable'

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  tableRow: `${PREFIX}-tableRow`,
  tableCell: `${PREFIX}-tableCell`,
  tableCellHead: `${PREFIX}-tableCellHead`,
  tableCellHeadContent: `${PREFIX}-tableCellHeadContent`,
  tableCellContent: `${PREFIX}-tableCellContent`,
}

const StyledTableContainer = styled(TableContainer)({
  [`&.${classes.root}`]: {
    boxShadow: 'none',
  },
  [`& .${classes.table}`]: {
    width: '100%',
  },
  [`& .${classes.tableRow}`]: {
    maxWidth: '270px',
  },
  [`& .${classes.tableCell}`]: {
    padding: 0,
    border: 0,
    maxWidth: '60px',
  },
  [`& .${classes.tableCellHead}`]: {
    padding: 0,
    border: 0,
    maxWidth: '60px',
  },
  [`& .${classes.tableCellHeadContent}`]: {
    display: 'inline-block',
    maxWidth: 60,
    verticalAlign: 'middle',
  },
  [`& .${classes.tableCellContent}`]: {
    display: 'inline-block',
    maxWidth: 60,
    verticalAlign: 'middle',
  },
})

const WordListTable = ({ wordToRow, words, columns }) => {
  const currentContentType = useSelector(getCurrentContentType)
  const resourcePath = resourceTypes[currentContentType]?.path ?? null

  return (
    <StyledTableContainer className={classes.root} component={Paper}>
      <Table aria-label='word list table' className={classes.table} size='small'>
        <TableBody>
          {words.map(word => {
            const row = wordToRow(word)

            return (
              <TableRow className={classes.tableRow} key={row.id}>
                {columns.map((column, idx) =>
                  !idx ? (
                    <TableCell
                      align='center'
                      className={classes.tableCellHead}
                      component='th'
                      key={column}
                      scope='row'
                    >
                      <Typography
                        className={classes.tableCellHeadContent}
                        component='div'
                        noWrap
                        variant='caption'
                      >
                        <Link to={`/${resourcePath}/${row.id}`}>{row[column]}</Link>
                      </Typography>
                    </TableCell>
                  ) : (
                    <TableCell align='center' className={classes.tableCell} key={column}>
                      <Typography
                        className={classes.tableCellContent}
                        component='div'
                        noWrap
                        variant='caption'
                      >
                        <Link to={`/${resourcePath}/${row.id}`}>{row[column]}</Link>
                      </Typography>
                    </TableCell>
                  )
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

WordListTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  wordToRow: PropTypes.func.isRequired,
  words: PropTypes.array.isRequired,
}

export default WordListTable
