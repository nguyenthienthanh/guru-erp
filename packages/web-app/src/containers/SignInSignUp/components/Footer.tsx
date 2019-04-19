import React, { ReactNode } from 'react'

import { Button, Grid } from '@material-ui/core'

const Footer = () => {
  return (
    <footer>
      <Grid container>
        <Grid item>
          <Grid container spacing={1}>
            <FooterLink>Term of service</FooterLink>
            <FooterLink>Privacy policies</FooterLink>
            <FooterLink>About</FooterLink>
            <FooterLink>Community</FooterLink>
          </Grid>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Grid container spacing={1}>
            <FooterLink>Facebook</FooterLink>
            <FooterLink>Instagram</FooterLink>
            <FooterLink>Github</FooterLink>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}

const FooterLink = (props: { children: ReactNode }) => (
  <Grid item>
    <Button color="primary">{props.children}</Button>
  </Grid>
)

export default Footer
