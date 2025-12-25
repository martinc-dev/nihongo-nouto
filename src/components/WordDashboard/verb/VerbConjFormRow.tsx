/* eslint-disable dot-notation */
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { VerbWord } from 'src/types/words'
import { ConjugationResult } from 'src/utils/conjugation'

const PREFIX = 'VerbConjFormRow'

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  tableCell: `${PREFIX}-tableCell`,
  tableCellHead: `${PREFIX}-tableCellHead`,
  name: `${PREFIX}-name`,
  value: `${PREFIX}-value`,
  suffix: `${PREFIX}-suffix`,
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [`&.${classes.root}`]: {
    boxShadow: 'none',
    marginBottom: 10,
    borderBottom: `1px solid ${theme.palette.kumoriBlue.main}`,
    borderRadius: 0,
  },

  [`& .${classes.table}`]: {
    width: '100%',
  },

  [`& .${classes.tableCell}`]: {
    border: 0,
    padding: '10px 0',
  },

  [`& .${classes.tableCellHead}`]: {
    border: 0,
    padding: '10px 0',
  },

  [`& .${classes.name}`]: {
    marginRight: 20,
    padding: '0 5px',
    textTransform: 'uppercase',
    borderRadius: 4,
    backgroundColor: theme.palette.soraBlue.main,
    color: theme.palette.prussianBlue.main,
  },

  [`& .${classes.value}`]: {
    marginRight: 5,
  },

  [`& .${classes.suffix}`]: {
    padding: '0 5px',
    borderRadius: 4,
    border: `1px solid ${theme.palette.kujakuishiGreen.main}`,
  },
}))

interface VerbConjFormRowProps {
  group: VerbWord['group']
  word: VerbWord['word']
  conjugation: ConjugationResult
}

const VerbConjFormRow = ({ group, word, conjugation }: VerbConjFormRowProps) => {
  const isGoDan = group ? group.includes('V5') : false

  return (
    <StyledTableContainer className={classes.root}>
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
                  : (conjugation['short potential'] || '').replace(conjugation['verbstem'] || '', '')}
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
                  : (conjugation['pseudo futurum'] || '').replace(conjugation['verbstem'] || '', '')}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  )
}

export default VerbConjFormRow

