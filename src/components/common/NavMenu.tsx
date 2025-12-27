import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import resourceTypes from 'src/constants/resourceTypes'

const PREFIX = 'NavMenu'

const classes = {
  menuButton: `${PREFIX}-menuButton`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },
}))

const NavMenu = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickItem = (route: string) => {
    navigate(`/${route}`)
    handleClose()
  }

  return (
    <Root>
      <IconButton
        aria-haspopup='true'
        aria-label='menu'
        className={classes.menuButton}
        color='inherit'
        edge='start'
        onClick={handleClick}
        size='large'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='nav-menu'
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => handleClickItem(resourceTypes.VERB.pathName || 'verb')}>
          {resourceTypes.VERB.pname}
        </MenuItem>
        <MenuItem onClick={() => handleClickItem(resourceTypes.ADJ.pathName || 'adj')}>
          {resourceTypes.ADJ.pname}
        </MenuItem>
        <MenuItem onClick={() => handleClickItem(resourceTypes.NOUN.pathName || 'noun')}>
          {resourceTypes.NOUN.pname}
        </MenuItem>
        <MenuItem
          onClick={() => handleClickItem(resourceTypes.OTHER.pathName || 'other')}
        >
          {resourceTypes.OTHER.pname}
        </MenuItem>
      </Menu>
    </Root>
  )
}

export default NavMenu
