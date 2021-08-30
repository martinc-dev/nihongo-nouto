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
      display: 'inline-block',
      width: '50%',
      paddingLeft: 10,
      borderLeft: `1px solid ${theme.palette.kumoriBlue.main}`,
      boxShadow: 'none',
    },
    table: {
      width: '100%',
    },
    tableCell: {
      border: 0,
    },
    tableCellHead: {
      border: 0,
    },
    name: {
      marginRight: 20,
      padding: '0 5px',
      textTransform: 'Capitalize',
      color: theme.palette.kooriBlue.main,
    },
    value: {},
  })
)

const VerbConjFormAdditional = ({ conjugation }) => {
  const classes = useStyles()

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size='small'>
        <TableBody>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Te Form
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['te form']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Past Tense
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['past tense']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Plain Negative
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['plain negative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Passive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['passive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Hypothetical
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['hypothetical']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Causative
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['causative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Causative Passive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['causative passive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Past Hypothetical
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['past hypothetical']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Pseudo Futurum
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['pseudo futurum']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Commanding
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['commanding']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Authoritative
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['authoritative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Desire
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['desire']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Looks To Be The Case
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['looks to be the case']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Advisory
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['advisory']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Apparently The Case
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['apparently the case']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Claimed To Be The Case
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['claimed to be the case']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Curt Negative (archaic)
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['curt negative (archaic)']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Negative Imperative
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['negative imperative']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Negative Perfect
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['negative perfect']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Other&apos;s Desire
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation["other's desire"]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Past Presumptive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['past presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Plain Negative Presumptive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['plain negative presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Plain Presumptive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['plain presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Polite Negative (archaic)
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['polite negative (archaic)']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Polite Negative Presumptive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['polite negative presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Polite Presumptive
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['polite presumptive']}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left' className={`${classes.tableCell} ${classes.name}`}>
              Way Of Doing
            </TableCell>
            <TableCell align='left' className={`${classes.tableCell} ${classes.value}`}>
              {conjugation['way of doing']}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

VerbConjFormAdditional.propTypes = {
  conjugation: PropTypes.object.isRequired,
}

export default VerbConjFormAdditional
