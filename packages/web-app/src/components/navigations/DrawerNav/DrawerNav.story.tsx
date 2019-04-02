import React from 'react'

import { storiesOf } from '@storybook/react'
import DrawerNav from './DrawerNav'

const stories = storiesOf('Navigations', module)

stories.add('DrawerNav', () => {
  return (
    <div style={{ height: 500, position: 'relative' }}>
      <DrawerNav />
    </div>
  )
})
