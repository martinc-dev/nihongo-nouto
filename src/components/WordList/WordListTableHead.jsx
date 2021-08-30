import { useState } from 'react'
import PropTypes from 'prop-types'
import clxn from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import FilterListIcon from '@material-ui/icons/FilterList'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  wordListTableHead: {
    '& svg': {
      width: 15,
      marginRight: 10,
      fill: theme.palette.kujakuishiGreen.main,
    },
  },
  filterMenu: {
    display: 'inline-block',
    '& button': {
      textTransform: 'capitalize',
      color: theme.palette.kujakuishiGreen.main,
    },
  },
  displayMenu: {
    display: 'inline-block',
    '& button': {
      textTransform: 'capitalize',
      color: theme.palette.kujakuishiGreen.main,
    },
  },
  createButton: {
    display: 'inline-block',
    color: theme.palette.kujakuishiGreen.main,
    '& span': {
      textTransform: 'capitalize',
    },
    '& svg': {
      verticalAlign: 'top',
    },
  },
  dropdownMenu: {
    maxWidth: 200,
  },
  dropdownItemIcon: {
    minWidth: 30,
  },
  dropdownItemText: {
    textTransform: 'capitalize',
    color: theme.palette.kujakuishiGreen.main,
  },
}))

const WordListTableHeadDropdown = ({
  className,
  title,
  icon,
  onOptionToggle,
  optionsMap,
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleToggle = key => {
    const nextState = { ...optionsMap }

    nextState[key] = !nextState[key]
    onOptionToggle(nextState)
  }

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={clxn('wordListTableHeadDropdown', className)}>
      <Button
        aria-controls={`${title} menu`}
        aria-haspopup='true'
        onClick={handleMenuOpen}
      >
        {icon && icon}
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id={`${title} menu`}
        keepMounted
        onClose={handleMenuClose}
        open={Boolean(anchorEl)}
      >
        <List className={classes.dropdownMenu}>
          {Object.keys(optionsMap).map(key => {
            const labelId = `wordList-tableHead-dropdown-${key}`

            return (
              <ListItem
                button
                dense
                key={key}
                onClick={() => handleToggle(key)}
                role={undefined}
              >
                <ListItemIcon className={classes.dropdownItemIcon}>
                  <Checkbox
                    checked={optionsMap[key]}
                    color='default'
                    disableRipple
                    edge='start'
                    inputProps={{ 'aria-labelledby': labelId }}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.dropdownItemText}
                  id={labelId}
                  primary={key}
                />
              </ListItem>
            )
          })}
        </List>
      </Menu>
    </div>
  )
}

WordListTableHeadDropdown.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onOptionToggle: PropTypes.func.isRequired,
  optionsMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  title: PropTypes.string.isRequired,
}

const WordListTableHead = ({
  filterOptionsMap,
  displayOptionsMap,
  onFilterChange,
  onDisplayChange,
  onCreateClick,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wordListTableHead}>
      {filterOptionsMap && (
        <WordListTableHeadDropdown
          className={classes.filterMenu}
          icon={<FilterListIcon />}
          onOptionToggle={onFilterChange}
          optionsMap={filterOptionsMap}
          title={'Filter'}
        />
      )}
      <WordListTableHeadDropdown
        className={classes.displayMenu}
        icon={<VisibilityIcon />}
        onOptionToggle={onDisplayChange}
        optionsMap={displayOptionsMap}
        title={'Show'}
      />
      <Button
        aria-controls='create word'
        className={classes.createButton}
        onClick={onCreateClick}
      >
        <AddIcon />
        Create
      </Button>
    </div>
  )
}

WordListTableHead.propTypes = {
  displayOptionsMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  filterOptionsMap: PropTypes.objectOf(PropTypes.bool),
  onCreateClick: PropTypes.func.isRequired,
  onDisplayChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default WordListTableHead
