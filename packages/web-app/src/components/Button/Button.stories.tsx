import React from 'react'

import { select, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import TicTacToeCell from './TicTacToeCell'

const stories = storiesOf('Components', module)

stories.addDecorator(withKnobs)

stories.add('TicTacToeCell', () => {
  const textProp = select(
    'Text',
    {
      Hihi: 'hihi',
      haha: 'haha',
    },
    'Hihi',
  )
  return <TicTacToeCell text={textProp as any} />
})
