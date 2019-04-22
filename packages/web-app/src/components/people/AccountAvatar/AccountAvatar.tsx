import React from 'react'

// tslint:disable-next-line:import-name
import ReactAvatar, { ReactAvatarProps } from 'react-avatar'

import { IAccount } from '@guru-erp/interfaces'

const sizeMap = {
  'x-small': 32,
  small: 40,
  medium: 48,
  large: 100,
}

type Size = typeof sizeMap

export type AccountAvatarProps = {
  account: IAccount
  /**
   * Size of the avatar (width, height) in pixel. Defaults to 100.
   * @default 100
   */
  size?: keyof Size | number
  /**
   * Will be used to generate avatar based on the initials of the person
   */
  name?: ReactAvatarProps['name']
  /**
   * Name of the CSS class you want to add to this component alongside the default sb-avatar.
   */
  className?: ReactAvatarProps['className']
}

const AccountAvatar = (props: AccountAvatarProps) => {
  const { account, className, name } = props

  const src = account.avatar === 'initial' ? undefined : account.avatar
  const size = typeof props.size === 'string' ? sizeMap[props.size] : props.size

  return (
    <ReactAvatar
      src={src}
      email={account.email}
      size={`${size || 100}`}
      round
      name={name}
      maxInitials={2}
      className={className}
    />
  )
}

export default AccountAvatar
