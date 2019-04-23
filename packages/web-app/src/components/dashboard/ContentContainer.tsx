import React, { ReactNode } from 'react'

import { Container, makeStyles, Theme } from '@material-ui/core'

const ContentContainer = (props: { children: ReactNode }) => {
  const classes = useStyles(props)

  return (
    <Container>
      <aside className={classes.aside}>{props.children}</aside>
    </Container>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  aside: {
    padding: spacing(8, 0),
  },
}))

export default ContentContainer
