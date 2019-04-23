import React from 'react'

import { IMember } from '@guru-erp/interfaces'
import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import MemberDisplayName from 'components/people/MemberDisplayName'
// tslint:disable-next-line:import-name
import ReactAvatar from 'react-avatar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getOrgPath } from 'routes'
import voca from 'voca'
import OrgListItemOptions from './OrgListItemOptions'

type OrgListItemProps = {
  member: IMember
}

const OrgListItem = (props: OrgListItemProps) => {
  const { member } = props
  const org = member.org!
  const orgOwner = org.createdByMember!

  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Link to={getOrgPath(org.namespace)}>
      <Paper classes={{ root: classes.root }}>
        <div className={classes.orgBrand}>
          {org.logo === 'initials' ? (
            <ReactAvatar name={org.name} className={classes.orgLogo} size={'80px'} round="8px" />
          ) : (
            <div
              className={classes.orgLogo}
              style={{
                backgroundImage: `url(${org.logo})`,
              }}
            />
          )}
          <Typography variant="h6" className={classes.orgName}>
            {org.name}
          </Typography>
        </div>
        <div className={classes.memberInfo}>
          <div>
            <MemberDisplayName member={orgOwner} avatarProps={{ size: 24 }} />
          </div>
          <Typography variant="caption" color="textSecondary">
            {voca.capitalize(t(member.availability!))}
          </Typography>
        </div>
        <OrgListItemOptions />
      </Paper>
    </Link>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    height: 280,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing(3, 1),
    transition: 'box-shadow 0.3s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      boxShadow: '2px 2px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  orgBrand: {
    textAlign: 'center',
  },
  orgLogo: {
    width: '90%',
    height: 80,
    margin: 'auto',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  orgName: {
    marginTop: spacing(1),
  },
  memberInfo: {
    textAlign: 'center',
  },
}))

export default OrgListItem
