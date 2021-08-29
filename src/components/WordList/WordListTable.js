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

import resourceTypes from 'src/constants/resourceTypes'
import { getCurrentContentType } from 'src/selectors/nav'

const useStyles = makeStyles({
  root: {
    boxShadow: 'none'
  },
  table: {
    width: '100%'
  },
  tableCell: {
    border: 0
  },
  tableCellHead: {
    border: 0
  }
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
              <TableRow key={row.id}>
                {columns.map((column, idx) =>
                  !idx ? (
                    <TableCell
                      className={classes.tableCellHead}
                      component='th'
                      key={column}
                      scope='row'
                    >
                      <Link to={`/${resourcePath}/${row.id}`}>{row[column]}</Link>
                    </TableCell>
                  ) : (
                    <TableCell align='left' className={classes.tableCell} key={column}>
                      <Link to={`/${resourcePath}/${row.id}`}>{row[column]}</Link>
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
  words: PropTypes.array.isRequired
}

export default WordListTable
