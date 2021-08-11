import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { theme } from 'src/themes/theme'
import resourceTypes from 'src/constants/resourceTypes'

const useStyles = makeStyles(() => ({
  menuButton: {
    marginRight: theme.spacing(2)
  }
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
