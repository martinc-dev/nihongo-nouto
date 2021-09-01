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

const VerbConjFormRow = ({ group, word, conjugation }) => {
  const classes = useStyles()
  const isGoDan = group.includes('V5')

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size='small'>
        <TableBody>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>A</span>
              <span className={classes.value}>
                {(conjugation['plain negative'] || '').replace('ない', '')}
              </span>
              <span className={classes.suffix}>ない</span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>I</span>
              <span className={classes.value}>
                {(conjugation['polite affirmative'] || '').replace('ます', '')}
              </span>
              <span className={classes.suffix}>ます</span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>U</span>
              <span className={classes.value}>{word}</span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>E</span>
              <span className={classes.value}>
                {isGoDan
                  ? (conjugation['short potential'] || '').slice(0, -1)
                  : conjugation['verbstem']}
              </span>
              <span className={classes.suffix}>
                {isGoDan
                  ? 'る'
                  : conjugation['short potential'].replace(conjugation['verbstem'], '')}
              </span>
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              <span className={classes.name}>O</span>
              <span className={classes.value}>
                {isGoDan
                  ? (conjugation['pseudo futurum'] || '').slice(0, -1)
                  : conjugation['verbstem']}
              </span>
              <span className={classes.suffix}>
                {isGoDan
                  ? 'う'
                  : conjugation['pseudo futurum'].replace(conjugation['verbstem'], '')}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

VerbConjFormRow.propTypes = {
  conjugation: PropTypes.object.isRequired,
  group: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
}

export default VerbConjFormRow
