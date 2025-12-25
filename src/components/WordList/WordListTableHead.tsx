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
import AddIcon from '@mui/icons-material/Add'

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
}

const WordListTableHead = ({
  displayOptionsMap,
  filterOptionsMap,
  onCreateClick,
  onDisplayChange,
  onFilterChange,
}: WordListTableHeadProps) => {
  const [displayAnchorEl, setDisplayAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)

  const handleDisplayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDisplayAnchorEl(event.currentTarget)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleDisplayClose = () => {
    setDisplayAnchorEl(null)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
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
      </div>
      <Button
        className={classes.button}
        onClick={onCreateClick}
        size='small'
        startIcon={<AddIcon />}
      >
        Create
      </Button>
    </Root>
  )
}

export default WordListTableHead
