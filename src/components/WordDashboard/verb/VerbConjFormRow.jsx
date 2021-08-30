/* eslint-disable dot-notation */
import PropTypes from 'prop-types'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      boxShadow: 'none',
      marginBottom: 10,
      borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
      borderRadius: 0,
    },
    table: {
      width: '100%',
    },
    tableCell: {
      border: 0,
      padding: '10px 0',
    },
    tableCellHead: {
      border: 0,
      padding: '10px 0',
    },
    name: {
      marginRight: 20,
      padding: '0 5px',
      textTransform: 'uppercase',
      borderRadius: 4,
      backgroundColor: theme.palette.soraBlue.main,
      color: theme.palette.prussianBlue.main,
    },
    value: {
      marginRight: 5,
    },
    suffix: {
      padding: '0 5px',
      borderRadius: 4,
      border: `1px solid ${theme.palette.kujakuishiGreen.main}`,
    },
  })
)

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
              <span className={classes.value}>
                {conjugation['verbstem'] ? conjugation['verbstem'] : word}
              </span>
              <span className={classes.suffix}>
                {conjugation['verbstem']
                  ? word.replace(conjugation['verbstem'], '')
                  : word}
              </span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>E</span>
              <span className={classes.value}>
                {conjugation['short potential'] ? conjugation['verbstem'] : eDan}
              </span>
              <span className={classes.suffix}>
                {conjugation['short potential']
                  ? conjugation['short potential'].replace(conjugation['verbstem'], '')
                  : '〜'}
              </span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>O</span>
              <span className={classes.value}>
                {conjugation['pseudo futurum'] ? conjugation['verbstem'] : oDan}
              </span>
              <span className={classes.suffix}>
                {conjugation['pseudo futurum']
                  ? conjugation['pseudo futurum'].replace(conjugation['verbstem'], '')
                  : '〜'}
              </span>
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
  word: PropTypes.string.isRequired,
}

export default VerbConjFormRow
