/* eslint-disable dot-notation */
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
  value: {}
})

const VerbConjFormAdditional = ({ conjugation }) => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size='small'>
        <TableBody>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Te Form
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['te form']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Past Tense
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['past tense']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Plain Negative
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['plain negative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Passive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['passive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Hypothetical
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['hypothetical']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Causative
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['causative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Causative Passive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['causative passive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Past Hypothetical
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['past hypothetical']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Pseudo Futurum
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['pseudo futurum']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Commanding
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['commanding']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Authoritative
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['authoritative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Desire
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['desire']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Looks To Be The Case
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['looks to be the case']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Advisory
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['advisory']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Apparently The Case
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['apparently the case']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Claimed To Be The Case
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['claimed to be the case']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Curt Negative (archaic)
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['curt negative (archaic)']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Negative Imperative
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['negative imperative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Negative Perfect
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['negative perfect']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Other&apos;s Desire
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation["other's desire"]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Past Presumptive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['past presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Plain Negative Presumptive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['plain negative presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Plain Presumptive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['plain presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Polite Negative (archaic)
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['polite negative (archaic)']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Polite Negative Presumptive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['polite negative presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Polite Presumptive
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['polite presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={classes.tableCell}>
              Way Of Doing
            </TableCell>
            <TableCell align='left' className={classes.tableCell}>
              {conjugation['way of doing']}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

VerbConjFormAdditional.propTypes = {
  conjugation: PropTypes.object.isRequired
}

export default VerbConjFormAdditional
