import React from 'react'

import { storiesOf } from '@storybook/react'
import AccountAvatar from './AccountAvatar'

const stories = storiesOf('People', module)

stories.add('AccountAvatar', () => {
  const withGravatar = {
    id: 'fake',
    email: 'dustin.do95@gmail.com',
    avatar: 'gravatar',
  }

  const withImage = {
    id: 'fake',
    email: 'someoneelse@gmail.com',
    avatar: 'http://i.pravatar.cc/300',
  }

  const withInitials = {
    id: 'fake',
    email: 'someoneelse@gmail.com',
    avatar: 'gravatar',
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>By default, use gravatar</h3>

      <h4>Default size:</h4>
      <AccountAvatar account={withGravatar} />

      <h4>Multiple sizes:</h4>
      <AccountAvatar account={withGravatar} size="large" />
      <AccountAvatar account={withGravatar} size="medium" />
      <AccountAvatar account={withGravatar} size="small" />
      <AccountAvatar account={withGravatar} size="x-small" />

      <h3>With custom image</h3>

      <AccountAvatar account={withImage} size={150} />

      <h3>With initials</h3>

      <AccountAvatar account={withInitials} name="Dương Đỗ" />

      <h3>Without name</h3>

      <AccountAvatar account={withInitials} />
    </div>
  )
})
