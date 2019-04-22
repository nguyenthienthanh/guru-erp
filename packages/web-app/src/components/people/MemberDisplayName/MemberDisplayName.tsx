import React from 'react'

import { IMember } from '@guru-erp/interfaces'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import { TypographyProps } from '@material-ui/core/Typography'
import AccountAvatar, { AccountAvatarProps } from '../AccountAvatar/AccountAvatar'

export type MemberDisplayNameProps = {
  member: IMember
  /**
   * Whether display avatar or not.
   * @default false
   */
  avatar?: boolean
  typographyProps?: Partial<TypographyProps>
  avatarProps?: Partial<AccountAvatarProps>
  classes?: Partial<Record<'root' | 'avatar' | 'username', string>>
}

const MemberDisplayName = (props: MemberDisplayNameProps) => {
  const classes = useStyles(props)

  const { member } = props

  const displayName = member.username

  return (
    <div className={classes.root}>
      {props.avatar && member.account && (
        <AccountAvatar
          account={member.account}
          size={24}
          className={classes.avatar}
          name={displayName}
          {...props.avatarProps}
        />
      )}
      <Typography
        display="inline"
        variant="subtitle2"
        className={classes.username}
        {...props.typographyProps}
      >
        {displayName}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: spacing(1),
  },
  username: {},
}))

export default MemberDisplayName
