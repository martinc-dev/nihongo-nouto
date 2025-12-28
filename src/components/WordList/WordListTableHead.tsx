import { useState } from 'react'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import FilterListIcon from '@mui/icons-material/FilterList'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SortIcon from '@mui/icons-material/Sort'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import WordListActionButtons from './WordListActionButtons'

const PREFIX = 'WordListTableHead'

const classes = {
  root: `${PREFIX}-root`,
  button: `${PREFIX}-button`,
}

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  [`& .${classes.button}`]: {
    minWidth: 40,
  },
}))

interface WordListTableHeadProps {
  displayOptionsMap: Record<string, boolean>
  filterOptionsMap: Record<string, boolean> | null
  onCreateClick: () => void
  onDisplayChange: (map: Record<string, boolean>) => void
  onFilterChange: (map: Record<string, boolean> | null) => void
  orderBy: string
  isAsc: boolean
  onSortChange: (orderBy: string) => void
}

const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'word', label: 'Word' },
  { value: 'hiragana', label: 'Hiragana' },
  { value: 'sense', label: 'Sense' },
  { value: 'createdAt', label: 'Created At' },
  { value: 'updatedAt', label: 'Updated At' },
]

const WordListTableHead = ({
  displayOptionsMap,
  filterOptionsMap,
  onCreateClick,
  onDisplayChange,
  onFilterChange,
  orderBy,
  isAsc,
  onSortChange,
}: WordListTableHeadProps) => {
  const [displayAnchorEl, setDisplayAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null)

  const handleDisplayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisplayAnchorEl(event.currentTarget)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget)
  }

  const handleDisplayClose = () => {
    setDisplayAnchorEl(null)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleSortClose = () => {
    setSortAnchorEl(null)
  }

  const handleDisplayToggle = (key: string) => {
    onDisplayChange({
      ...displayOptionsMap,
      [key]: !displayOptionsMap[key],
    })
  }

  const handleFilterToggle = (key: string) => {
    if (!filterOptionsMap) return
    onFilterChange({
      ...filterOptionsMap,
      [key]: !filterOptionsMap[key],
    })
  }

  const handleSortSelect = (sortValue: string) => {
    onSortChange(sortValue)
    handleSortClose()
  }

  const getSortLabel = () => {
    const option = SORT_OPTIONS.find(opt => opt.value === orderBy)

    return option ? option.label : 'Sort'
  }

  return (
    <Root className={classes.root}>
      <div>
        <Button
          aria-controls='display-menu'
          aria-haspopup='true'
          className={classes.button}
          onClick={handleDisplayClick}
          size='small'
          startIcon={<VisibilityIcon />}
        >
          Display
        </Button>
        <Menu
          anchorEl={displayAnchorEl}
          id='display-menu'
          keepMounted
          onClose={handleDisplayClose}
          open={Boolean(displayAnchorEl)}
        >
          <List dense>
            {Object.keys(displayOptionsMap).map(key => (
              <ListItemButton
                dense
                key={key}
                onClick={() => handleDisplayToggle(key)}
                role={undefined}
              >
                <ListItemIcon>
                  <Checkbox checked={displayOptionsMap[key]} edge='start' tabIndex={-1} />
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItemButton>
            ))}
          </List>
        </Menu>
        {filterOptionsMap && (
          <>
            <Button
              aria-controls='filter-menu'
              aria-haspopup='true'
              className={classes.button}
              onClick={handleFilterClick}
              size='small'
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              id='filter-menu'
              keepMounted
              onClose={handleFilterClose}
              open={Boolean(filterAnchorEl)}
            >
              <List dense>
                {Object.keys(filterOptionsMap).map(key => (
                  <ListItemButton
                    dense
                    key={key}
                    onClick={() => handleFilterToggle(key)}
                    role={undefined}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={filterOptionsMap[key]}
                        edge='start'
                        tabIndex={-1}
                      />
                    </ListItemIcon>
                    <ListItemText primary={key} />
                  </ListItemButton>
                ))}
              </List>
            </Menu>
          </>
        )}
        <Button
          aria-controls='sort-menu'
          aria-haspopup='true'
          className={classes.button}
          endIcon={
            isAsc ? (
              <ArrowUpwardIcon fontSize='small' />
            ) : (
              <ArrowDownwardIcon fontSize='small' />
            )
          }
          onClick={handleSortClick}
          size='small'
          startIcon={<SortIcon />}
        >
          {getSortLabel()}
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          id='sort-menu'
          keepMounted
          onClose={handleSortClose}
          open={Boolean(sortAnchorEl)}
        >
          <List dense>
            {SORT_OPTIONS.map(option => (
              <ListItemButton
                dense
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                role={undefined}
                selected={orderBy === option.value}
              >
                <ListItemIcon>
                  {orderBy === option.value && isAsc && (
                    <ArrowUpwardIcon fontSize='small' />
                  )}
                  {orderBy === option.value && !isAsc && (
                    <ArrowDownwardIcon fontSize='small' />
                  )}
                  {orderBy !== option.value && <div style={{ width: 24 }} />}
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        </Menu>
      </div>

      <WordListActionButtons onCreateClick={onCreateClick} />
    </Root>
  )
}

export default WordListTableHead
