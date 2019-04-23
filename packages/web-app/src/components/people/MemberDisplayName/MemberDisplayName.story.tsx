import React from 'react'

import { IMember } from '@guru-erp/interfaces'
import { storiesOf } from '@storybook/react'
import MemberDisplayName from './MemberDisplayName'

const stories = storiesOf('People', module)

stories.add('MemberDisplayName', () => {
  const member: IMember = {
    id: 'fake',
    username: 'duongdev',
    orgId: 'fake',
    accountId: 'fake',
    membership: 'active',
    lastActivityAt: new Date(),
    roles: ['member'],
    account: {
      id: 'fake',
      email: 'dustin.do95@gmail.com',
      avatar: 'gravatar',
    },
  }

  return (
    <div style={{ padding: 16 }}>
      <div>
        With avatar: <MemberDisplayName member={member} avatar />
      </div>
      <br />
      <div>
        Without avatar: <MemberDisplayName member={member} />
      </div>
    </div>
  )
})
