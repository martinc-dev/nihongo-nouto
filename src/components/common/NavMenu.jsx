import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import makeStyles from '@mui/styles/makeStyles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import resourceTypes from 'src/constants/resourceTypes'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

const NavMenu = () => {
  const classes = useStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickItem = route => {
    history.push(`/${route}`)
    handleClose()
  }

  return (
    <>
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
        <MenuItem onClick={() => handleClickItem(resourceTypes.VERB.pathName)}>
          {resourceTypes.VERB.pname}
        </MenuItem>
        <MenuItem onClick={() => handleClickItem(resourceTypes.ADJ.pathName)}>
          {resourceTypes.ADJ.pname}
        </MenuItem>
        <MenuItem onClick={() => handleClickItem(resourceTypes.NOUN.pathName)}>
          {resourceTypes.NOUN.pname}
        </MenuItem>
        <MenuItem onClick={() => handleClickItem(resourceTypes.OTHER.pathName)}>
          {resourceTypes.OTHER.pname}
        </MenuItem>
      </Menu>
    </>
  )
}

export default NavMenu
