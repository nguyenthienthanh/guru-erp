import React from 'react'

import {
  AppBar as MUIAppBar,
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Bell from 'mdi-material-ui/Bell'

const AppBar = () => {
  const classes = useStyles()

  return (
    <MUIAppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item />
          <Grid item xs />
          <Grid item>
            <IconButton color="inherit">
              <Bell color="inherit" fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>D</Avatar>
          </Grid>
        </Grid>
      </Toolbar>
    </MUIAppBar>
  )
}

const useStyles = makeStyles(() => ({
  avatar: {
    height: 32,
    width: 32,
  },
}))

export default AppBar
