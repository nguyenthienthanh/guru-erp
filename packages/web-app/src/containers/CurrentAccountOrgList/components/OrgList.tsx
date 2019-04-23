import React from 'react'

import { Fade, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import OrgListItem from './OrgListItem'

import { IMember } from '@guru-erp/interfaces'

type OrgListProps = {
  title: string
  members: IMember[]
}

const OrgList = (props: OrgListProps) => {
  const { members } = props
  const classes = useStyles(props)

  return (
    <div>
      <Typography variant="button" color="textSecondary" className={classes.title} display="block">
        {props.title}
      </Typography>

      <Grid container spacing={2}>
        {members.map((member) => (
          <Grid key={member.id} item sm={4} md={3}>
            <Fade in>
              <div>
                <OrgListItem member={member} />
              </div>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  title: {
    marginBottom: spacing(2),
  },
}))

export default OrgList
