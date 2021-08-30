import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
  },
  table: {
    width: '100%',
  },
  tableRow: {
    maxWidth: '270px',
  },
  tableCell: {
    padding: 0,
    border: 0,
    maxWidth: '60px',
  },
  tableCellHead: {
    padding: 0,
    border: 0,
    maxWidth: '60px',
  },
  tableCellHeadContent: {
    display: 'inline-block',
    maxWidth: 60,
    verticalAlign: 'middle',
  },
  tableCellContent: {
    display: 'inline-block',
    maxWidth: 60,
    verticalAlign: 'middle',
  },
})

const WordListTable = ({ wordToRow, words, columns }) => {
  const classes = useStyles()
  const currentContentType = useSelector(getCurrentContentType)
  const resourcePath = resourceTypes[currentContentType]?.path ?? null

  return (
    <TableContainer className={classes.root} component={Paper}>
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
    </TableContainer>
  )
}

WordListTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  wordToRow: PropTypes.func.isRequired,
  words: PropTypes.array.isRequired,
}

export default WordListTable
