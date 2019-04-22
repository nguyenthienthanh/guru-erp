import React from 'react'

import { makeStyles, Theme, Typography } from '@material-ui/core'
import { TypographyProps } from '@material-ui/core/Typography'

const PageTitle = (props: TypographyProps) => {
  const classes = useStyles(props)

  return <Typography variant="h4" classes={classes} {...props} />
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    marginBottom: spacing(4),
  },
}))

export default PageTitle
