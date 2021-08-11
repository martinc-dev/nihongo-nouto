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
  wordListTableHead: {},
  filterMenu: {},
  displayMenu: {},
  dropdownMenu: {
    maxWidth: 200
  }
}))

const WordListTableHeadDropdown = ({
  className,
  title,
  icon,
  onOptionToggle,
  optionsMap
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
        {title}
        {icon && <icon />}
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
                <ListItemIcon>
                  <Checkbox
                    checked={optionsMap[key]}
                    disableRipple
                    edge='start'
                    inputProps={{ 'aria-labelledby': labelId }}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={key} />
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
  title: PropTypes.string.isRequired
}

const WordListTableHead = ({
  filterOptionsMap,
  displayOptionsMap,
  onFilterChange,
  onDisplayChange,
  onCreateClick
}) => {
  const classes = useStyles()

  return (
    <div className={classes.wordListTableHead}>
      <WordListTableHeadDropdown
        className={classes.filterMenu}
        icon={<FilterListIcon />}
        onOptionToggle={onFilterChange}
        optionsMap={filterOptionsMap}
        title={'Filter'}
      />
      <WordListTableHeadDropdown
        className={classes.displayMenu}
        icon={<VisibilityIcon />}
        onOptionToggle={onDisplayChange}
        optionsMap={displayOptionsMap}
        title={'Show'}
      />
      <Button aria-controls='create word' onClick={onCreateClick}>
        <AddIcon />
        Create
      </Button>
    </div>
  )
}

WordListTableHead.propTypes = {
  displayOptionsMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  filterOptionsMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  onCreateClick: PropTypes.func.isRequired,
  onDisplayChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired
}

export default WordListTableHead
