import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

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
  },
  name: {},
  value: {},
  suffix: {}
})

const VerbConjFormRow = ({ aDan, stem, word, eDan, oDan, conjugation }) => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size='small'>
        <TableBody>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>A</span>
              <span className={classes.value}>{aDan}</span>
              <span className={classes.suffix}>ない</span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>I</span>
              <span className={classes.value}>{stem}</span>
              <span className={classes.suffix}>ます</span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>U</span>
              <span className={classes.value}>{word}</span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>E</span>
              <span className={classes.value}>
                {conjugation['short potential'] || eDan}
              </span>
              {!conjugation['short potential'] && (
                <span className={classes.suffix}>〜</span>
              )}
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>O</span>
              <span className={classes.value}>
                {conjugation['pseudo futurum'] || oDan}
              </span>
              {!conjugation['pseudo futurum'] && (
                <span className={classes.suffix}>〜</span>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

VerbConjFormRow.propTypes = {
  aDan: PropTypes.string.isRequired,
  conjugation: PropTypes.object.isRequired,
  eDan: PropTypes.string.isRequired,
  oDan: PropTypes.string.isRequired,
  stem: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired
}

export default VerbConjFormRow
