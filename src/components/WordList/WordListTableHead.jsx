import { useState } from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import clxn from 'classnames'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import FilterListIcon from '@mui/icons-material/FilterList'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'

const PREFIX = 'WordListTableHead'

const classes = {
  wordListTableHead: `${PREFIX}-wordListTableHead`,
  filterMenu: `${PREFIX}-filterMenu`,
  displayMenu: `${PREFIX}-displayMenu`,
  createButton: `${PREFIX}-createButton`,
  dropdownMenu: `${PREFIX}-dropdownMenu`,
  dropdownItemIcon: `${PREFIX}-dropdownItemIcon`,
  dropdownItemText: `${PREFIX}-dropdownItemText`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.wordListTableHead}`]: {
    '& svg': {
      width: 15,
      marginRight: 10,
      fill: theme.palette.kujakuishiGreen.main,
    },
  },

  [`& .${classes.filterMenu}`]: {
    display: 'inline-block',
    '& button': {
      textTransform: 'capitalize',
      color: theme.palette.kujakuishiGreen.main,
    },
  },

  [`& .${classes.displayMenu}`]: {
    display: 'inline-block',
    '& button': {
      textTransform: 'capitalize',
      color: theme.palette.kujakuishiGreen.main,
    },
  },

  [`& .${classes.createButton}`]: {
    display: 'inline-block',
    color: theme.palette.kujakuishiGreen.main,
    '& span': {
      textTransform: 'capitalize',
    },
    '& svg': {
      verticalAlign: 'top',
    },
  },

  [`& .${classes.dropdownMenu}`]: {
    maxWidth: 200,
  },

  [`& .${classes.dropdownItemIcon}`]: {
    minWidth: 30,
  },

  [`& .${classes.dropdownItemText}`]: {
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
  return (
    <Root className={classes.wordListTableHead}>
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
    </Root>
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
