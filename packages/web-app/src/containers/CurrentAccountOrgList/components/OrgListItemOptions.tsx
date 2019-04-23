import React from 'react'

import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { DotsHorizontal } from 'mdi-material-ui'

const OrgListItemOptions = () => {
  const [open, setOpen] = React.useState(false)
  const anchorEl = React.useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div onClick={(e) => e.preventDefault()}>
      <IconButton size="small" onClick={handleOpen} ref={anchorEl}>
        <DotsHorizontal color="disabled" />
      </IconButton>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>Add to Favorites</MenuItem>
        <MenuItem onClick={handleClose}>Connect</MenuItem>
        <MenuItem onClick={handleClose}>Remove</MenuItem>
      </Menu>
    </div>
  )
}

export default OrgListItemOptions
