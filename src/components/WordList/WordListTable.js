import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    width: '100%'
  }
})

const WordListTable = ({ wordToRow, words, columns }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table aria-label='word list table' className={classes.table} size='small'>
        <TableBody>
          {words.map(word => {
            const row = wordToRow(word)

            return (
              <TableRow key={row.id}>
                {columns.map((column, idx) =>
                  !idx ? (
                    <TableCell component='th' key={column} scope='row'>
                      {row[column]}
                    </TableCell>
                  ) : (
                    <TableCell align='right' key={column}>
                      {row[column]}
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
